import React, { Component, Fragment } from 'react';
import { Table } from 'semantic-ui-react'


class HodlerTable extends Component {
  renderTopHodlers() {
    return (
      this.props.topHodlers.map(hodler => {
        return(
          <Table.Row key={hodler.address}>
            <Table.Cell>
              {hodler.address}
            </Table.Cell>
            <Table.Cell>
              {hodler.amount/(10**this.props.currentCoin.decimal)}
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

  render() {
    return(
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
    )
  }
}

export default HodlerTable
