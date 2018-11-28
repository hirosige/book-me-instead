import React from 'react'
import SearchForm from '../components/Shared/SearchFrom';

const withSearchBox = CreateModalComponent => WrappedComponent => {
  return class HOC extends React.Component {
    state = {
      tmpSearchKeywords: {
        column: "name",
        condition: "",
        keyword: ""
      },
      searchCondition: {},
    }

    handleChange = async (e) => {
      e.preventDefault()
      await this.setState({
        tmpSearchKeywords: {
          ...this.state.tmpSearchKeywords,
          [e.target.name]: e.target.value,
        }
      })
      this.makeSearchObject(this.state.tmpSearchKeywords)
    }

    makeSearchObject = ({ condition, column, keyword }) => {
      if (!keyword) {
        this.setState({
          searchCondition: { name_contains: "" }
        })
      } else {
        this.setState({
          searchCondition: condition ?
          {
            [`${column}_${condition}`]: keyword
          } : {
            [`${column}`]: keyword}
          })
      }
    }

    render () {
      return (
        <React.Fragment>
          <nav className="navbar" role="navigation" aria-label="main navigation" style={{ background: "#17a2b8", fontSize: "1.2rem", zIndex: 2 }}>
            <div className="navbar-brand">
              <div className="navbar-item" style={{ color: "#ffffff" }}>
                TOOLBOX
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item" style={{ color: "#ffffff" }}>
                <nav className="level">
                  <div className="level-right">
                    <div className="level-item">
                      <CreateModalComponent {...this.props} />
                    </div>
                    <div className="level-item">
                      <SearchForm
                        {...this.state}
                        handleChange={this.handleChange}
                      />
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </nav>
          <WrappedComponent {...this.props} {...this.state} />
        </React.Fragment>
      )
    }
  }
}

export default withSearchBox