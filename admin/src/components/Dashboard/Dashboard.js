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
        <div class="card p-dashboard__card">
          <div class="card-content">
            <p class="title">
              “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
            </p>
            <p class="subtitle">
              Jeff Atwood
            </p>
          </div>
        </div>
        <div class="card p-dashboard__card">
          <div class="card-content">
            <p class="title">
              “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
            </p>
            <p class="subtitle">
              Jeff Atwood
            </p>
          </div>
        </div>
        <div class="card p-dashboard__card">
          <div class="card-content">
            <p class="title">
              “There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors.”
            </p>
            <p class="subtitle">
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
