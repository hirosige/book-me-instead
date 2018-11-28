import React from 'react'
import '../App.css';

const Loading = () => (
  <div sytle={{
    background: '#EDF2F7',
    height: '100vh',
  }}>
    <div style={{
      background: '#EDF2F7',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <span className="icon" style={{
        height: '80px',
        width: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        background: '#007BFF',
      }}>
        <i className="fas fa-sync fa-spin" style={{
          fontSize: '3rem',
          color: '#ffffff'
        }}></i>
      </span>
    </div>
  </div>
);

export default Loading