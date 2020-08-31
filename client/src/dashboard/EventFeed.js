import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";

import { displayAmount } from '../utils/amount'
import moment from 'moment'


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

  calculateTimeDifference(transactionBlockNumber){
    const averageBlockTime = 13 * 1000
    const blockDiff = this.props.blockchain.currentBlock - transactionBlockNumber 
    const time = Date.now() - (blockDiff * averageBlockTime)

    return moment(time).fromNow()
  }

  processTransaction(transaction) {
    const amount = transaction.returnValues.tokens || transaction.returnValues.value

    return {
      'type': transaction.transactionType,
      'from': transaction.fromAddress,
      'timeSince': this.calculateTimeDifference(transaction.blockNumber),
      'to': transaction.returnValues.to,
      'value': transaction.transactionType === 'Approval' ? '' : displayAmount(amount, this.props.currentCoin.decimal),
      'key':  `${transaction.id}${transaction.logIndex}`,
      'url': `https://etherscan.io/tx/${transaction.transactionHash}`,
      'fromUrl': transaction.fromAddress ? `https://etherscan.io/address/${transaction.fromAddress}` : '',
      'fromAddressBalance': displayAmount(transaction.fromAddressBalance, this.props.currentCoin.decimal)
    }
  }


  renderFeed(){

    return (
        this.props.events.slice(0, 20).map((event) => {
            const transaction = this.processTransaction(event)
            const isTopHodler = this.props.topHodlers.map(h => h.address.toLowerCase()).includes(transaction.from.toLowerCase())

            return (
              <tr key={transaction.key}>
                <td>
                  {transaction.timeSince}
                </td>
                <td>
                  <a href={transaction.url} target='_blank' rel='noopener noreferrer'>{transaction.type}</a>
                </td>
                <td>
                  {isTopHodler ? `Hodler #${this.props.topHodlers.findIndex(transaction.from)}` : ''}

                  <a href={transaction.fromUrl ? transaction.fromUrl : ''} target='_blank' rel='noopener noreferrer'>{transaction.from} ( ETH | {transaction.fromAddressBalance} {this.props.currentCoin.name}) </a>
                </td>
                <td>
                  {transaction.value}
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
  return { topHodlers: state.topHodlers, events: state.events, currentCoin: state.selectedCoin, blockchain: state.blockchain }
}


export default connect(mapStateToProps)(EventFeed)
