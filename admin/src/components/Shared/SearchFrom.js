import React from 'react'

const graphcoolConditions = [
  { id:  1, type: "",                name: "Equals" },
  { id:  2, type: "not",             name: "Not Equals" },
  { id:  3, type: "in",              name: "In" },
  { id:  4, type: "not_in",          name: "Not In" },
  { id:  5, type: "lt",              name: "Less Than" },
  { id:  6, type: "lte",             name: "Less Than And Equal" },
  { id:  7, type: "gt",              name: "Greater Than" },
  { id:  8, type: "gte",             name: "Greater Than And Equal" },
  { id:  9, type: "contains",        name: "Contains" },
  { id: 10, type: "not_contains",    name: "Not Contains" },
  { id: 11, type: "starts_with",     name: "Starts With" },
  { id: 12, type: "not_starts_with", name: "Not Starts With" },
  { id: 13, type: "ends_with",       name: "Ends With" },
  { id: 14, type: "not_ends_with",   name: "Not Ends With" }
]

const SearchForm = (props) => (
  <form>
    <div className="field has-addons">
      <div className="control">
        <span className="select">
          <select name="column" onChange={props.handleChange} style={{ borderRadius: 0 }}>
            <option value="name">Name</option>
            <option value="code">Code</option>
            <option value="slug">Slug</option>
          </select>
        </span>
      </div>
      <div className="control">
        <span className="select">
          <select name="condition" onChange={props.handleChange} style={{ borderRadius: 0 }}>
            {graphcoolConditions.map(({ id, type, name }) => (
              <option key={id} value={type}>{name}</option>
            ))}
          </select>
        </span>
      </div>
      <div className="control">
        <input
          className="input"
          style={{ borderRadius: 0 }}
          type="text"
          name="keyword"
          onChange={props.handleChange}
          value={props.tmpSearchKeywords.name_contains}
          placeholder="Search Keyword" />
      </div>
    </div>
  </form>
)

export default SearchForm