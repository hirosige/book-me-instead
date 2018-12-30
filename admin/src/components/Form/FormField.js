import React from 'react'
import { Field } from 'formik'

const FormField = ({ errors, touched, columnName }) => {
  return (
    <div class="field">
      <label class="label" style={{ color: errors[columnName] && "red" }}>{columnName.toUpperCase()}</label>
      <div class="control is-expanded">
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
