import { ChainId, Fetcher, Route, Token, WETH } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { storeNetwork } from 'store/network/useStoreNetwork'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { getEthersProvider } from 'utils/bridge/providers'
import { TESTDAI, TEST_BSC_ALM_OLD } from '../../constants'
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
  const ALM = TEST_BSC_ALM_OLD
  const price = await tokenToStablePrice(ALM)
  return price
}

export const fetchBnbDaiPrice = async () => {
  const chainId = storeNetwork.getState().currentChainId
  const ethersProvider = await getEthersProvider(chainId)

  // Stable coin
  const DAI = TESTDAI
  // Core token
  const _WETH = WETH[chainId]
  const pair = await Fetcher.fetchPairData(DAI, _WETH, ethersProvider)
  const route = new Route(chainId, [pair], DAI)
  const price = new BigNumber(route.midPrice.toSignificant(6))

  return BIG_ONE.div(price) || BIG_ZERO
}

// reference calc price
// https://docs.uniswap.org/sdk/2.0.0/guides/pricing
export const tokenToStablePrice = async (token: Token, signify = 6) => {
  const chainId = storeNetwork.getState().currentChainId
  const ethersProvider = await getEthersProvider(chainId)
  // Stable coin
  const DAI = TESTDAI

  try {
    const tokenWithStablePair = await Fetcher.fetchPairData(token, DAI, ethersProvider)
    const route = new Route(ChainId.BSCTESTNET, [tokenWithStablePair], DAI)
    return route.midPrice.toSignificant(signify)
  } catch (error) {
    return '0'
  }
}
