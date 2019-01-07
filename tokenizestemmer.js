const stemmer = require('stemmer')
const {stopwords} = require('./stopwordsEn.json')

const filterstopw = (arr, stopflag) =>
  stopflag ? arr.filter(t => !stopwords.includes(t)) : arr

const tokenize = (str, stopflag) => filterstopw(str.split(' ')
  .filter(t => t.match(/[0-9a-z]/i))
  .map(t => t.toLowerCase())
  .map(t => t.replace(/[^0-9a-z]/ig, '')), stopflag)

const tokenizeStem = (str, stopflag) => tokenize(str, stopflag).map(t => stemmer(t))

module.exports = {
  tokenize,
  tokenizeStem
}
