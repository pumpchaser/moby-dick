import Api from '../api/api'
import axios from 'axios';
import web3 from '../web3';
import { COIN_CONFIG } from '../coin_config'

export const NEW_EVENT = 'NEW_EVENT'


async function getContractAbi(contractAddress) {
	const etherscanURL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
	const response = await axios.get(etherscanURL)
	return JSON.parse(response.data.result)
}

export function processEvents(currentToken) {
	return async dispatch => {
		const contractAddress = COIN_CONFIG[currentToken]['contract']
		const contractAbi = await getContractAbi(contractAddress)

		const contract = new web3.eth.Contract(contractAbi, contractAddress)
		// // this.notify(events)
		contract.events.allEvents((err, event) => {
			dispatch({ type: NEW_EVENT, payload: event, currentToken: currentToken })
		})
	}

}

// export default processEvents


