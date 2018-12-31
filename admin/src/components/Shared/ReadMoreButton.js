import React from 'react'

class ReadMoreButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isRefetching: false,
    }
  }

  toggleIsRefetching = () => {
    this.setState({ isRefetching: !this.state.isRefetching })
  }

  onFetchMore = () => {
    const {
      fetchMore,
      modelName,
      modelData,
    } = this.props

    this.toggleIsRefetching()

    fetchMore({
      variables: {
        skip: modelData.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          [modelName]: [...prev[modelName], ...fetchMoreResult[modelName]]
        });
      }
    })
    .then(_ => this.toggleIsRefetching())
  }

  render () {
    return (
      <button
        className={`button is-primary ${this.state.isRefetching && "Disabled is-loading"} u-no-br`}
        style={{ margin: 10 }}
        onClick={this.onFetchMore}
      >
        READ MORE
      </button>
    )
  }
}

export default ReadMoreButton
