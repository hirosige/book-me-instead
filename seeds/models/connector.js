const { GraphQLClient } = require('graphql-request')

const client = new GraphQLClient(process.env.GRAPHCOOL_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCOOL_API_KEY}`,
  },
})

module.exports = {
  client
}