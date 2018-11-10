import React from 'react';
import { isLoggedIn } from '../utils/AuthService';
import Layout from './Layout';

const Home = () => (
  <Layout>
    { isLoggedIn() &&
      <div className="card" style={{ width: '100%', borderRadius: 0 }}>
        <div className="card-body">
          <h5 className="card-title">Secure Home</h5>
        </div>
      </div>
    }

    { !isLoggedIn() &&
      <div className="card" style={{ width: '100%', borderRadius: 0 }}>
        <div className="card-body">
          <h5 className="card-title">Home</h5>
        </div>
      </div>
    }
  </Layout>
)

export default Home;