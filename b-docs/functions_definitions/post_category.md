### Post Category

```js
type PostCategory @model {
  id: ID! @isUnique
  name: String! @isUnique

  createdAt: DateTime!
  updatedAt: DateTime!

  posts: [Post!]! @relation(name: "PostCategory")
}

getCount()

```