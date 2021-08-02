import { Token, TokenAmount } from '@alium-official/sdk'
import DEFAULT_LIST from 'config/tokens'
import { useActiveWeb3React } from 'hooks'
import React from 'react'
import { useStoreBridge } from 'store/bridge/useStoreBridge'
import { fetchTokenBalance } from '../components/utils'

export const useBridgeTokens = (addressOrName: string) => {
  const { account } = useActiveWeb3React()
  const fromNetwork = useStoreBridge((state) => state.fromNetwork)
  const toNetwork = useStoreBridge((state) => state.toNetwork)

  const defaultListFrom = DEFAULT_LIST[fromNetwork]
  const defaultListTo = DEFAULT_LIST[toNetwork]
  const allLists: Token[] = [...defaultListFrom.tokens, ...defaultListTo.tokens]

  const tokens = {
    fromNetwork: searchToken(allLists, addressOrName, fromNetwork),
    toNetwork: searchToken(allLists, addressOrName, toNetwork),
  }

  const { balancedToken: fromBalance } = useBalanceToken(tokens.fromNetwork, account)
  const { balancedToken: toBalance } = useBalanceToken(tokens.toNetwork, account)

  const balances = {
    fromNetwork: fromBalance,
    toNetwork: toBalance,
  }

  return { tokens, balances }
}

const searchToken = (list: Token[], search: string, chainId: number) => {
  const token = list.find((token) => (token.symbol === search || token.address === search) && token.chainId === chainId)
  return token && new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
}

const useBalanceToken = (token: Token, account: string) => {
  const [balancedToken, setBalancedToken] = React.useState<TokenAmount>(null)
  const [loading, setLoading] = React.useState(false)
  if (!balancedToken && !loading) {
    setLoading(true)
    fetchTokenBalance(token, account)
      .then((value) => {
        setBalancedToken(new TokenAmount(token, value || 0))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { balancedToken, loading }
}
