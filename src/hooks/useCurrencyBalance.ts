import { CurrencyAmount, JSBI } from '@alium-official/sdk'
import { useEffect, useState } from 'react'
import web3NoAccount from 'utils/web3'
import Web3 from 'web3'

const useCurrencyBalance: any = (account: string, web3: Web3) => {
  const [balance, setBalance] = useState<CurrencyAmount | '0'>()
  const _web3 = web3 ?? web3NoAccount
  useEffect(() => {
    if (!account) return
    ;(async () => {
      try {
        const resBalance = await _web3?.eth?.getBalance(account)
        const currencyBalance = CurrencyAmount?.ether(JSBI.BigInt(resBalance?.toString() || '0'))
        setBalance(currencyBalance)
      } catch (error) {
        setBalance('0')
      }
    })()
  }, [_web3.eth, account])
  return { balance }
}

export default useCurrencyBalance
