import React, { Fragment } from 'react';
import Header from './Header';

export default(props) => {
  return(
    <Fragment>
      <Header/>

      {props.children}
    </Fragment>
  )
};
