import { request } from 'graphql-request'

const ADMIN = "ADMIN"

// const client = new GraphQLClient(process.env.GRAPHCOOL_SIMPLE_ENDPOINT, {
//   headers: {
//     Authorization: `Bearer ${process.env.GRAPHCOOL_API_KEY}`,
//   },
// })

export default async event => {
  console.log(event)
  const { userId } = event.data

  return {
    data: {
      id: 'test',
      role: 'test'
    }
  }
}
