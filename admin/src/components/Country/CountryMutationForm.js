import React from 'react'
import { Form } from 'formik'
import FormField from '../Form/FormField';

const CountryMutationForm = ({
  errors,
  touched,
  title,
  switchModal
}) => (
  <React.Fragment>
    <Form>
      <header className="modal-card-head u-no-br u-bk-primary">
        <p className="modal-card-title u-txt-white">{title}</p>
        <div className="delete" aria-label="close" onClick={switchModal}></div>
      </header>
      <section className="modal-card-body u-txt-gray">
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
      </section>
      <footer className="modal-card-foot u-no-br">
        <button className="button is-success u-no-br" type="submit">SUBMIT</button>
        <div className="button u-no-br" onClick={switchModal}>CANCEL</div>
      </footer>
    </Form>
  </React.Fragment>
)

export default CountryMutationForm
