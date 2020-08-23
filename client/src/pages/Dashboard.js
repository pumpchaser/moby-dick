import React, { Component, Fragment } from 'react';
import AddTokenModal from '../dashboard/AddToken';
import { Button  } from 'semantic-ui-react'
import web3 from '../web3';

class Dashboard extends Component {
  componentDidMount() {
  }

  // async oldprocessTransactions() {
    // console.log(process.env.REACT_APP_ETHERSCAN_API)
    // console.log(process.env.REACT_APP_WEBSITE_NAME)
    // const latestBlockNumber = await web3.eth.getBlockNumber();
    // // console.log(latestBlockNumber)

    // const block = await web3.eth.getBlock(latestBlockNumber)
    // // console.log(block)

    // const transactionHashes = block.transactions
    // // console.log(transactionHashes)

    // let transactions = [] 

    // for (const txHash of transactionHashes) {
    //   let tx = await web3.eth.getTransaction(txHash)
    //   transactions.push(tx)
    //   console.log(tx);

    // }

    // console.log(transactions)

  // }

  async processTransactions() {
    const contractAddress = '0x2129fF6000b95A973236020BCd2b2006B0D8E019'
    const etherscanURL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
  
    console.log(etherscanURL)
  }
// def init_contract(w3, address):
//     url = f"https://api.etherscan.io/api?module=contract&action=getabi&address={address}&apikey={API_KEY}"
//     resp = requests.get(url)
//     json_resp = json.loads(resp.text)
//     contract_abi = json_resp['result']
//     my_contract = w3.eth.contract(address=address, abi=contract_abi)
//     return my_contract


// var myContract = new web3.eth.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
//     from: '0x1234567890123456789012345678901234567891', // default from address
//     gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// });

  render() {
    return(
      <Fragment>
          <div className="center">
            <AddTokenModal>Add Token</AddTokenModal>
            <Button onClick={this.processTransactions}>Process Transactions</Button>

          </div> 
      </Fragment>
    )
  }
}

export default Dashboard;

