import React from 'react';
import Layout from './Layout';
import WithProxy from '../hoc/WithProxy'

const Dashboard = () => (
  <Layout>
    <div className="notification is-primary" style={{ borderRadius: 0 }}>
      This is your dashboard! congratulations
    </div>
  </Layout>
)

export default WithProxy(Dashboard);