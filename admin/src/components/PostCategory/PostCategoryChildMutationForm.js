import React from 'react'
import { Form } from 'formik'
import FormErrorNotification from '../Form/FormErrorNotification';
import FormCompressedField from '../Form/FormCompressedField';

const PostCategoryChildMutationForm = ({
  errors,
  graphqlErrors,
  touched,
  isSubmitting,
  title,
  switchModal
}) => {

  return (
    <React.Fragment>
      <Form>
          {graphqlErrors && (
            <FormErrorNotification graphqlErrors={graphqlErrors} />
          )}
          <FormCompressedField
            errors={errors}
            touched={touched}
            columnName={`name`}
          />
          <button
            className={`button is-small is-primary ${isSubmitting && "is-loading"}`}
            type="submit"
          >SUBMIT</button>
      </Form>
    </React.Fragment>
  )
}

export default PostCategoryChildMutationForm
