import React from 'react'
import { Field } from 'formik'

const FormArea = ({ errors, touched, columnName, height }) => {
  return (
    <div className="field">
      <label className="label" style={{ color: errors[columnName] && "red" }}>{columnName.toUpperCase()}</label>
      <div className="control is-expanded">
        <Field
          className={`input ${errors[columnName] && "is-danger"}`}
          component="textarea"
          style={{ height }}
          name={columnName}
        />
      </div>
      {errors[columnName] && touched[columnName] && (
        <p className="help is-danger">{errors[columnName]}</p>
      )}
    </div>
  )
}

export default FormArea
