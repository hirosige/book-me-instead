import React from 'react'
import {
  GET_POSTS,
  DELETE_A_POST,
} from '../../queries/Post'
import { Mutation } from 'react-apollo';
import { produce } from 'immer';
import ButtonHasLoading from '../Shared/ButtonHasLoading'

const PostDeleteMutation = ({
  post,
  indexVariables,
}) => {
  return (
    <Mutation mutation={DELETE_A_POST}>
      {mutation => (
        <ButtonHasLoading
          caption="DELETE"
          className={`button is-danger is-small u-no-br`}
          onClick={ async () => {
            await mutation({
              variables: {
                id: post.id,
              },
              update: (store, { data }) => {
                if (!data || !data.deletePost) {
                  return;
                }

                const posts = store.readQuery({
                  query: GET_POSTS,
                  variables: indexVariables
                })

                store.writeQuery({
                  data: produce(posts, ds => {
                    ds.allPosts.splice(
                      ds.allPosts.findIndex(post => post.id === data.deletePost.id
                    ), 1)
                  }),
                  query: GET_POSTS,
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

export default PostDeleteMutation
