const { client } = require('./connector')

async function asyncMutationCountry(array) {
  return Promise.all(array.map(async country => {
    const res = await client.request(createCountryMutation(country))
    const countryId = res.createCountry.id

    if (typeof country.areas !== 'undefined') {
      return Promise.all(country.areas.map(async area => {
        const newArea = {
          ...area,
          countryId,
        }

        const res = await client.request(createAreaMutation(newArea))
        const areaId = res.createArea.id

      }))
    }
  }))
}

function createCountryMutation(country) {
  return `mutation {
    createCountry (
      name: "${country.name}"
      code: "${country.code}"
      slug: "${country.slug}"
    ) {
      id
    }
  }`
}

function createAreaMutation(area) {
  return `mutation {
    createArea (
      name: "${area.name}"
      code: "${area.code}"
      slug: "${area.slug}"
      countryId: "${area.countryId}"
    ) {
      id
    }
  }`
}

module.exports = {
  asyncMutationCountry
}