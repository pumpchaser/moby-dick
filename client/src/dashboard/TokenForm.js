import React from 'react';
import { connect } from 'react-redux'

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

import { createToken } from '../actions/action_coins'

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
    this.props.createToken(this.state).then((response) => {
      if (response.type === 'success') {
          this.props.history.push('/tokens')
      }
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
                            onChange={this.handleChange}
                            required="true"
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
                            placeholder="'Transfer,Approval'"
                            type="text"
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

export default withRouter(connect(null, { createToken })(TokenForm));

