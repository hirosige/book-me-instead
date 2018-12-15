import React from 'react'

const Danger = ({ messages }) => (
  <section>
    <ul className="notification is-danger u-no-br" style={{ padding: "10px" }}>
      {messages.map((message, i) => (
          <li>
            <i
              className="fas fa-bug"
              style={{ marginRight: "10px" }}
            ></i>
            <span>{message['en']}</span>
          </li>
      ))}
    </ul>
  </section>
)

export default Danger