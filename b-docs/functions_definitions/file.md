### File

```js
type File @model {
  contentType: String!
  createdAt: DateTime!
  id: ID! @isUnique
  name: String!
  secret: String! @isUnique
  size: Int!
  updatedAt: DateTime!
  url: String! @isUnique

  hotels: Hotel @relation(name: "HotelPhotos")
  rooms: Room @relation(name: "RoomPhotos")
  user: User @relation(name: "Avatar")
  advantage: Advantage @relation(name: "AdvantageIcon")
}
```