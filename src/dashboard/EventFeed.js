import React, { Component } from 'react';
import { connect } from 'react-redux'
import { APPROVAL, BUY, SELL } from '../constants/transactions'

import { Label } from 'semantic-ui-react'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";

import ethereum from '../assets/img/ethereum-logo.png'
import { displayAmount } from '../utils/amount'
import moment from 'moment'


class EventFeed extends Component {
  EVENT_CONFIG = {
    [APPROVAL]: {
      'color': 'yellow'
    },
    [BUY]: {
      'color': '#09ff09'
    },
    [SELL]: {
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
      'value': transaction.transactionType === APPROVAL ? '' : displayAmount(amount, this.props.currentCoin.decimal),
      'key':  `${transaction.id}${transaction.logIndex}`,
      'url': `https://etherscan.io/tx/${transaction.transactionHash}`,
      'fromUrl': transaction.fromAddress ? `https://etherscan.io/address/${transaction.fromAddress}` : '',
      'fromAddressBalance': displayAmount(transaction.fromAddressBalance, this.props.currentCoin.decimal),
      'fromAddressBalanceEth': displayAmount(transaction.fromAddressBalanceEth, 18)
    }
  }

  displayTopHodlersRank(isTopHodler, transaction) {
    if (isTopHodler) {
      return (
        <Label color={'purple'} key={'purple'} style={{'marginRight':'5px'}}>
          #{this.props.topHodlers.map(h => h.address.toLowerCase()).indexOf(transaction.from.toLowerCase())}
        </Label>
      )
    }
  }

  renderFeed(){
    return (
        this.props.events.slice(0, 50).map((event, index) => {
            const transaction = this.processTransaction(event)
            const isTopHodler = transaction.from ? this.props.topHodlers.map(h => h.address.toLowerCase()).includes(transaction.from.toLowerCase()) : false
            const color = (this.EVENT_CONFIG[transaction.type] && this.EVENT_CONFIG[transaction.type]['color']) || 'black'
            const tokenLogo = ('logo_url' in this.props.currentCoin) ? this.props.currentCoin.logo_url : 'https://www.pinclipart.com/picdir/middle/106-1069393_clipart-token-png-download.png'
            return (
              <tr key={index}>
                <td>
                  {transaction.timeSince}
                </td>
                <td>
                  <a href={transaction.url} target='_blank' rel='noopener noreferrer' style={{'color': color}}>{transaction.type}</a>
                </td>
                <td>
                  { this.displayTopHodlersRank(isTopHodler, transaction) }
                  <a href={transaction.fromUrl ? transaction.fromUrl : ''} target='_blank' rel='noopener noreferrer'>{transaction.from.toLowerCase()}
                  </a>
                </td>
                <td>
                    <Label image size={'medium'} color={'black'} style={{'marginRight':'5px'}}>
                      <img src={ethereum} />
                        {transaction.fromAddressBalanceEth}
                    </Label>
                    <Label image size={'medium'} color={'black'}>
                      <img src={tokenLogo} />
                        {transaction.fromAddressBalance}
                    </Label>

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
          <Table className="tablesorter" responsive style={{fontSize:'14px'}}>
            <thead className="text-primary">
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Address</th>
                <th>Balance</th>
                <th>Amount ({this.props.currentCoin.name})</th>
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
