import React from 'react'
import { compose, defaultProps } from 'recompose'
import { withRouter } from 'react-router';
import hasLogger from '../../hocs/HasLogger'
import withAuthentication from '../../hocs/WithAuthentication'
import withAuthorization from '../../hocs/WithAuthorization';
import withAdminLayout from '../../hocs/WithAdminLayout';
import withUser from '../../hocs/WithUser';
import withStatelessToolHeader from '../../hocs/WithStatelessToolHeader';

const Dashboard = props => (
  <React.Fragment>
    <div className="p-dashboard content is-small">
      <h1 className="p-dashboard__title">DASHBOARD</h1>
      <div className="p-dashboard__content">
        <div className="card p-dashboard__card">
          <div className="card-content">
            <p className="title">
              “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
            </p>
            <p className="subtitle">
              Jeff Atwood
            </p>
          </div>
        </div>
      </div>
    </div>
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
