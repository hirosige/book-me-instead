import React from 'react'
import { branch, renderComponent } from 'recompose';
import Loading from '../components/Loading'

const hasLoader = WrappedComponent => {

  return branch(
    ({ isLoading }) => isLoading,
    renderComponent(Loading),
    renderComponent(() => <div>Done</div>)
  )
}

export default hasLoader