import React from 'react'

const Success = ({ closeCompleted, message }) => (
  <section>
    <div className="notification is-success no-br">
      <div className="delete" onClick={closeCompleted}></div>
      {message}
    </div>
  </section>
)

export default Success