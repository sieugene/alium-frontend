import fs from 'fs'
import path from 'path'

const storeData = (data, _path) => {
  try {
    fs.writeFileSync(path.resolve(__dirname, _path), JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

const handler = async (req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    res.end()
    return
  }

  const responseRaw = await fetch('https://api.coingecko.com/api/v3/coins/list', {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
  const response = await responseRaw.json()

  let data = {}
  response.forEach(({ id, symbol }) => {
    data = { ...data, [symbol.toLowerCase()]: id }
  })

  storeData(data, '../../../../.coingecko-tokens-list.json')

  res.status(200).json('ok')
}

export default handler
