import React from 'react';
import NoContNav from './NoContNav';
import '../App.css';

const Loading = () => (
  <div sytle={{
    background: '#444444',
    height: '100vh'
  }}>
    <NoContNav />
    <div style={{
      background: '#444444',
      height: '93vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className="card" style={{
        height: '80px',
        width: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: '#007bff',
      }}>
        <i className="fas fa-sync fa-spin" style={{
          fontSize: '3rem',
          color: '#dc3545'
        }}></i>
      </div>
    </div>
  </div>
);

export default Loading;