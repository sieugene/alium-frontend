import { Token, TokenAmount } from '@alium-official/sdk'
import React from 'react'
import { fetchTokenBalance } from '../components/utils'

const useBalanceToken = (token: Token, account: string) => {
  const [balancedToken, setBalancedToken] = React.useState<TokenAmount>(null)
  const [loading, setLoading] = React.useState(false)
  if (!balancedToken && !loading && account && token) {
    setLoading(true)
    fetchTokenBalance(token, account)
      .then((value) => {
        setBalancedToken(new TokenAmount(token, value))
      })
      .finally(() => {
        setLoading(false)
      })
      .catch((error) => {
        setBalancedToken(new TokenAmount(token, '0'))
      })
  }

  return { balancedToken, loading }
}

export default useBalanceToken
