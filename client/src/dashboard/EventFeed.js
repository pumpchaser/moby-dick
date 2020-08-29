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
      'value': transaction.returnValues.tokens ? transaction.returnValues.tokens/(10**this.props.currentCoin.decimal) : '',
      'fromAddressBalance': transaction.fromAddressBalance ? transaction.fromAddressBalance/(10**this.props.currentCoin.decimal) : '',
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
            const eventIcon = (this.EVENT_CONFIG[transaction.type] && this.EVENT_CONFIG[transaction.type]['icon']) || 'question'
            const iconColor = (this.EVENT_CONFIG[transaction.type] && this.EVENT_CONFIG[transaction.type]['color']) || 'black'

            return (
              <tr key={transaction.key}>
                <td>
                  <Icon name={eventIcon} color={iconColor}/>
                </td>
                <td>
                  <a href={transaction.url} target='_blank'>{transaction.type}</a>
                </td>
                <td>
                  <a href={transaction.fromUrl ? transaction.fromUrl : ''} target='_blank'>{transaction.from}</a>
                </td>
                <td>
                  {transaction.value} {this.props.currentCoin.name}
                </td>
                <td>
                  {transaction.fromAddressBalance}
                </td>
                <td>
                  {isTopHodler ? `Hodler #${this.props.topHodlers.findIndex(transaction.from)}` : ''}
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
                <th></th>
                <th>Type</th>
                <th>Address</th>
                <th>Amount Tx</th>
                <th>Holder Balance</th>
                <th>Rank</th>
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
