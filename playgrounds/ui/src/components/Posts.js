import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { graphql} from 'react-apollo'
import gql from 'graphql-tag'
import Layout from './Layout';

class Posts extends Component {
  render() {
    const { allPosts } = this.props.getAllPosts

    return (
      <Layout>
        <div>
          { allPosts && allPosts.map(post => (
            <div key={post.id}>
              {post.description}
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

const GET_ALL_POSTS = gql`
  query {
    allPosts {
      id
      description
      imageUrl
    }
  }
`

const PageWithQuery = graphql(GET_ALL_POSTS, {name: 'getAllPosts'})(Posts)
export default withRouter(PageWithQuery)