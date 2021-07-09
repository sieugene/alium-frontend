import { ETHER, Pair } from '@alium-official/sdk'
import { usePair, usePairs } from 'data/Reserves'
import { useActiveWeb3React } from 'hooks'
import { useAllTokens } from 'hooks/Tokens'
import { useEffect, useMemo, useState } from 'react'
import { toV2LiquidityToken, usePairAdder, useTrackedTokenPairs } from 'state/user/hooks'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'

// for swap pool page
export const useAllV2PairsWithLiquidity = () => {
  useTriggerPairAdder()
  const { account } = useActiveWeb3React()
  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )
  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )
  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))
  return {
    data: allV2PairsWithLiquidity,
    loading: v2IsLoading,
  }
}
// TODO: for starting flow search pool, REMOVE IN FUTURE
const useTriggerPairAdder = () => {
  // const cachedPairs = useSelector((state: AppState) => state.user.pairs)
  const globalTokenList = useAllTokens()
  const addPair = usePairAdder()
  const [once, setOnce] = useState(false)

  const currency0 = ETHER
  const currency1 = useMemo(() => {
    const tokens = Object.values(globalTokenList)
    if (tokens?.length) {
      return tokens[0]
    }
    return null
  }, [globalTokenList])

  const [_, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)

  useEffect(() => {
    if (pair && !once) {
      addPair(pair)
      setOnce(true)
      console.log('------- Trigger add pair end work -------')
    }
  }, [pair, addPair, once])
}
