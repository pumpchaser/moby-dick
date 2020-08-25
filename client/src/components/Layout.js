import React, { Fragment } from 'react';
import Header from './Header';
import { Grid  } from 'semantic-ui-react'

export default(props) => {
  return(
    <Fragment>
	      <Grid>
	      	<Grid.Row>
		      	<Header/>
		      </Grid.Row>
		      <Grid.Row>
			      {props.children}
			    </Grid.Row>
			  </Grid>
    </Fragment>
  )
};
