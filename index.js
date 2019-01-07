const {tokenize} = require('./tokenizestemmer.js')
const soa = require('sort-objects-array')
const {
  getTokensMap,
  checkPhraseUnique,
  checkPhraseRepeated
} = require('./utils.js')

const uniqueWords = str => Array.from(getTokensMap(str))
  .filter(arr => arr[1] === 1).map(x => x[0])

const repeatedWords = str => soa(Array.from(getTokensMap(str))
  .filter(arr => arr[1] > 1).reduce((k, v) => { k[v[0]] = v[1]; return k }, {}), 'key')

const mostCommonWords = str => soa(repeatedWords(str), 'value', {order: 'desc'})

const phrasesWithUniqueWords = arr => {
  const tokensMap = getTokensMap(arr.join(' '))
  const filtered = arr.filter(p => checkPhraseUnique(p, tokensMap))
  return filtered
}

const phrasesWithRepeatedWords = arr => {
  const tokensMap = getTokensMap(arr.join(' '))
  const filtered = arr.filter(p => checkPhraseRepeated(p, tokensMap))
  return filtered
}

module.exports = {
  uniqueWords,
  repeatedWords,
  mostCommonWords,
  phrasesWithUniqueWords,
  phrasesWithRepeatedWords
}
