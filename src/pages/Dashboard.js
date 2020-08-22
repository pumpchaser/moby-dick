import React, { Component, Fragment } from 'react';
import AddTokenModal from '../dashboard/AddToken';

class Dashboard extends Component {
  componentDidMount() {
  }

  render() {
    return(
      <Fragment>
          <div className="center">
            <h2>WhaleHunter</h2>
            <AddTokenModal>Add Token</AddTokenModal>
          </div> 
      </Fragment>
    )
  }
}

export default Dashboard;

