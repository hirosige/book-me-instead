import React from 'react'
import { Mutation, Query } from "react-apollo";
import {
  GET_POST_CATEGORIES,
} from '../../queries/PostCategory'
import HorizontalInputBoxFrame from '../Shared/HorizontalInputBoxFrame';
import Success from '../Notification/Success'
import Uploader from '../Upload/Uploader'
import MarkdownEditor from './MarkdownEditor';

const PostMutationForm = props => (
  <React.Fragment>
    {props.post && (
      <Mutation mutation={props.mutation}>
        {(mutate, { data, loading, error }) => (
          <React.Fragment>
            <form onSubmit={e => {
              e.preventDefault();

              mutate({
                variables: {
                  ...props.post,
                }
              }).then(() => {
                props.initializeState()
                props.makeCompleted()
              });

            }}>
              <header className="modal-card-head u-no-br u-bk-primary">
                <p className="modal-card-title u-txt-white">{props.title}</p>
                <div className="delete" aria-label="close" onClick={props.switchModal}></div>
              </header>
              {error && (
                <div>{error.message}</div>
              )}
              {props.isCompleted && (
                <Success
                  message={props.message}
                  closeCompleted={props.closeCompleted}
                />
              )}
              <section className="modal-card-body u-txt-gray">
                <HorizontalInputBoxFrame
                  columnName="Title"
                >
                  <input
                    name="title"
                    className="input"
                    type="text"
                    placeholder="Title"
                    value={props.post.title}
                    onChange={props.handleChange}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame columnName="Markdown Contents">
                  <MarkdownEditor
                    setMdContents={props.setMdContents}
                    handleChangePhotos={props.handleChangePhotos}
                  />
                  &nbsp;&nbsp;{props.post.mdContents && (
                    <span className="tag is-warning">
                      Markdown Contents Added
                    </span>
                  )}
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame columnName="Hero">
                  <Uploader
                    id='file'
                    name='content'
                    data-crop=""
                    data-clearable=""
                    value={props.heroValue}
                    onUploadComplete={info => props.handleChangeHero(info)}
                  />
                </HorizontalInputBoxFrame>
                <HorizontalInputBoxFrame columnName="Post Category">
                  <span className="select" style={{ marginRight: "10px", paddingRight: "10px", }} >
                    <Query
                      query={GET_POST_CATEGORIES}
                      variables={{
                        first: 100,
                        skip: 0,
                        searchFilter: {
                          isRoot: true
                        },
                      }}
                    >
                      {({ data, loading, error, refetch }) => {
                        if (loading) return 'loading'
                        if (error) return <div>Error {JSON.stringify(error)}</div>;

                        const { allPostCategories } = data

                        if (allPostCategories.length === 0) {
                          return 'no data'
                        }

                        return (
                          <React.Fragment>
                            <select className="u-no-br" name="categoryId" onChange={props.handleChange} defaultValue={props.post.postCategoryId}>
                              <option value="">Please select post category</option>
                              {allPostCategories.map(postCategory => (
                                <React.Fragment>
                                  <option
                                    key={postCategory.id}
                                    value={postCategory.id}
                                  >{postCategory.name}</option>
                                  {postCategory.children.map(child => (
                                    <React.Fragment>
                                      <option
                                        key={child.id}
                                        value={child.id}
                                      >|--{child.name}</option>
                                      {child.children.map(grandChild => (
                                        <React.Fragment>
                                          {!grandChild.isRoot && (
                                            <option
                                              key={grandChild.id}
                                              value={grandChild.id}
                                            >| |--{grandChild.name}</option>
                                          )}
                                        </React.Fragment>
                                      ))}
                                    </React.Fragment>
                                  ))}
                                </React.Fragment>
                              ))}
                            </select>
                          </React.Fragment>
                        )
                      }}
                    </Query>
                  </span>
                </HorizontalInputBoxFrame>
              </section>
              <footer className="modal-card-foot u-no-br">
                <button className="button is-success u-no-br" type="submit">SUBMIT</button>
                <div className="button u-no-br" onClick={props.switchModal}>CANCEL</div>
              </footer>
            </form>
          </React.Fragment>
        )}
      </Mutation>
    )}
  </React.Fragment>
)

export default PostMutationForm