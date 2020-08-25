import Web3 from 'web3';

let web3;
let provider;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  provider = window.web3.currentProvider;
} else {
  // TODO: Need fallback
  provider = new Web3.providers.HttpProvider('');
}

web3 = new Web3(provider);

export default web3;