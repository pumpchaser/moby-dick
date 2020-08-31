export function getTransactionType(transaction, currentCoin){
  if (transaction.event === 'Transfer') {
    if (transaction.returnValues.to.toLowerCase() === currentCoin.uniswap_address.toLowerCase()) {
      return 'Sell'
    } 
    if (transaction.returnValues.from.toLowerCase() === currentCoin.uniswap_address.toLowerCase()) {
      return 'Buy'
    }
  }
  return transaction.event
}

export function getFromAddress(transaction, transactionType) {
  if (transactionType === 'Buy'){ 
    return transaction.returnValues.to || transaction.returnValues.owner
  }
  return transaction.returnValues.from || transaction.returnValues.owner
}