import React, { Component, Fragment } from 'react';
import AddTokenModal from '../dashboard/AddToken';
import { Button  } from 'semantic-ui-react'
import web3 from '../web3';
import axios from 'axios';

class Dashboard extends Component {
  componentDidMount() {
  }

  async getContractAbi(contractAddress) {
    const etherscanURL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    const response = await axios.get(etherscanURL)
    return JSON.parse(response.data.result)
  }

  async processTransactions() {
    const contractAddress = '0x2129fF6000b95A973236020BCd2b2006B0D8E019'
    const contractAbi = await this.getContractAbi(contractAddress)

    const contract = new web3.eth.Contract(contractAbi, contractAddress)
    contract.events.Transfer(console.log)
  }

  render() {
    return(
      <Fragment>
          <div className="center">
            <AddTokenModal>Add Token</AddTokenModal>
            <Button onClick={this.processTransactions.bind(this)}>Process Transactions</Button>

          </div> 
      </Fragment>
    )
  }
}

export default Dashboard;

