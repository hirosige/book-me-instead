// func bootstraping
const {
  asyncMutationAdvantage,
  asyncMutationCountry,
  asyncMutationPostCategory
} = require('./lib/func_bootstrap')

// data bootstraping
const {
  countries,
  advantages,
  postCategories
} = require('./lib/data_bootstrap')

// exec mutations one by one
const exec = async () => {
  await asyncMutationCountry(countries)
  await asyncMutationAdvantage(advantages)
  await asyncMutationPostCategory(postCategories)
}

// exec Seeds
exec()
