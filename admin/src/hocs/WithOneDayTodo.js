import React from 'react'
import OneDayTodo from '../components/Shared/OneDayTodo';

const withOneDayTodo = () => WrappedComponent => {
  return class HOC extends React.Component {
    onedayTodoHere = todo => {
      return <OneDayTodo todo={todo} />
    }

    render () {
      return (
        <React.Fragment>
          <WrappedComponent
          onedayTodoHere={this.onedayTodoHere}
            {...this.props}
            {...this.state}
          />
        </React.Fragment>
      )
    }
  }
}

export default withOneDayTodo
