export function displayAmount(amount, decimal) {
  var amount = amount / 10 ** decimal
  return amount.toFixed(2).toLocaleString()
}
