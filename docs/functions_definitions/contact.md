### Contact

```js
type Contact @model {
  id: ID! @isUnique
  name: String!
  email: String!
  tel: String!
  title: String!
  reference: String!
  description: String!
  isReplied: Boolean

  createdAt: DateTime!
  updatedAt: DateTime!
}

sendNotification()
getNotYetRepliedMails()

```