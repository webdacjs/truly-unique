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

module.exports = {
  getTokensMap,
  getPhraseUniqueTokens,
  checkPhraseUnique,
  checkPhraseRepeated
}
