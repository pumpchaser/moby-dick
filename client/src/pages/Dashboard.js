import React, { Component, Fragment } from 'react';
import AddTokenModal from '../dashboard/AddToken';
import EventFeed from '../dashboard/EventFeed';
import { Container, Button, Grid, Menu } from 'semantic-ui-react'
import web3 from '../web3';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Dashboard extends Component {
  COIN_OPTIONS = {
    'RSR': {
      'contract': '0x8762db106b2c2a0bccb3a80d1ed41273552616e8',
      'uniswap': '0xeeeec06f48656e921b39e30d9a205cb2b08ea465'
    },
    'MYX': {
      'contract': '0x2129fF6000b95A973236020BCd2b2006B0D8E019',
      'uniswap': '0xe5437565cba444f33f40215afecc92e38e2d1ba9'
    }
  }

  constructor(props){
    super(props)
    this.state = {
      currentToken: '', 
      events: []
    }
    this.getTransactionType.bind(this)
  }

  componentDidMount() {
  }

  getTransactionType(transaction){
    if (transaction.event === 'Transfer') {
      console.log(transaction.returnValues.to.toLowerCase())
      console.log('vs')
      console.log(this.COIN_OPTIONS[this.state.currentToken]['uniswap'])
      if (transaction.returnValues.to.toLowerCase() === this.COIN_OPTIONS[this.state.currentToken]['uniswap'].toLowerCase()){
        return 'Sell'
      } else {
        return 'Buy'
      }
    }
    return transaction.event

  }

  notify(transaction) {
    const txURL = `https://etherscan.io/tx/${transaction.transactionHash}` 
    // const message = (
    //   <div>
    //     Type: {transaction.event}<br/> 
    //     From: {transaction.returnValues.from}<br/> 
    //     to: {transaction.returnValues.to}<br/> 
    //     Value: {transaction.returnValues.value/1000000000000000000}
    //   </div>
    // )
    // toast(message)

    console.log('!!!', transaction.event, transaction)
    const newEvent = {
      'type': this.getTransactionType(transaction),
      'from': transaction.returnValues.from || transaction.returnValues.owner,
      'to': transaction.returnValues.to,
      'value': transaction.returnValues.value/1000000000000000000,
      'txId': transaction.id,
      'url': txURL,
    }

    let { events } = this.state
    events.unshift(newEvent)
    this.setState({ events : events })
  }

  async getContractAbi(contractAddress) {
    const etherscanURL = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    const response = await axios.get(etherscanURL)
    return JSON.parse(response.data.result)
  }

  async processTransactions() {
    console.log("Processing...", this.state.currentToken)

    const contractAddress = this.COIN_OPTIONS[this.state.currentToken]['contract']
    const contractAbi = await this.getContractAbi(contractAddress)

    const contract = new web3.eth.Contract(contractAbi, contractAddress)
    contract.events.allEvents((err, event) => {this.notify(event)})
  }

  async setActiveToken(newToken) {
    const {currentToken} = this.state
    if (currentToken === newToken) {
      return
    }
    await this.setState({
      currentToken: newToken,
      events: []
    })
    await this.processTransactions()
  }

  renderMenuOptions() {
    return(
      <Fragment>
        {
          Object.keys(this.COIN_OPTIONS).map((tokenName) => {return(
            <Menu.Item key={tokenName} color={'blue'} onClick={() => this.setActiveToken(tokenName)} active={this.state.currentToken === tokenName}>
              {tokenName}
            </Menu.Item>
          )})
        }
      </Fragment>
    )
  }
  render() {
    return(
      <Fragment>
        <Container fluid>
          <Grid >
            <Grid.Column width={4}>
              <Menu vertical>
                {this.renderMenuOptions()}
              </Menu>
            </Grid.Column>
            <Grid.Column width={11}>
              {/*<AddTokenModal>Add Token</AddTokenModal>*/}
              {/*<Button onClick={this.processTransactions.bind(this)}>Process Transactions</Button>*/}
              Main Feed
              <EventFeed events={this.state.events}/>
            </Grid.Column>
          </Grid>
          <ToastContainer />
        </Container>
      </Fragment>
    )
  }
}

export default Dashboard;

