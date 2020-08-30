import Api from '../api/api'
import web3 from '../web3';

export const NEW_EVENT = 'NEW_EVENT'
export const CLEAR_EVENTS = 'CLEAR_EVENTS'


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

		contract.events.allEvents({fromBlock: currentBlock-20}, async (err, event) => {
			const fromAddress = event.returnValues.from || event.returnValues.owner
			const fromAddressBalance = fromAddress ? await contract.methods.balanceOf(fromAddress).call() : null
			dispatch({
				type: NEW_EVENT,
				payload: event,
				currentToken: newCoin.name,
				fromAddressBalance: fromAddressBalance,
				currentBlock: currentBlock
			})
		})
	}
}


