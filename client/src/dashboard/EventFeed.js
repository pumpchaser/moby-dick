import React, { Component, Fragment } from 'react';
import { Table, Icon, Segment} from 'semantic-ui-react'


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
    this.state = {
      events: props.events,
      currentCoin: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ events: nextProps.events, currentCoin: nextProps.currentCoin });  
  }

  getTransactionType(transaction, currentCoin){
    if (transaction.event === 'Transfer') {
      if (transaction.returnValues.to.toLowerCase() ===this.state.currentCoin.uniswap_address.toLowerCase()){
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
      'type': this.getTransactionType(transaction, this.state.currentCoin),
      'from': fromAddress,
      'to': transaction.returnValues.to,
      'value': transaction.returnValues.value/(10**this.state.currentCoin.decimal),
      'key':  `${transaction.id}${transaction.logIndex}`,
      'url': `https://etherscan.io/tx/${transaction.transactionHash}`,
      'fromUrl': fromAddress ? `https://etherscan.io/address/${fromAddress}` : '',
    }   
  }

  renderFeed(){
    return (
      <Fragment>
        {
          this.state.events.slice(0, 20).map((event) => {
            const transaction = this.processTransaction(event)
            const isTopHodler = this.props.topHodlers.map(h => h.address).includes(transaction.from)
            const eventIcon = (this.EVENT_CONFIG[transaction.type] && this.EVENT_CONFIG[transaction.type]['icon']) || 'question'
            const iconColor = (this.EVENT_CONFIG[transaction.type] && this.EVENT_CONFIG[transaction.type]['color']) || 'black'

          return(
            <Table.Row key={transaction.key}>
              <Table.Cell>
                <Icon name={eventIcon} color={iconColor}/>
              </Table.Cell>
              <Table.Cell>
                <a href={transaction.url} target='_blank'>{transaction.type}</a>
              </Table.Cell>
              <Table.Cell>
                <a href={transaction.fromUrl ? transaction.fromUrl : ''} target='_blank'>{transaction.from}</a>
              </Table.Cell>
              <Table.Cell>
                {transaction.value} {this.state.currentCoin.name}
              </Table.Cell>
              <Table.Cell>
                {isTopHodler ? `Hodler #${this.props.topHodlers.findIndex(transaction.from)}` : ''}
              </Table.Cell>
            </Table.Row>
          )            

          })
        }
      </Fragment>
    );
  }

  render() {
    return(
      <Table celled padded size={'small'} compact={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine></Table.HeaderCell>
            <Table.HeaderCell singleLine>Type</Table.HeaderCell>
            <Table.HeaderCell singleLine>Address</Table.HeaderCell>
            <Table.HeaderCell singleLine>Value</Table.HeaderCell>
            <Table.HeaderCell singleLine>Hodler Rank</Table.HeaderCell>
          </Table.Row>
        </Table.Header> 
        {this.renderFeed()}
      </Table>
    )
  }
}

export default EventFeed
