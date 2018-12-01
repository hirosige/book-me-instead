import React from 'react'
import { Mutation } from "react-apollo";
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';
import Danger from '../Notification/Danger'
import Success from '../Notification/Success'
import Uploader from '../Upload/Uploader'

const AdvantageMutationForm = props => (
  <React.Fragment>
    <Mutation
      mutation={props.mutation}
    >
      {(mutate, { data, loading, error }) => (
        <React.Fragment>
          <form onSubmit={e => {
            e.preventDefault();
            mutate({
              variables: props.advantage
            }).then(() => {
              props.initializeState()
              props.makeCompleted()
            });

          }}>
            <header className="modal-card-head no-br bk-primary">
              <p className="modal-card-title txt-white">{props.title}</p>
              <div className="delete" aria-label="close" onClick={props.switchModal}></div>
            </header>
            {error && (
              <Danger message={error.message} />
            )}
            {props.isCompleted && (
              <Success
                message={props.message}
                closeCompleted={props.closeCompleted}
              />
            )}
            <section className="modal-card-body txt-gray">
              <HorizontalInputBoxFrame
                columnName="Name"
                notice="Do not enter the first zero"
              >
                <input
                  name="name"
                  className="input"
                  type="text"
                  placeholder="Name"
                  value={props.advantage.name}
                  onChange={props.handleChange}
                />
              </HorizontalInputBoxFrame>
              <HorizontalInputBoxFrame
                columnName="Icon"
                notice="Do not enter the first zero"
              >
                <Uploader
                  id='file'
                  name='content'
                  data-crop=""
                  data-clearable=""
                  value={props.photoValue}
                  onChange={(file) => {
                    console.log('File changed: ', file)

                    if (file) {
                      file.progress(info => console.log('File progress: ', info.progress))
                      file.done(info => console.log('File uploaded: ', info))
                    }
                  }}
                  onUploadComplete={info => props.handleChangePhoto(info)}
                />
              </HorizontalInputBoxFrame>
            </section>
            <footer className="modal-card-foot no-br">
              <button className="button is-success no-br" type="submit">SUBMIT</button>
              <div className="button no-br" onClick={props.switchModal}>CANCEL</div>
            </footer>
          </form>
        </React.Fragment>
      )}
    </Mutation>
  </React.Fragment>
)

export default AdvantageMutationForm