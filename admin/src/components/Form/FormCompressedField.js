import React from 'react'
import { Field } from 'formik'

const FormCompressedField = ({ errors, touched, columnName }) => {
  return (
    <div className="field is-expanded">
      <div className="field has-addons">
        <div className="control">
          <div className="button is-static is-small">
            {columnName.toUpperCase()}
          </div>
        </div>
        <div className="control is-expanded">
          <Field
            className={`input is-small ${errors[columnName] && "is-danger"}`}
            type="text"
            name={columnName}
            placeholder={columnName.toUpperCase()}
          />
        </div>
      </div>
      {errors[columnName] && touched[columnName] && (
        <p className="help is-danger">{errors[columnName]}</p>
      )}
    </div>
  )
}

export default FormCompressedField
