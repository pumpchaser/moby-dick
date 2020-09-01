import { BUY, SELL, TRANSFER } from '../constants/transactions'

export function getTransactionType(transaction, currentCoin){
  if (transaction.event === TRANSFER) {
    if (transaction.returnValues.to.toLowerCase() === currentCoin.uniswap_address.toLowerCase()) {
      return SELL
    } 
    if (transaction.returnValues.from.toLowerCase() === currentCoin.uniswap_address.toLowerCase()) {
      return BUY
    }
  }
  return transaction.event
}

export function getFromAddress(transaction, transactionType) {
  if (transactionType === BUY){ 
    return transaction.returnValues.to || transaction.returnValues.owner
  }
  return transaction.returnValues.from || transaction.returnValues.owner
}