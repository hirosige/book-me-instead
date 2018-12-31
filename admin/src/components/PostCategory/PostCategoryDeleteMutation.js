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
}) => {
  return (
    <Mutation mutation={DELETE_A_POST_CATEGORY}>
      {mutation => (
        <ButtonHasLoading
          caption="DELETE"
          className={`button is-danger is-small u-no-br`}
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
            })
          }}
        />
      )}
    </Mutation>
  )
}

export default PostCategoryDeleteMutation
