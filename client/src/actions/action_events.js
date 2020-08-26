import Api from '../api/api'
import axios from 'axios';
import web3 from '../web3';

export const NEW_EVENT = 'NEW_EVENT'


async function getContractAbi(contractAddress) {
	const etherscanURL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
	const response = await axios.get(etherscanURL)
	return JSON.parse(response.data.result)
}

export function processEvents(currentToken) {
	return async dispatch => {
		const COIN_OPTIONS = {
			'DYX': {
			  'contract': '0x023eBB622F461a15A344Edc45e6a5eabb5A68e03',
			  'uniswap': '0xbb0444980898acc79de3b66a7025f24fc720f2e5'
			}
		}
		console.log("Processing...", currentToken)

		const contractAddress = COIN_OPTIONS[currentToken]['contract']
		const contractAbi = await getContractAbi(contractAddress)

		const contract = new web3.eth.Contract(contractAbi, contractAddress)
		// // this.notify(events)
		contract.events.allEvents((err, event) => {dispatch({ type: NEW_EVENT, payload: event })})
	}

}

// export default processEvents


