const omiseClient = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

import { GraphQLClient } from 'graphql-request'

const graphcoolClient = new GraphQLClient(process.env.GRAPHCOOL_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCOOL_API_KEY}`,
  },
})

export default async event => {
  const { userId } = event.data

  const roleQuery = `{
    User(id: "${ userId }") {
      id
      email
    }
  }`

  const { User } = await graphcoolClient.request(roleQuery)

  const createdCustomer = await omiseClient.customers.create({
    email: User.email,
    description: "From Book Me Instead API",
  },
  (error, customer) => {
    if (error) {
      return { error: error }
    }

    return customer
  })

  const updateUserMutation = `
  mutation {
    updateUser(
      id: "${User.id}"
      omiseCustomerId: "${createdCustomer.id}"
    ) {
      id
      email
      omiseCustomerId
    }
  }`

  const { updateUser } = await graphcoolClient.request(updateUserMutation)

  event.data = {
    ...updateUser
  }

  return {
    data: event.data
  }
}
