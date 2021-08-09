import { Web3Provider } from '@ethersproject/providers'
import { useActiveWeb3React } from 'hooks'
import React, { useState } from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { getEthersProvider } from 'utils/web3'

export const useWeb3Context = () => {
  const [ethersProvider, setprovider] = useState<Web3Provider>(null)
  const { connected } = useStoreNetwork()
  const web3 = useActiveWeb3React()
  const chainId = useStoreNetwork((state) => state.currentChainId)

  const account = React.useMemo(() => web3.account, [web3.account])
  const providerChainId = React.useMemo(() => chainId, [chainId])
  // const ethersProvider = React.useMemo(() => provider, [provider])
  React.useEffect(() => {
    if (connected && !ethersProvider) {
      const provider = getEthersProvider()
      console.log('useWeb3Context____')
      setprovider(provider)
    }
  }, [connected])

  return { providerChainId, ethersProvider, account, isGnosisSafe: false, connected }
}
