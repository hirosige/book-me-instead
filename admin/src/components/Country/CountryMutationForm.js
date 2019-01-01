import React from 'react'
import { Form } from 'formik'
import FormField from '../Form/FormField';
import FormErrorNotification from '../Form/FormErrorNotification';

const CountryMutationForm = ({
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
        <header className="modal-card-head u-no-br u-bk-primary">
          <p className="modal-card-title u-txt-white">{title}</p>
          <div className="delete" aria-label="close" onClick={switchModal}></div>
        </header>
        <section className="modal-card-body u-txt-gray" style={{
          height: "400px",
          overflow: "auto",
        }}>
          {graphqlErrors && (
            <FormErrorNotification graphqlErrors={graphqlErrors} />
          )}
          <hr />
          <FormField
            errors={errors}
            touched={touched}
            columnName={`name`}
          />
          <FormField
            errors={errors}
            touched={touched}
            columnName={`code`}
          />
          <FormField
            errors={errors}
            touched={touched}
            columnName={`slug`}
          />
          <hr />
        </section>
        <footer className="modal-card-foot u-no-br">
          <button className={`button is-success ${isSubmitting && "is-loading"} u-no-br`} type="submit">SUBMIT</button>
          <div className="button u-no-br" onClick={switchModal}>CANCEL</div>
        </footer>
      </Form>
    </React.Fragment>
  )
}

export default CountryMutationForm
