export default event => {
  const {
    firstName,
    lastName
   } = event.data

   if (!firstName) {
     return {
       error: "hello"
     }
   }

  return {
    event
  }
}