import React from 'react'

const Danger = ({ message }) => (
  <section>
    <div className="notification is-danger no-br">
      <div>{message}</div>
    </div>
  </section>
)

export default Danger