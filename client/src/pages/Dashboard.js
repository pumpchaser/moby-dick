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
    'TMPL': {
      'contract': '0x52132a43d7cae69b23abe77b226fa1a5bc66b839'
    },
    'SLINK': {
      'contract': '0x10bae51262490b4f4af41e12ed52a0e744c1137a'
    },
    'USDT': {
      'contract': '0xc00e94cb662c3520282e6f5717214004a7f26888'
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
    console.log(transaction.event, '!!!')
    if (transaction.event === 'Transfer') {
      if (transaction.returnValues.to === this.COIN_OPTIONS[this.state.currentToken]['contract']){
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

    console.log(transaction.event)
    const newEvent = {
      'type': this.getTransactionType(transaction),
      'from': transaction.returnValues.from,
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

  render() {
    return(
      <Fragment>
        <Container fluid>
          <Grid >
            <Grid.Column width={4}>
              <Menu vertical>
                <Menu.Item inverted color={'blue'} onClick={() => this.setActiveToken('TMPL')} active={this.state.currentToken === 'TMPL'}>TMPL</Menu.Item>
                <Menu.Item inverted color={'blue'} onClick={() => this.setActiveToken('SLINK')} active={this.state.currentToken === 'SLINK'}>SLINK</Menu.Item>
                <Menu.Item inverted color={'blue'} onClick={() => this.setActiveToken('USDT')} active={this.state.currentToken === 'USDT'}>USDT</Menu.Item>
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

