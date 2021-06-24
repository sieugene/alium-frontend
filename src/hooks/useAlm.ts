import { useActiveWeb3React } from 'hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ROUTES } from 'routes'
import { useAllTokens } from './Tokens'

export const useAlmToken = () => {
  const { chainId } = useActiveWeb3React()
  const ALM_TOKEN = Object.values(useAllTokens()).find((token) => token.symbol === 'ALM' && token.chainId === chainId)
  return ALM_TOKEN
}

export const useLiquidityPriorityDefaultAlm = () => {
  const { query }: any = useRouter()
  const history = useRouter()
  const ALMCurrencyId = useAlmToken()?.address
  useEffect(() => {
    if (query?.currencyIdA === 'ETH' && ALMCurrencyId) {
      history.push(ROUTES.addByMultiple('ETH', ALMCurrencyId))
    }
    // ignore lint, need only in first load add page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
