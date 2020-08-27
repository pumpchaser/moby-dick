import Api from '../api/api'
import web3 from '../web3';

export const NEW_EVENT = 'NEW_EVENT'


async function getContractAbi(contractAddress) {
	const etherscanURL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
	const response = await Api.get(etherscanURL)
	return JSON.parse(response.data.result)
}

export function processEvents(newCoin) {
	return async dispatch => {
		
		const contractAddress = newCoin.contract_address
		const contractAbi = await getContractAbi(contractAddress)

		const contract = new web3.eth.Contract(contractAbi, contractAddress)
		const currentBlock = await web3.eth.getBlockNumber()
		contract.events.allEvents({fromBlock: currentBlock-10},(err, event) => {
			dispatch({ type: NEW_EVENT, payload: event, currentToken: newCoin.name })
		})
	}

}

// export default processEvents


