import { BigintIsh, CurrencyAmount } from '@alium-official/sdk'
import { storeNetwork } from './../../store/network/useStoreNetwork'

// Do not user CurrencyAmount.@alium-official/sdk but only return BNB
export const getCurrencyEther = (chainId: number) => {
  const Ether = storeNetwork.getState().networkProviderParams?.nativeCurrency

  const toCurrencyAmount = (amount: BigintIsh) => {
    return CurrencyAmount.anotherEther(Ether, amount)
    // return CurrencyAmount.@alium-official/sdk(amount)
  }

  return { Ether, calcAmount: toCurrencyAmount }
}
