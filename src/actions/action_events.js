import Api from '../api/api'
import web3 from '../web3';
import {getTransactionType, getFromAddress} from '../utils/event';
import { APPROVAL, TRANSFER } from '../constants/transactions'

export const NEW_EVENT = 'NEW_EVENT'
export const CLEAR_EVENTS = 'CLEAR_EVENTS'
export const UPDATE_HODLER_STREAK = 'UPDATE_HODLER_STREAK'

const IGNORE_TRANSACTION_TYPES = [APPROVAL, TRANSFER]

async function getContractAbi(contractAddress) {
	const etherscanURL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
	const response = await Api.get(etherscanURL)
	return JSON.parse(response.data.result)
}

export function processEvents(newCoin) {
  console.log('enter processEvents')
	return async dispatch => {
		dispatch({ type: CLEAR_EVENTS })
		const contractAddress = newCoin.contract_address
		const contractAbi = await getContractAbi(contractAddress)
		const contract = new web3.eth.Contract(contractAbi, contractAddress)
		const currentBlock = await web3.eth.getBlockNumber()

		contract.events.allEvents({fromBlock: currentBlock-50}, async (err, event) => {
			const transactionType = getTransactionType(event, newCoin)
			const fromAddress = getFromAddress(event, transactionType)
			const fromAddressBalance = fromAddress ? await contract.methods.balanceOf(fromAddress).call() : null

			if (!IGNORE_TRANSACTION_TYPES.includes(transactionType)) {
				dispatch({
					type: NEW_EVENT,
					payload: event,
					currentToken: newCoin,
					fromAddressBalance: fromAddressBalance,
					currentBlock: await web3.eth.getBlockNumber()
				})	
				dispatch({
					type: UPDATE_HODLER_STREAK,
					hodlerAddress: fromAddress,
					transactionType: transactionType
				})			
			}

		})
	}
}


