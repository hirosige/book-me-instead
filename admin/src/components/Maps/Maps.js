import React from 'react'
import { compose, withProps } from 'recompose'
import { withRouter } from 'react-router';
import hasLogger from '../../hocs/HasLogger'
import withAuthentication from '../../hocs/WithAuthentication'
import withAuthorization from '../../hocs/WithAuthorization';
import withAdminLayout from '../../hocs/WithAdminLayout';
import withUser from '../../hocs/WithUser';
import withStatelessToolHeader from '../../hocs/WithStatelessToolHeader';
import TestMap from './TestMap'

const Maps = props => (
  <React.Fragment>
    <div className="p-dashboard content is-small">
      <h1 className="p-dashboard__title">Map</h1>
      <div className="p-dashboard__content">
        <TestMap />
      </div>
    </div>
  </React.Fragment>
)

export default compose(
  withProps({
    componentName: 'Maps',
    transactionType: 'List',
  }),
  withRouter, // via react-router
  withAuthentication(),
  withUser(),
  withAuthorization(),
  withAdminLayout(),
  withStatelessToolHeader("MAPS"),
  hasLogger(false),
)(Maps)
