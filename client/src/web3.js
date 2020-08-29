import Web3 from 'web3';

let web3;
let provider;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  provider = window.web3.currentProvider;
  console.log('Metamask detected: ', provider)

} else {
  // TODO: Need fallback
  console.log('Error! Metamask not connected!!')
  provider = new Web3.providers.HttpProvider('');
}

web3 = new Web3(provider);

export default web3;
