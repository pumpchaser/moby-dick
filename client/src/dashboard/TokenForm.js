import React from 'react';
import { connect } from 'react-redux'

import { matchPath } from 'react-router'
import { withRouter } from "react-router-dom"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

import { fetchCoins, createToken, editToken } from '../actions/action_coins'

class TokenForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      contract_address: '',
      uniswap_address: '',
      events: '',
      synced: false,
      decimal: '',
      total_supply: '',
      block_creation: '',
      watchlist_addresses: '',
      logo_url: '',
      website_url: '',
      coingecko_url: '',
      twitter_url: '',
      telegram_url: '',
    }
  }

  handleChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.props.match.params.name) {
      // Edit
      this.props.editToken(this.state).then((response) => {
        if (response.type === 'success') {
            this.props.history.push('/tokens')
        }
      })
    } else {
      // Creation
      this.props.createToken(this.state).then((response) => {
        if (response.type === 'success') {
            this.props.history.push('/tokens')
        }
      })
    }
  }

  componentDidMount() {
    if (this.props.match.params.name) {
      var token = this.findCoinByName(this.props.match.params.name)
      this.setState({
        'name': token.name,
        'contract_address': token.contract_address,
        'uniswap_address': token.uniswap_address,
        'events': token.events,
        'synced': token.synced,
        'decimal': token.decimal,
        'total_supply': token.total_supply,
        'block_creation': token.block_creation,
        'watchlist_addresses': token.watchlist_addresses,
        'logo_url': token.logo_url,
        'website_url': token.website_url,
        'coingecko_url': token.coingecko_url,
        'twitter_url': token.twitter_url,
        'telegram_url': token.telegram_url,
      })
    }
  }


  findCoinByName(name) {
    return this.props.coins.find(token => {
      return token.name === name
    })
  }


  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Token Form</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Token Name</label>
                          <Input
                            placeholder="name"
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Contract Address</label>
                          <Input
                            name="contract_address"
                            placeholder="Address"
                            type="text"
                            value={this.state.contract_address}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Events</label>
                          <Input
                            name="events"
                            placeholder="Transfer,Approval"
                            type="text"
                            value={this.state.events}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Block Creation</label>
                          <Input
                            name="block_creation"
                            placeholder="Creation Block"
                            type="text"
                            value={this.state.block_creation}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Decimals</label>
                          <Input
                            name="decimal"
                            placeholder="Decimal"
                            type="text"
                            value={this.state.decimal}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Total Supply</label>
                          <Input
                            name="total_supply"
                            placeholder="Total Supply"
                            type="text"
                            value={this.state.total_supply}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Uniswap Address</label>
                          <Input
                            name="uniswap_address"
                            placeholder="Uniswap"
                            type="text"
                            value={this.state.uniswap_address}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Logo URL</label>
                          <Input
                            name="logo_url"
                            placeholder="logo url"
                            type="text"
                            value={this.state.logo_url}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Website URL</label>
                          <Input
                            name="website_url"
                            placeholder="Website URL"
                            type="text"
                            value={this.state.website_url}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>CoinGecko URL</label>
                          <Input
                            name="coingecko_url"
                            placeholder="logo url"
                            type="text"
                            value={this.state.coingecko_url}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Watch List</label>
                          <Input
                            name="watchlist_addresses"
                            placeholder="Address Comma Separated"
                            type="text"
                            value={this.state.watchlist_addresses}
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>

                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={this.handleSubmit}>
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    coins: state.coins
  }
}

export default withRouter(connect(mapStateToProps, { createToken, editToken, fetchCoins })(TokenForm));

