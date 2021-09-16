import { ChainId, Fetcher, Route, Token, WETH } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import Cookies from 'universal-cookie'
import { BIG_ZERO } from 'utils/bigNumber'
import { getEthersProvider } from 'utils/bridge/providers'
import { BSC_ALM, DAI, TESTDAI } from '../../constants'
import { calcApy, calcFarmLpPrice } from './farms.functions'
const cookies = new Cookies()

export const lpTokenPriceToStable = async (
  tokenA: Token,
  tokenB: Token,
  lpBalanceTokenA: BigNumber,
  lpBalanceTokenB: BigNumber,
  lpTotalSupply: BigNumber,
) => {
  try {
    // TODO : alternative fetcher as coingecko make
    const PTokenA = '0.9'
    const PTokenB = '1'

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
  const cookieAlmPrice = cookies.get('alm-price')

  return cookieAlmPrice || price
}

export const fetchBnbDaiPrice = async () => {
  const chainId = ChainId.MAINNET
  const ethersProvider = await getEthersProvider(chainId)

  const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], ethersProvider)
  const route = new Route(chainId, [pair], WETH[DAI.chainId])
  const price = new BigNumber(route.midPrice.toSignificant(6))

  // Fetch gecko
  const geckoResponse = await fetch('https://api.coingecko.com/api/v3/coins/wbnb')
  const geckoJson = await geckoResponse.json()
  const priceGecko = geckoJson?.market_data?.current_price?.usd
  if (priceGecko) {
    const fixedPrice = Number(priceGecko).toFixed(3)
    return new BigNumber(fixedPrice)
  }

  return price || BIG_ZERO
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
    return route.midPrice.toSignificant(6)
  } catch (error) {
    return '0'
  }
}
