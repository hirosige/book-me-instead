import React from 'react'
import SearchForm from '../components/Shared/SearchForm';

const withSearchBox = (
  CreateModalComponent,
  columnTypes,
  defaultSearchColumn
) => WrappedComponent => {
  return class HOC extends React.Component {
    state = {
      tmpSearchKeywords: {
        defaultColumn: defaultSearchColumn,
        column: defaultSearchColumn,
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
          searchCondition: {
            [`${this.state.tmpSearchKeywords.defaultColumn}_contains`]: ""
          }
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
          <div style={{
            background: "#17a2b8",
            color: "#ffffff",
            fontSize: "1.2rem",
            height: "45.5px",
            padding: "6px",
          }}>
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  TOOLBOX
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  {CreateModalComponent && (
                    <CreateModalComponent {...this.props} />
                  )}
                </div>
                <div className="level-item">
                  <SearchForm
                    {...this.state}
                    handleChange={this.handleChange}
                    columnTypes={columnTypes}
                  />
                </div>
              </div>
            </div>
          </div>
          <WrappedComponent {...this.props} {...this.state} />
        </React.Fragment>
      )
    }
  }
}

export default withSearchBox