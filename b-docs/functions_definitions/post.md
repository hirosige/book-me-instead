### Post

```js
type Post @model {
  id: ID! @isUnique
  title: String! @isUnique
  description: String!
  hero: File! @relation(name: "PostHero")

  createdAt: DateTime!
  updatedAt: DateTime!

  author: User! @relation(name: "UserPosts")
  category: PostCategory @relation(name: "PostCategory")
  tags: [Tag!]! @relation(name: "PostTags")
}

getLatestPosts()
getLatestTenPosts()

```