const {tokenize, tokenizeStem} = require('./tokenizestemmer.js')

const getTokenizeFn = (str, opts) => opts.stem ? tokenizeStem(str, opts) : tokenize(str, opts)

const getTokensMap = (str, opts) => {
  const tokensMap = new Map()
  getTokenizeFn(str, opts).forEach(t => tokensMap.set(t, (tokensMap.get(t) || 0) + 1))
  return tokensMap
}

const getPhraseUniqueTokens = (phrase, tokensMap, opts) => {
  const except = opts.exceptions || []
  const phraseTokenized = getTokenizeFn(phrase, opts)
  const uniqueTokens = phraseTokenized.filter(t => except.includes(t) || tokensMap.get(t) === 1)
  return [phraseTokenized, uniqueTokens]
}

const checkPhraseUnique = (phrase, tokensMap, opts) => {
  const [phraseTokenized, uniqueTokens] = getPhraseUniqueTokens(phrase, tokensMap, opts)
  return phraseTokenized.length === uniqueTokens.length
}

const checkPhraseRepeated = (phrase, tokensMap, opts) => {
  const [phraseTokenized, uniqueTokens] = getPhraseUniqueTokens(phrase, tokensMap, opts)
  return phraseTokenized.length !== uniqueTokens.length
}

module.exports = {
  getTokensMap,
  getPhraseUniqueTokens,
  checkPhraseUnique,
  checkPhraseRepeated
}
