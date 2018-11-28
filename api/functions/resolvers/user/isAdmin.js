import { GraphQLClient } from 'graphql-request'

const ADMIN = "ADMIN"

const client = new GraphQLClient(process.env.GRAPHCOOL_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCOOL_API_KEY}`,
  },
})

export default async event => {
  const { userId } = event.data

  const roleQuery = `{
    User(id: "${ userId }") {
      role
    }
  }`

  const { User } = await client.request(roleQuery)
  let isAdmin = false

  if (User) {
    isAdmin = User.role === ADMIN
  }

  return {
    data: {
      isAdmin: isAdmin
    }
  }
}
