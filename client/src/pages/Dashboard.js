import React, { Component, Fragment } from 'react';
import AddTokenModal from '../dashboard/AddToken';
import EventFeed from '../dashboard/EventFeed';
import { Container, Button, Grid  } from 'semantic-ui-react'
import web3 from '../web3';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




class Dashboard extends Component {
  COIN_OPTIONS = {
    'TMPL': {
      'contract': '0x52132a43d7cae69b23abe77b226fa1a5bc66b839'
    },
    'OMG': {
      'contract': '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07'
    }
  }

  constructor(props){
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount() {
  }

  notify(transaction) {
    const txURL = `https://etherscan.io/tx/${transaction.transactionHash}` 
    const message = (
      <a href={txURL} target='_blank' rel='noopener noreferrer'>
        <div>
          Type: {transaction.event}<br/> 
          From: {transaction.address}<br/> 
          Value: {transaction.returnValues.value/1000000000000000000}
        </div>
      </a>
    )
    const newEvent = {
      'type': transaction.event,
      'from': transaction.address,
      'value': transaction.returnValues.value/1000000000000000000,
      'url': txURL
    }

    let { events } = this.state
    events.unshift(newEvent)
    this.setState({ events : events })

    toast(message)
  }

  async getContractAbi(contractAddress) {
    const etherscanURL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    const response = await axios.get(etherscanURL)
    return JSON.parse(response.data.result)
  }

  async processTransactions() {
    console.log("Processing...")
    const coin = 'OMG'
    const contractAddress = this.COIN_OPTIONS[coin]['contract']
    const contractAbi = await this.getContractAbi(contractAddress)

    const contract = new web3.eth.Contract(contractAbi, contractAddress)
    contract.events.allEvents((err, event) => {this.notify(event)})
  }

  render() {
    return(
      <Fragment>
        <Container>
          <div className="center">
            <AddTokenModal>Add Token</AddTokenModal>
            <Button onClick={this.processTransactions.bind(this)}>Process Transactions</Button>
            <Grid columns={2}>
              <Grid.Column>
                Main Feed
                <EventFeed events={this.state.events}/>
              </Grid.Column>
              <Grid.Column>
                Side Feed
                <EventFeed events={[]} />
              </Grid.Column>
            </Grid>
          </div> 
          <ToastContainer />
        </Container>
      </Fragment>
    )
  }
}

export default Dashboard;

