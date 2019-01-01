import React from 'react'
import { Form } from 'formik'
import FormField from '../Form/FormField';
import FormArea from '../Form/FormArea';
import FormErrorNotification from '../Form/FormErrorNotification';

const ContactMutationForm = ({
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
          <div className="columns">
            <div className="column is-half">
              <FormField
                errors={errors}
                touched={touched}
                columnName={`name`}
              />
              <FormField
                errors={errors}
                touched={touched}
                columnName={`email`}
              />
              <FormField
                errors={errors}
                touched={touched}
                columnName={`tel`}
              />
              <FormField
                errors={errors}
                touched={touched}
                columnName={`title`}
              />
            </div>
            <div className="column">
              <FormArea
                errors={errors}
                touched={touched}
                height={100}
                columnName={`description`}
              />
              <FormArea
                errors={errors}
                touched={touched}
                height={100}
                columnName={`reference`}
              />
            </div>
          </div>
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

export default ContactMutationForm
