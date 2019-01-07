const stemmer = require('stemmer')
const {stopwords} = require('./stopwordsEn.json')

const filterstopw = (arr, opts = {}) =>
  opts.stopwords ? arr.filter(t => !stopwords.includes(t)) : arr

const tokenize = (str, opts) => filterstopw(str.split(' ')
  .filter(t => t.match(/[0-9a-z]/i))
  .map(t => t.toLowerCase())
  .map(t => t.replace(/[^0-9a-z]/ig, '')), opts)

const tokenizeStem = (str, opts) => tokenize(str, opts).map(t => stemmer(t))

module.exports = {
  tokenize,
  tokenizeStem
}
