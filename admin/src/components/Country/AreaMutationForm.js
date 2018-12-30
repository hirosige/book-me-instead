import React from 'react'
import { Form } from 'formik'
import FormCompressedField from '../Form/FormCompressedField';

const AreaMutationForm = ({
  errors,
  touched,
  toggleOpen,
}) => (
  <React.Fragment>
    <Form>
      <FormCompressedField
        errors={errors}
        touched={touched}
        columnName={`name`}
      />
      <FormCompressedField
        errors={errors}
        touched={touched}
        columnName={`code`}
      />
      <FormCompressedField
        errors={errors}
        touched={touched}
        columnName={`slug`}
      />
      <input
        className="button is-small is-primary"
        type="submit"
        value="SUBMIT"
      />
      <div
        className="button is-small"
        onClick={toggleOpen}
      >
        CANCEL
      </div>
    </Form>
  </React.Fragment>
)

export default AreaMutationForm
