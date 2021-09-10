import { ChainId, Fetcher, Route, Token, WETH } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { ALM_PER_YEAR } from 'config'
import { storeNetwork } from 'store/network/useStoreNetwork'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { getEthersProvider } from 'utils/bridge/providers'
import { TESTDAI, TEST_BSC_ALM_OLD } from '../../constants'

// P(LP) =(PtokenA * LPBalance tokenA  + PtokenB * LP Balance tokenB)LP Total Supply
// -------------
// LP - liquidity pool ( address )
// P - price token X
// LP Balance tokenA - token A balance on LP contract address
// LP Balance tokenB - token B balance on LP contract address
// LP Total Supply - total supply LP token
export const lpTokenPriceToStable = async (
  tokenA: Token,
  tokenB: Token,
  lpBalanceTokenA: BigNumber,
  lpBalanceTokenB: BigNumber,
  lpTotalSupply: BigNumber,
) => {
  const forTokens = `${tokenA.symbol}:${tokenB.symbol}`
  try {
    const PTokenA = await tokenToStablePrice(tokenA)
    const PTokenB = await tokenToStablePrice(tokenB)
    const PLP =
      (Number(PTokenA) * Number(lpBalanceTokenA) + Number(PTokenB) * Number(lpBalanceTokenB)) / Number(lpTotalSupply)
    console.log('--------------------------- Аргументы к вычислению lp прайса', forTokens)
    console.log('lpBalanceTokenA', Number(lpBalanceTokenA))
    console.log('lpBalanceTokenB', Number(lpBalanceTokenB))
    console.log('lpTotalSupply', Number(lpTotalSupply))
    console.log('PTokenA', PTokenA)
    console.log('PTokenB', PTokenB)
    console.log('--------------------------- Вычисление ', forTokens)
    console.log('result', PLP)

    return PLP
  } catch (error) {
    console.error('Failure calc lptokenPrice!', error)
    return 0
  }
}

//   APY = TOKEN per year POOLshare(%) * TOKEN priceFARM LP balance * P(LP)
// ---------
// TOKEN per year- расчетное к-во токенов ALM за год
// TOKEN price - Цена ALM, $
// POOLshare(%) - Процент пула (pool Shares %) от общего значения пула (total Shares)
// FARM LP balance- баланс LP токена на контракте фермы
// P(LP) - цена LP токена, $
export const apyCalc = async (poolWeight: BigNumber, farmLpBalance: number, farmLpBalanceToStable: number) => {
  const TOKEN_PER_YEAR = ALM_PER_YEAR
  const POOLshare = poolWeight
  const tokenPrice = await almToStablePrice()
  console.log('--------------- apy calc')
  console.log('per year', Number(TOKEN_PER_YEAR))
  console.log('pool share', Number(POOLshare))
  console.log('alm price', tokenPrice)
  console.log('farmLpBalance', Number(farmLpBalance))
  console.log('farmLpBalanceToStable', farmLpBalanceToStable)

  const apy =
    (Number(TOKEN_PER_YEAR.dividedBy(POOLshare)) * Number(tokenPrice)) / (Number(farmLpBalance) * farmLpBalanceToStable)
  console.log('result', apy)

  return apy
}

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
