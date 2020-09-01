import React, { Component } from 'react';
import { connect } from 'react-redux'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,

  Table,
} from "reactstrap";

import { displayAmount } from '../utils/amount'
import { fetchTopHodlers } from '../actions/action_hodlers'

const STREAK_UPPER_BOUND = -2
const STREAK_LOWER_BOUND = 2

class HodlerTable extends Component {
  renderRibbon(hodler) {
    if (!hodler.streak || hodler.streak < STREAK_UPPER_BOUND || hodler.streak > STREAK_LOWER_BOUND) {
      return (
        <td></td>
      )
    }
    return (
      <td>
      {hodler.streak}
      </td>
    )
  }
  renderTopHodlers() {
    return (
      this.props.topHodlers.map((hodler, index) => {
        return(
          <tr key={index}>
            {this.renderRibbon(hodler)}
            <td>#{index}</td>
            <td>{hodler.address}</td>
            <td>
              {displayAmount(hodler.amount, this.props.currentCoin.decimal)}
            </td>
          </tr>
      )
      })
    )
  }

  async componentDidMount() {
    try {
        setInterval(async () => {
          if (this.props.currentCoin != null) {
              this.props.fetchTopHodlers(this.props.currentCoin.name)
          }
      }, 30000);
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return(
      <Card className="card-user">
        <CardBody>
          <CardText />
          <div className="author">
            <div className="block block-one" />
            <div className="block block-two" />
            <div className="block block-three" />
            <div className="block block-four" />
            <a href="#pablo" onClick={e => e.preventDefault()}>
              <img
                alt="..."
                className="avatar"
                src={require("../assets/img/emilyz.jpg")}
              />
              <h5 className="title">{this.props.currentCoin.name}</h5>
            </a>
            <br />
            <p className="description">Top Hodlers</p>
          </div>
          <Table className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>
                <th>Streak</th>
                <th>#</th>
                <th>Address</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTopHodlers()}
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <div className="button-container">
            <Button className="btn-icon btn-round" color="facebook">
              <i className="fab fa-facebook" />
            </Button>
            <Button className="btn-icon btn-round" color="twitter">
              <i className="fab fa-twitter" />
            </Button>
            <Button className="btn-icon btn-round" color="google">
              <i className="fab fa-google-plus" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return { topHodlers: state.topHodlers, currentCoin: state.selectedCoin }
}

export default connect(mapStateToProps, { fetchTopHodlers })(HodlerTable);
