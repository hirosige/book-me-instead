import React from 'react'
import { Field } from 'formik'

const FormField = ({ errors, touched, columnName }) => {
  return (
    <div className="field">
      <label className="label" style={{ color: errors[columnName] && "red" }}>{columnName.toUpperCase()}</label>
      <div className="control is-expanded">
        <Field
          className={`input ${errors[columnName] && "is-danger"}`}
          type="text"
          name={columnName}
        />
      </div>
      {errors[columnName] && touched[columnName] && (
        <p className="help is-danger">{errors[columnName]}</p>
      )}
    </div>
  )
}

export default FormField
