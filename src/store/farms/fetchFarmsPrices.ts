import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'config'
import { Farm } from 'state/types'
import filterFarmsByQuoteToken from 'utils/farm/farmsPriceHelpers'
import { fetchBnbDaiPrice } from './fetchApy'

const Stables = ['WBNB', 'BUSD', 'USDT']

const getFarmFromTokenSymbol = (farms: Farm[], tokenSymbol: string, preferredQuoteTokens?: string[]) => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)

  return filteredFarm
}

const getFarmBaseTokenPrice = (farm: Farm, quoteTokenFarm: Farm, bnbPriceBusd: BigNumber): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)

  if (Stables.includes(farm.quoteToken.symbol)) {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (Stables.includes(farm.quoteToken.symbol)) {
    return hasTokenPriceVsQuote ? bnbPriceBusd.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for BUSD/BNB farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't BUSD or WBNB, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - BNB, (pBTC - BNB)
  // from the BNB - pBTC price, we can calculate the PNT - BUSD price
  if (Stables.includes(quoteTokenFarm.quoteToken.symbol)) {
    const quoteTokenInBusd = bnbPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  if (Stables.includes(quoteTokenFarm.quoteToken.symbol)) {
    const quoteTokenInBusd = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInBusd
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInBusd)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed BUSD/WBNB quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (farm: Farm, quoteTokenFarm: Farm, bnbPriceBusd: BigNumber): BigNumber => {
  if (Stables.includes(farm.quoteToken.symbol)) {
    return BIG_ONE
  }

  if (Stables.includes(farm.quoteToken.symbol)) {
    return bnbPriceBusd
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (Stables.includes(quoteTokenFarm.quoteToken.symbol)) {
    return quoteTokenFarm.tokenPriceVsQuote ? bnbPriceBusd.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (Stables.includes(quoteTokenFarm.quoteToken.symbol)) {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const fetchFarmsPrices = async (farms: Farm[]) => {
  const bnbPriceBusd = await fetchBnbDaiPrice()

  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol, Stables)
    const tokenPriceBusd = getFarmBaseTokenPrice(farm, quoteTokenFarm, bnbPriceBusd)
    // TODO token possibly 0 ?
    let quoteTokenPriceBusd = getFarmQuoteTokenPrice(farm, quoteTokenFarm, bnbPriceBusd)

    // if (quoteTokenPriceBusd.eq(0)) {
    //   quoteTokenPriceBusd = new BigNumber(1)
    // }

    return {
      ...farm,
      tokenPriceBusd: tokenPriceBusd.toJSON(),
      quoteTokenPriceBusd: quoteTokenPriceBusd.toJSON(),
    }
  })

  return farmsWithPrices
}

export default fetchFarmsPrices
