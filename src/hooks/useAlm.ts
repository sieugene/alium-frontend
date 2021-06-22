import { useActiveWeb3React } from 'hooks'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { ROUTES } from 'routes'
import { useAllTokens } from './Tokens'

export const useAlmToken = () => {
  const { chainId } = useActiveWeb3React()
  const ALM_TOKEN = Object.values(useAllTokens()).find((token) => token.symbol === 'ALM' && token.chainId === chainId)
  return ALM_TOKEN
}

export const useLiquidityPriorityDefaultAlm = () => {
  const params: any = useParams()
  const history = useHistory()
  const ALMCurrencyId = useAlmToken()?.address
  useEffect(() => {
    if (params?.currencyIdA === 'ETH' && ALMCurrencyId) {
      history.push(ROUTES.addByMultiple('ETH', ALMCurrencyId))
    }
    // ignore lint, need only in first load add page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
