import React from 'react'
import { Mutation } from 'react-apollo';
import { produce } from 'immer';
import ButtonHasLoading from '../Shared/ButtonHasLoading'
import {
  DELETE_A_POST_CATEGORY,
  GET_POST_CATEGORIES,
} from '../../queries/PostCategory';

const PostCategoryDeleteMutation = ({
  postCategory,
  indexVariables,
  notifyUser,
}) => {
  return (
    <Mutation mutation={DELETE_A_POST_CATEGORY}>
      {mutation => (
        <ButtonHasLoading
          title="DELETE A POST CATEGORY"
          message="Are you sure to delete ?, This is irreversible!"
          caption="DELETE"
          className="button is-danger u-no-br"
          onClick={ async () => {
            await mutation({
              variables: {
                id: postCategory.id,
              },
              update: (store, { data }) => {
                if (!data || !data.deletePostCategory) {
                  return;
                }

                const postCategories = store.readQuery({
                  query: GET_POST_CATEGORIES,
                  variables: indexVariables
                })

                store.writeQuery({
                  data: produce(postCategories, ds => {
                    ds.allPostCategories.splice(
                      ds.allPostCategories.findIndex(postCategory => postCategory.id === data.deletePostCategory.id
                    ), 1)
                  }),
                  query: GET_POST_CATEGORIES,
                  variables: indexVariables,
                })
              },
            }).then(_ => {
              notifyUser({
                type: "is-success",
                message: "Post Category is successfully deleted"
              })
            }).catch(error => {
              notifyUser({
                type: "is-danger",
                message: error.message
              })
            })
          }}
        />
      )}
    </Mutation>
  )
}

export default PostCategoryDeleteMutation
