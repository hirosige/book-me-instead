import React from 'react'
import { compose, defaultProps } from 'recompose'
import { withRouter } from 'react-router';
import hasLogger from '../hocs/HasLogger'
import withAuthentication from '../hocs/WithAuthentication'
import withAuthorization from '../hocs/WithAuthorization';
import withAdminLayout from '../hocs/WithAdminLayout';
import withUser from '../hocs/WithUser';
import withSearchBox from '../hocs/WithSearchBox';

const Playground = (props) => (
  <React.Fragment>
    <div>Playground {props.condition}</div>
  </React.Fragment>
)

export default compose(
  defaultProps({
    componentName: 'Playground',
    transactionType: 'List',
  }),
  withRouter, // via react-router
  withAuthentication(),
  withUser(),
  withAuthorization(),
  withAdminLayout(),
  withSearchBox(),
  hasLogger(),
)(Playground)
