import React from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";


// function AddTokenModal() {
//   const [open, setOpen] = React.useState(false)
//   const tokenNameRef = React.useRef(null)
//   const contractAddressRef = React.useRef(null)
//   const blockCreationRef = React.useRef(null)
//   const lastBlockRef = React.useRef(null)
//   const uniswapAddressRef = React.useRef(null)
//   const eventsRef = React.useRef(null)

//   function submit() {
//     // API Call to submit token here
//     const tokenName = tokenNameRef.current.value
//     const contractAddress = contractAddressRef.current.value
//     const blockCreation = blockCreationRef.current.value
//     const lastBlock = lastBlockRef.current.value
//     const uniswapAddress = uniswapAddressRef.current.value
//     const events = eventsRef.current.value

//     console.log('Submit Add Token Form:')
//     console.log(tokenName)
//     console.log(contractAddress)
//     console.log(blockCreation)
//     console.log(lastBlock)
//     console.log(uniswapAddress)
//     console.log(events)

//     setOpen(false)
//   }

class TokenForm extends React.Component {
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
                  <Form>
                    <Row>
                      <Col classname="pr-md-1" md="5">
                        <FormGroup>
                          <label>Token Name</label>
                          <Input
                            placeholder="name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col classname="pr-md-1" md="5">
                        <FormGroup>
                          <label>Contract Address</label>
                          <Input
                            placeholder="Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Events</label>
                          <Input
                            placeholder="i.e: 'Transfer,Approval'"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Decimals</label>
                          <Input
                            placeholder="Decimal"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Block Creation</label>
                          <Input
                            placeholder="Creation Block"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Uniswap Address</label>
                          <Input
                            placeholder="Uniswap"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Logo URL</label>
                          <Input
                            placeholder="url"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Watch List</label>
                          <Input
                            placeholder="Address Comma Separated"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>

                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
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

export default TokenForm;
