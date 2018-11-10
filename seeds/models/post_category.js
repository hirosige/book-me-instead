const { client } = require('./connector')

async function asyncMutationPostCategory(array) {
  return Promise.all(array.map(async postCategory => {
    await client.request(createPostCategoryMutation(postCategory))
  }))
}

function createPostCategoryMutation(postCategory) {
  return `mutation {
    createPostCategory (
      name: "${postCategory.name}"
    ) {
      id
    }
  }`
}

module.exports = {
  asyncMutationPostCategory
}