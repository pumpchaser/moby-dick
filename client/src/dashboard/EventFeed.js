import React, { Component, Fragment } from 'react';

import { Feed, Icon, Segment} from 'semantic-ui-react'

class MainFeed extends Component {
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
    console.log(this.state.events)
   return (
      <Fragment>
        {
          this.state.events.map((event) => {
            return(
              <Feed.Event>
                <Feed.Label>
                  <Icon name='thumbs up outline' />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <a href={event.url} target='_blank'>
                      <Feed.User>{event.type}</Feed.User> by {event.from.slice(0, 8)}
                    </a>
                    <Feed.Date></Feed.Date>
                  </Feed.Summary>
                  <Feed.Meta>
                    <Feed.Like>
                      {event.value} ETH
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
