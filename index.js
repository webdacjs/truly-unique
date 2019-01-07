const {tokenize} = require('./tokenizestemmer.js')

const getTokensMap = str => {
  const tokensMap = new Map()
  tokenize(str).forEach(t => tokensMap.set(t, (tokensMap.get(t) || 0) + 1))
  return tokensMap
}

const getPhraseUniqueTokens = (phrase, tokensMap) => {
  const phraseTokenized = tokenize(phrase)
  const uniqueTokens = phraseTokenized.filter(t => tokensMap.get(t) === 1)
  return [phraseTokenized, uniqueTokens]
}

const checkPhraseUnique = (phrase, tokensMap) => {
  const [phraseTokenized, uniqueTokens] = getPhraseUniqueTokens(phrase, tokensMap)
  return phraseTokenized.length === uniqueTokens.length
}

const checkPhraseRepeated = (phrase, tokensMap) => {
  const [phraseTokenized, uniqueTokens] = getPhraseUniqueTokens(phrase, tokensMap)
  return phraseTokenized.length !== uniqueTokens.length
}

const uniqueWords = str => Array.from(getTokensMap(str))
  .filter(arr => arr[1] === 1).map(x => x[0])

const repeatedWords = str => Array.from(getTokensMap(str))
  .filter(arr => arr[1] > 1).reduce((k, v) => { k[v[0]] = v[1]; return k }, {})

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
  phrasesWithUniqueWords,
  phrasesWithRepeatedWords
}
