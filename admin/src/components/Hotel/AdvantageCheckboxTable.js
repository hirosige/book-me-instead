import React from 'react'
import { Query } from "react-apollo";
import { GET_ADVANTAGES } from '../../queries/Advantage'

const AdvantageCheckboxTable = props => (
  <Query
    query={GET_ADVANTAGES}
    variables={{
      first: 100,
      skip: 0,
      searchFilter: {},
    }}
  >
    {({ data, loading, error }) => {
      if (loading) return 'loading'
      if (error) return <div>Error {JSON.stringify(error)}</div>;

      const { allAdvantages } = data

      return (
        <React.Fragment>
          <table style={{ tableLayout: "fixed" }} className="table is-bordered is-striped is-narrow is-hoverable">
            <thead>
              <tr>
                <th className="c-table-cell u-w50"><abbr title="Check">Check&nbsp;<span className="tag is-warning">いつの日かTODO: 全て選択</span></abbr></th>
                <th className="c-table-cell u-w200"><abbr title="NAME">Name&nbsp;<span className="tag is-warning">いつの日かTODO: Advantage追加ボタン</span></abbr></th>
              </tr>
            </thead>
            <tbody>
              {allAdvantages.length === 0 ? (
                <tr>
                  <td colspan="2">
                    <span className="tag is-warning" style={{ width: "100%" }}>
                      No Advantage Registered..
                    </span>
                  </td>
                </tr>
              ) : (
                <React.Fragment>
                  {allAdvantages.map(advantage => (
                    <tr key={advantage.id}>
                      <td>
                        <div className="field">
                          <input
                            onChange={props.handleCheckBox}
                            id={advantage.id}
                            type="checkbox"
                            name={advantage.id}
                            checked={props.hotel.advantages.includes(advantage.id)}
                          />
                        </div>
                      </td>
                      <td>
                        <label style={{ width: "100%" }} htmlFor={advantage.id}>{advantage.name}</label>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
          </table>
        </React.Fragment>
      )
    }}
  </Query>
)

export default AdvantageCheckboxTable
