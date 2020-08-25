import React, { Component, Fragment } from 'react';

import { Feed, Icon, Segment} from 'semantic-ui-react'

class MainFeed extends Component {
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
    }
  }
  constructor(props){
    super(props)
    this.state = {
      events: props.events
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ events: nextProps.events });  
  }

  renderFeed(){
    return (
      <Fragment>
        {
          this.state.events.map((event) => {
            return(
              <Feed.Event key={event.txId}>
                <Feed.Label>
                  <Icon name={`${this.EVENT_CONFIG[event.type]['icon']}`} color={`${this.EVENT_CONFIG[event.type]['color']}`} />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <a href={event.url} target='_blank' rel='noopener noreferrer'>
                      <Feed.User>{event.type}</Feed.User> by {event.from}
                    </a>
                    <Feed.Date></Feed.Date>
                  </Feed.Summary>
                  <Feed.Meta>
                    <Feed.Like>
                      {event.value} tokens
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

export default MainFeed
