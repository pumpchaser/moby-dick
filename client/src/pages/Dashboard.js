import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import web3 from '../web3';
import EventFeed from '../dashboard/EventFeed';
import { Segment, Container, Grid, Menu, Feed,  Header, Table } from 'semantic-ui-react'
import { fetchTopHodlers } from '../actions/action_hodlers'
import { fetchCoins } from '../actions/action_coins'
import { processEvents } from '../actions/action_events'


class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentCoin: {},
    }
  }

  componentWillMount() {
    this.props.fetchCoins()
  }


  async setActiveToken(newToken) {
    const { currentCoin } = this.state
    if (currentCoin.name === newToken) {
      return
    }
    const newCoin = this.props.coins.find(c => c.name == newToken)
    await this.setState({
      currentCoin: newCoin,

    })

    this.props.fetchTopHodlers(newToken)
    await this.props.processEvents(newCoin)
  }

  renderTopHodlers() {
    return (
      this.props.topHodlers.map(hodler => {
        return(
          <Table.Row>
            <Table.Cell>
              {hodler.address}
            </Table.Cell>
            <Table.Cell>
              {hodler.amount/(10**this.state.currentCoin.decimal)}
            </Table.Cell>
            <Table.Cell>
              {hodler.number_transactions}
            </Table.Cell>
            <Table.Cell>
              {hodler.last_transaction}
            </Table.Cell>
          </Table.Row>
        )
      })
    )

  }
  renderMenuOptions() {
    return(
      <Fragment>
        {
          this.props.coins.map((coin) => {
          return(
            <Menu.Item key={coin.name} color={'blue'} onClick={() => this.setActiveToken(coin.name)} active={this.state.currentCoin.name === coin.name}>
              {coin.name}
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
              <Grid.Row>
                Main Feed
                <EventFeed 
                  events={this.props.events} 
                  currentCoin={this.state.currentCoin} 
                  topHodlers={this.props.topHodlers}/>
              </Grid.Row>
              <Grid.Row>
                Top Hodlers: 

                  <Table celled padded size={'small'} compact={true}>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell singleLine>Address</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Amount</Table.HeaderCell>
                        <Table.HeaderCell singleLine># of Txs</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Last Tx</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header> 

                    <Table.Body>
                      {this.renderTopHodlers()}
                    </Table.Body>
                  </Table>
              </Grid.Row>
            </Grid.Column>
          </Grid>
          <ToastContainer />
        </Container>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return { fetchCoins: state.fetchCoins, topHodlers: state.topHodlers, processEvents: state.processEvents, events: state.events, coins: state.coins}
}

export default connect(mapStateToProps, {fetchTopHodlers, processEvents, fetchCoins})(Dashboard);

