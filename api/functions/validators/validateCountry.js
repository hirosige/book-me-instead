import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(process.env.GRAPHCOOL_SIMPLE_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCOOL_API_KEY}`,
  },
})

export default async event => {
  const {
    name,
    code,
    slug,
  } = event.data

  let errors = {
    name: [],
    code: [],
    slug: [],
    errorMessages: [],
    count: 0,
  }

  if (name === "") {
    errors.name.push({
      ja: "国名は必須入力です",
      en: "You must input name",
      th: "You must input name",
    })
    errors.errorMessages.push({
      ja: "国名は必須入力です",
      en: "You must input name",
      th: "You must input name",
    })
    errors.count = errors.count + 1
  } else {
    const nameDuplicateCheck = `{
      Country(name: "${name}") {
        id
      }
    }`

    const { Country } = await client.request(nameDuplicateCheck)
    if (Country) {
      errors.name.push({
        ja: `入力した国名(${name})は登録済みです`,
        en: `Country name(${name}) you input already registered`,
        th: `Country name(${name}) you input already registered`,
      })
      errors.errorMessages.push({
        ja: `入力した国名(${name})は登録済みです`,
        en: `Country name(${name}) you input already registered`,
        th: `Country name(${name}) you input already registered`,
      })
      errors.count = errors.count + 1
    }
  }

  if (code === "") {
    errors.code.push({
      ja: "国コードは必須入力です",
      en: "You must input code",
      th: "You must input code",
    })
    errors.errorMessages.push({
      ja: "国コードは必須入力です",
      en: "You must input code",
      th: "You must input code",
    })
    errors.count = errors.count + 1
  } else {
    const codeDuplicateCheck = `{
      Country(code: "${code}") {
        id
      }
    }`

    const { Country } = await client.request(codeDuplicateCheck)
    if (Country) {
      errors.code.push({
        ja: `入力した国コード(${code})は登録済みです`,
        en: `Country code(${code}) you input already registered`,
        th: `Country code(${code}) you input already registered`,
      })
      errors.errorMessages.push({
        ja: `入力した国コード(${code})は登録済みです`,
        en: `Country code(${code}) you input already registered`,
        th: `Country code(${code}) you input already registered`,
      })
      errors.count = errors.count + 1
    }
  }

  if (slug === "") {
    errors.slug.push({
      ja: "国スラッグは必須入力です",
      en: "You must input slug",
      th: "You must input slug",
    })
    errors.errorMessages.push({
      ja: "国スラッグは必須入力です",
      en: "You must input slug",
      th: "You must input slug",
    })
    errors.count = errors.count + 1
  } else {
    const slugDuplicateCheck = `{
      Country(slug: "${slug}") {
        id
      }
    }`

    const { Country } = await client.request(slugDuplicateCheck)
    if (Country) {
      errors.slug.push({
        ja: `入力した国スラッグ(${slug})は登録済みです`,
        en: `Country slug(${slug}) you input already registered`,
        th: `Country slug(${slug}) you input already registered`,
      })
      errors.errorMessages.push({
        ja: `入力した国スラッグ(${slug})は登録済みです`,
        en: `Country slug(${slug}) you input already registered`,
        th: `Country slug(${slug}) you input already registered`,
      })
      errors.count = errors.count + 1
    }
  }

  if (errors.count !== 0) {
    return {
      error: errors
    }
  }

  return {
    event
  }
}