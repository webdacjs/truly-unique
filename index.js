const soa = require('sort-objects-array')
const {
  getTokensMap,
  checkPhraseUnique,
  checkPhraseRepeated,
  checkArray
} = require('./utils.js')

const uniqueWords = (str, opts = {}) => Array.from(
  getTokensMap(str, opts))
  .filter(arr => arr[1] === 1)
  .map(x => x[0])

const repeatedWords = (str, opts = {}) => soa(
  Array.from(
    getTokensMap(str, opts)
  )
  .filter(arr => arr[1] > (opts.min || 1))
  .reduce((k, v) => { k[v[0]] = v[1]; return k }, {}), 'key')

const mostCommonWords = (str, opts = {}) => soa(
  repeatedWords(str, opts), 'value', {order: 'desc'})

const uniquePhrases = (arr, opts = {}) => Array.from(
    getTokensMap(checkArray(arr)
    .map(x => x.replace(/ /g, '_')
  )
  .join(' '), opts))
  .filter(arr => arr[1] === 1)
  .map(x => x[0].replace(/_/g, ' '))

const repeatedPhrases = (arr, opts = {}) => soa(
  Array.from(
    getTokensMap(checkArray(arr)
    .map(x => x.replace(/ /g, '_')
  )
  .join(' '), opts))
  .filter(arr => arr[1] > (opts.min || 1))
  .reduce((k, v) => { k[String(v[0]).replace(/_/g, ' ')] = v[1]; return k }, {}), 'key')

const phrasesWithUniqueWords = (arr, opts = {}) => {
  const tokensMap = getTokensMap(checkArray(arr).join(' '), opts)
  const filtered = checkArray(arr).filter(p => checkPhraseUnique(p, tokensMap, opts))
  return filtered
}

const phrasesWithRepeatedWords = (arr, opts = {}) => {
  const tokensMap = getTokensMap(checkArray(arr).join(' '), opts)
  const filtered = checkArray(arr).filter(p => checkPhraseRepeated(p, tokensMap, opts))
  return filtered
}

module.exports = {
  uniqueWords,
  repeatedWords,
  mostCommonWords,
  uniquePhrases,
  repeatedPhrases,
  phrasesWithUniqueWords,
  phrasesWithRepeatedWords
}
