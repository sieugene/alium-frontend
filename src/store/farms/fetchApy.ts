import { ChainId, Fetcher, Route, Token } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { getEthersProvider } from 'utils/bridge/providers'
import { BSC_ALM, DAI, TESTDAI } from '../../constants'
import { fetchTokenPriceFromCoingecko } from './../../services/coingecko'
import { getAlmPrice } from './../../utils/prices/getAlmPrice'
import { calcApy, calcFarmLpPrice } from './farms.functions'

export const lpTokenPriceToStable = async (
  tokenA: Token,
  tokenB: Token,
  lpBalanceTokenA: BigNumber,
  lpBalanceTokenB: BigNumber,
  lpTotalSupply: BigNumber,
) => {
  try {
    const PTokenA = await tokenToStablePrice(tokenA)
    const PTokenB = await tokenToStablePrice(tokenB)

    const PLP = calcFarmLpPrice(Number(PTokenA), lpBalanceTokenA, Number(PTokenB), lpBalanceTokenB, lpTotalSupply)
    return PLP
  } catch (error) {
    console.error('Failure calc lptokenPrice!', error)
    return 0
  }
}

// like container fetcher with pure calc
export const fetchApy = async (
  tokenA: Token,
  tokenB: Token,
  lpBalanceTokenA: BigNumber,
  lpBalanceTokenB: BigNumber,
  lpTotalSupply: BigNumber,
  poolWeight: BigNumber,
  farmLpBalance: BigNumber,
) => {
  const POOLshare = Number(poolWeight)
  const tokenPrice = await almToStablePrice()

  const farmLpBalanceToStable = await lpTokenPriceToStable(
    tokenA,
    tokenB,
    lpBalanceTokenA,
    lpBalanceTokenB,
    lpTotalSupply,
  )
  const apy = calcApy(Number(tokenPrice), POOLshare, farmLpBalance, farmLpBalanceToStable)

  return apy
}

// Helpers *

export const almToStablePrice = async () => {
  // const ALM = TEST_BSC_ALM_OLD
  const chainId = ChainId.MAINNET
  const ALM = BSC_ALM
  const price = await tokenToStablePrice(ALM, chainId)
  const cookieAlmPrice = getAlmPrice()

  return cookieAlmPrice || price
}

export const fetchBnbDaiPrice = async () => {
  // const chainId = ChainId.MAINNET
  // const ethersProvider = await getEthersProvider(chainId)

  // const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], ethersProvider)
  // const route = new Route(chainId, [pair], WETH[DAI.chainId])
  // const price = new BigNumber(route.midPrice.toSignificant(6))

  // Fetch gecko
  const geckoResponse = await fetchTokenPriceFromCoingecko('wbnb')
  const priceGecko = geckoResponse?.data?.market_data?.current_price?.usd
  if (priceGecko) {
    const fixedPrice = Number(priceGecko).toFixed(3)
    return new BigNumber(fixedPrice)
  }

  return BIG_ZERO
}

// reference calc price
// https://docs.uniswap.org/sdk/2.0.0/guides/pricing
export const tokenToStablePrice = async (token: Token, network: ChainId = ChainId.BSCTESTNET) => {
  const chainId = network
  const ethersProvider = await getEthersProvider(chainId)
  const _DAI = network === ChainId.BSCTESTNET ? TESTDAI : DAI

  try {
    const tokenWithStablePair = await Fetcher.fetchPairData(token, _DAI, ethersProvider)
    const route = new Route(network, [tokenWithStablePair], _DAI)
    const price = await stablePriceValidator(token.symbol, route.midPrice.toSignificant(6))
    return price
  } catch (error) {
    const price = await stablePriceValidator(token.symbol, '0')
    return price
  }
}
// Todo make save in session / localstorage (after refresh clear)
// alternative fetcher if sdk result = 0
const stablePriceValidator = async (symbol: string, firstResult: string): Promise<string> => {
  if (!firstResult || firstResult === '0') {
    const cookieAlmPrice = getAlmPrice()
    // defaults tokens list for fetch from coingecko
    const defaultsTokens = {
      ALM: 'alium-swap',
      ETH: 'ethereum',
      WBNB: 'wbnb',
    }
    // default prices
    const defaultsStables = {
      USDT: '1',
      ALM: cookieAlmPrice || 0,
    }
    if (defaultsStables[symbol]) {
      return defaultsStables[symbol]
    }
    if (defaultsTokens[symbol]) {
      const response = await fetchTokenPriceFromCoingecko(defaultsTokens[symbol])
      const price = response?.data?.market_data?.current_price?.usd

      if (price) {
        const fixedPrice = Number(price).toFixed(3)
        return fixedPrice
      }
      return firstResult
    }
    return firstResult
  }
  return firstResult
}
