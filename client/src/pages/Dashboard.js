import React, { Component, Fragment } from 'react';
import AddTokenModal from '../dashboard/AddToken';
import { Button  } from 'semantic-ui-react'
import web3 from '../web3';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Dashboard extends Component {
  componentDidMount() {
  }

  notify(transaction) {
    console.log(transaction)
    const message = (
      <div>
        Type: {transaction.event}<br/> 
        From: {transaction.address}<br/> 
        Value: {transaction.returnValues.value/1000000000000000000}
        <br/> Link https://etherscan.io/tx/{transaction.transactionHash} 
      </div>
    )
    toast(message)
  }

  async getContractAbi(contractAddress) {
    const etherscanURL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    const response = await axios.get(etherscanURL)
    return JSON.parse(response.data.result)
  }

  async processTransactions() {
    console.log("Processing...")
    const contractAddress = '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07'
    const contractAbi = await this.getContractAbi(contractAddress)

    const contract = new web3.eth.Contract(contractAbi, contractAddress)
    contract.events.allEvents((err, event) => {this.notify(event)})
  }

  render() {
    return(
      <Fragment>
          <div className="center">
            <AddTokenModal>Add Token</AddTokenModal>
            <Button onClick={this.processTransactions.bind(this)}>Process Transactions</Button>

          </div> 
          <ToastContainer />
      </Fragment>
    )
  }
}

export default Dashboard;

