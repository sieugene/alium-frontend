import { useActiveWeb3React } from 'hooks'
import React from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { getEthersProvider } from 'utils/web3'

export const useWeb3Context = () => {
  const web3 = useActiveWeb3React()
  const chainId = useStoreNetwork((state) => state.currentChainId)
  const provider = getEthersProvider()
  const account = React.useMemo(() => web3.account, [web3.account])
  const providerChainId = React.useMemo(() => chainId, [chainId])
  const ethersProvider = React.useMemo(() => provider, [provider])

  return { providerChainId, ethersProvider, account, isGnosisSafe: false }
}
