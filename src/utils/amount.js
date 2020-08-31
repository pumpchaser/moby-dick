export function displayAmount(amount, decimal) {
  var convertedAmount = amount / 10 ** decimal
  return convertedAmount.toFixed(2).toLocaleString()
}
