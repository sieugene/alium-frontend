import { VAMPIRE_LP_TOKENS } from 'config/vampiring/VAMPIRE_LP_TOKENS'
import fs from 'fs'
import request from 'request'
// import coingecko from '../../../../build/.coingecko-tokens-list.json'

const coingecko = {}

const download = function (uri, filename, callback) {
  request.head(uri, (err, res) => {
    console.log('content-type:', res.headers['content-type'])
    console.log('content-length:', res.headers['content-length'])

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback)
  })
}

const handler = async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    res.end()
    return
  }

  let alium = []
  VAMPIRE_LP_TOKENS[1].forEach(({ tokenA, tokenB }) => {
    if (!alium.includes(tokenA.symbol.toLowerCase())) alium = [...alium, tokenA.symbol.toLowerCase()]
    if (!alium.includes(tokenB.symbol.toLowerCase())) alium = [...alium, tokenB.symbol.toLowerCase()]
  })
  VAMPIRE_LP_TOKENS[56].forEach(({ tokenA, tokenB }) => {
    if (!alium.includes(tokenA.symbol.toLowerCase())) alium = [...alium, tokenA.symbol.toLowerCase()]
    if (!alium.includes(tokenB.symbol.toLowerCase())) alium = [...alium, tokenB.symbol.toLowerCase()]
  })
  VAMPIRE_LP_TOKENS[128].forEach(({ tokenA, tokenB }) => {
    if (!alium.includes(tokenA.symbol.toLowerCase())) alium = [...alium, tokenA.symbol.toLowerCase()]
    if (!alium.includes(tokenB.symbol.toLowerCase())) alium = [...alium, tokenB.symbol.toLowerCase()]
  })
  VAMPIRE_LP_TOKENS[137].forEach(({ tokenA, tokenB }) => {
    if (!alium.includes(tokenA.symbol.toLowerCase())) alium = [...alium, tokenA.symbol.toLowerCase()]
    if (!alium.includes(tokenB.symbol.toLowerCase())) alium = [...alium, tokenB.symbol.toLowerCase()]
  })

  let idsWithSymbols = []
  alium.forEach((symbol) => {
    if (coingecko[symbol]) {
      idsWithSymbols = [...idsWithSymbols, { id: coingecko[symbol], symbol }]
    }
  })

  idsWithSymbols.forEach(({ id, symbol }) => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      },
    ).then((responseRaw) => {
      responseRaw.json().then((response) => {
        console.log('response', response.image)

        download(response.image.large, `./public/images/coins-new/${symbol}.png`, () => {
          console.log('done')
        })
      })
    })
  })

  res.status(200).json('ok')
}

export default handler
