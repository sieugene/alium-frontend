import { Token, TokenAmount } from '@alium-official/sdk'
import { useTokenContract } from 'hooks/useContract'
import { useMemo } from 'react'
import { useSingleCallResult } from 'store/multicall/hooks/hooks'

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result

  return useMemo(
    () => (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined),
    [token, allowance],
  )
}

export default useTokenAllowance
