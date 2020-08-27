import React, { Component } from 'react';

import { connect } from 'react-redux'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
} from "reactstrap";


class HodlerTable extends Component {
  renderTopHodlers() {
    return (
      this.props.topHodlers.map((hodler, index) => {
        return(
          <tr key={hodler.address}>
            <td>#{index}</td>
            <td>{hodler.address}</td>
            <td>
              {hodler.amount/(10**this.props.currentCoin.decimal)}
            </td>
            <td>
              {hodler.last_transaction.charAt(0)}{hodler.last_transaction.substring(1)/10**this.props.currentCoin.decimal}
            </td>
            <td>
              {hodler.number_transactions}
            </td>
          </tr>
        )
      })
    )
  }

  render() {
    return(
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Top Hodlers</CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="tablesorter" responsive>
            <thead className="text-primary">
              <tr>
                <th>Rank</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Last Tx</th>
                <th># Txs</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTopHodlers()}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  return { topHodlers: state.topHodlers, currentCoin: state.selectedCoin }
}

export default connect(mapStateToProps)(HodlerTable);
