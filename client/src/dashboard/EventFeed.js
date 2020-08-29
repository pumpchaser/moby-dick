import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";

import { displayAmount } from '../utils/amount'
import web3 from '../web3';


class EventFeed extends Component {
  EVENT_CONFIG = {
    'Approval': {
      'icon': 'warning',
      'color': 'yellow'
    },
    'Buy': {
      'icon': 'sign in',
      'color': 'green'
    },
    'Sell': {
      'icon': 'sign out',
      'color': 'red'
    },
    'Burn': {
      'icon': 'fire',
      'color': 'black'
    },
    'Unstake': {
      'icon': 'dollar sign',
      'color': 'red'
    }
  }
  constructor(props){
    super(props)
  }

  getTransactionType(transaction){
    if (transaction.event === 'Transfer') {
      if (transaction.returnValues.to.toLowerCase() ===this.props.currentCoin.uniswap_address.toLowerCase()){
        return 'Sell'
      } else {
        return 'Buy'
      }
    }
    return transaction.event
  }

  processTransaction(transaction) {
    const fromAddress = transaction.returnValues.from || transaction.returnValues.owner
    return {
      'type': this.getTransactionType(transaction),
      'from': fromAddress,
      'to': transaction.returnValues.to,
      'value': transaction.returnValues.value,
      'key':  `${transaction.id}${transaction.logIndex}`,
      'url': `https://etherscan.io/tx/${transaction.transactionHash}`,
      'fromUrl': fromAddress ? `https://etherscan.io/address/${fromAddress}` : '',
    }
  }

  renderFeed(){
    return (
        this.props.events.slice(0, 20).map((event) => {
            const transaction = this.processTransaction(event)
            const isTopHodler = this.props.topHodlers.map(h => h.address).includes(transaction.from)
            // const eventIcon = (this.EVENT_CONFIG[transaction.type] && this.EVENT_CONFIG[transaction.type]['icon']) || 'icon-simple-addquestion'
            // const iconColor = (this.EVENT_CONFIG[transaction.type] && this.EVENT_CONFIG[transaction.type]['color']) || 'black'

            return (
              <tr key={transaction.key}>
                <td>
                  Some time ago
                </td>
                <td>
                  <a href={transaction.url} target='_blank'>{transaction.type}</a>
                </td>
                <td>
                  {isTopHodler ? `Hodler #${this.props.topHodlers.findIndex(transaction.from)}` : ''}

                  <a href={transaction.fromUrl ? transaction.fromUrl : ''} target='_blank'>{transaction.from} ( ETH | ({this.props.currentCoin.name})) </a>
                </td>
                <td>
                  {displayAmount(transaction.value, this.props.currentCoin.decimal)}
                </td>
                <td>
                                  </td>
              </tr>
            )
        })
    )
  }

  render() {
    return(
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Recent Transactions</CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Address</th>
                <th>Amount ({this.props.currentCoin.name})</th>
                <th>Amount (ETH)</th>
              </tr>
            </thead>
            <tbody>
              {this.renderFeed()}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return { topHodlers: state.topHodlers, events: state.events, currentCoin: state.selectedCoin }
}


export default connect(mapStateToProps)(EventFeed)
