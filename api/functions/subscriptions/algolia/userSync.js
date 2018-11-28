const algoliasearch = require('algoliasearch')

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY,
)

const index = algolia.initIndex('users')

export default event => {
  const {
    id,
    email,
    auth0UserId
  } = event.data.User.node

  index.addObjects([{
    id,
    email,
    auth0UserId
  }], (error, content) => {
    if (error) {
      return { error }
    }
  })

  console.log(event.data.User.node)

  return {
    event
  }
}
