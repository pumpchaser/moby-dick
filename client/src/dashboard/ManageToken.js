import React, { Component } from 'react';

import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Row,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";

import { fetchCoins } from '../actions/action_coins'


class ManageToken extends Component {
  componentWillMount() {
    this.props.fetchCoins()
  }

  goToTokenForm() {
    this.props.history.push("/tokens/form")
  }


  renderTokens() {
    return (
      this.props.coins.map(coin => {
        return (
          <tr key={coin.contract_address}>
            <td>{coin.name}</td>
            <td>{coin.contract_address}</td>
            <td>{coin.block_creation}</td>
            <td>{coin.total_supply}</td>
            <td>{coin.decimal}</td>
            <td>{coin.uniswap_address}</td>
            <td>{coin.last_block}/ETH_LAST_BLOCK</td>
            <td><i className="tim-icons icon-pencil" /></td>
          </tr>
        )
      })
    )
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Card>
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <CardTitle tag="h2">All Tokens</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className="btn-simple"
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => this.goToTokenForm()}
                      >
                        <input
                          defaultChecked
                          className="d-none"
                          name="options"
                          type="radio"
                        />
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Add New Token
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>


              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Contract Address</th>
                      <th>Block Creation</th>
                      <th>Total Supply</th>
                      <th>Decimal</th>
                      <th>Uniswap</th>
                      <th>Last Sync</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTokens()}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Row>
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return { coins: state.coins}
}

export default withRouter(connect(mapStateToProps, { fetchCoins })(ManageToken));
