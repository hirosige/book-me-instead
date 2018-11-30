import React from 'react'
import { compose, defaultProps } from 'recompose'
import { withRouter } from 'react-router';
import hasLogger from '../../hocs/HasLogger'
import withAuthentication from '../../hocs/WithAuthentication'
import withAuthorization from '../../hocs/WithAuthorization';
import withAdminLayout from '../../hocs/WithAdminLayout';
import withUser from '../../hocs/WithUser';
import withStatelessToolHeader from '../../hocs/WithStatelessToolHeader';

const Dashboard = (props) => (
  <React.Fragment>
    <div>Dashboard {props.condition}</div>
  </React.Fragment>
)

export default compose(
  defaultProps({
    componentName: 'Dashboard',
    transactionType: 'List',
  }),
  withRouter, // via react-router
  withAuthentication(),
  withUser(),
  withAuthorization(),
  withAdminLayout(),
  withStatelessToolHeader("DASHBOARD"),
  hasLogger(),
)(Dashboard)
