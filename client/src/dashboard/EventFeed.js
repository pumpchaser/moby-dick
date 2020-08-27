import React, { Component, Fragment } from 'react';
import { Feed, Icon, Segment} from 'semantic-ui-react'

import { COIN_CONFIG } from '../coin_config'

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
    // 'Burn': {
    //   'icon': 'sign out',
    //   'color': 'red'
    // },
    // 'Unstake': {
    //   'icon': 'sign out',
    //   'color': 'red'
    // }
  }
  constructor(props){
    super(props)
    this.state = {
      events: props.events,
      currentToken: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ events: nextProps.events, currentToken: nextProps.currentToken });  
  }

  getTransactionType(transaction, currentToken){
    if (transaction.event === 'Transfer') {
      if (transaction.returnValues.to.toLowerCase() === COIN_CONFIG[this.state.currentToken]['uniswap'].toLowerCase()){
        return 'Sell'
      } else {
        return 'Buy'
      }
    }
    return transaction.event
  }

  processTransaction(transaction) {
    return {
      'type': this.getTransactionType(transaction, this.state.currentToken),
      'from': transaction.returnValues.from || transaction.returnValues.owner,
      'to': transaction.returnValues.to,
      'value': transaction.returnValues.value/1000000000000000000,
      'txId': transaction.id,
      'url': `https://etherscan.io/tx/${transaction.transactionHash}`,
    }   
  }

  renderFeed(){
    return (
      <Fragment>
        {
          this.state.events.slice(0, 20).map((event) => {
            const transaction = this.processTransaction(event)
            const isTopHodler = this.props.topHodlers.includes(transaction.from)
            const eventIcon = (this.EVENT_CONFIG[transaction.type] && this.EVENT_CONFIG[transaction.type]['icon']) || 'question'
            const iconColor = (this.EVENT_CONFIG[transaction.type] && this.EVENT_CONFIG[transaction.type]['color']) || 'black'
            return(
              <Feed.Event key={transaction.txId}>
                <Feed.Label>
                  <Icon name={`${eventIcon}`} color={`${iconColor}`} />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User href={transaction.url} target='_blank'>{transaction.type} by {transaction.from}</Feed.User>
                    <Feed.Date>{isTopHodler ? this.props.topHodlers.findIndex(transaction.from) : ''}</Feed.Date>
                  </Feed.Summary>
                  <Feed.Meta>
                    <Feed.Like>
                      {transaction.value} {this.state.currentToken}
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
           )
          })
        }
      </Fragment>
    );
  }

  render() {
    return(
      <Segment>
        <Feed>
          {this.renderFeed()}
        </Feed>
      </Segment>
    )
  }
}

export default EventFeed
