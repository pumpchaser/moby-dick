import web3 from '../web3';

const USER_BALANCE = 'USER_BALANCE'

export function getBalance(address, contract) {
  return (dispatch) => {
    const ethBalance = await web3.eth.getBalance(address)
    dispatch({ type: USER_BALANCE, payload: ethBalance })
  }
}
