import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import web3 from '../web3';
import EventFeed from '../dashboard/EventFeed';
import { Container, Grid, Menu } from 'semantic-ui-react'
import { fetchTopHodlers } from '../actions/action_hodlers'
import { processEvents } from '../actions/action_events'
import { COIN_CONFIG } from '../coin_config'


class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentToken: '',
    }
  }

  componentDidMount() {
  }


  async setActiveToken(newToken) {
    const { currentToken } = this.state
    if (currentToken === newToken) {
      return
    }
    await this.setState({
      currentToken: newToken,
    })

    this.props.fetchTopHodlers(newToken)
    await this.props.processEvents(newToken)
  }

  renderTopHodlers() {
    return (
      this.props.topHodlers.map(hodler => {
        return <p>{hodler['address']}</p>
      })
    )

  }
  renderMenuOptions() {
    return(
      <Fragment>
        {
          Object.keys(COIN_CONFIG).map((tokenName) => {return(
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
              <EventFeed events={this.props.events}/>
            </Grid.Column>
          </Grid>
          <ToastContainer />
        </Container>
        <Container>
          <div>Top Hodlers: {this.renderTopHodlers()}</div>
        </Container>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return { topHodlers: state.topHodlers, processEvents: state.processEvents, events: state.events}
}

export default connect(mapStateToProps, {fetchTopHodlers, processEvents})(Dashboard);

