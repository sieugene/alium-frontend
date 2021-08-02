import CopyInput from 'alium-uikit/src/components/CopyInput'
import { useAlmToken } from 'hooks/useAlm'
import { BridgeInfoIcon } from 'images/bridge/BridgeInfoIcon'
import { BridgeSwitchNetworkIcon } from 'images/bridge/BridgeSwitchNetworkIcon'
import React from 'react'
import { BRIDGE_STEPS, storeBridge } from 'store/bridge/useStoreBridge'
import { storeNetwork, useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'
import BridgeBtnWithIcon from '../BridgeBtnWithIcon'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  .message {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    b {
      color: #6c5dd3;
    }
    margin-top: 16px;
  }
  .title {
    text-align: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-top: 16px;
    margin-bottom: 8px;
  }
`

const NetworksIcon = styled.div`
  svg {
    @media screen and (max-width: 768px) {
      width: 147px;
    }
  }
`

const Info = styled.div`
  background: #e6e6f6;
  border-radius: 6px;
  display: flex;
  padding: 16px;
  margin-top: 40px;
  img {
    max-width: 24px;
    max-height: 24px;
    margin-right: 16px;
  }
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
`

const SwitchNetworkStep = () => {
  const token = useAlmToken()
  const { networkTo } = useBridgeNetworks()
  // const toNetwork = useStoreBridge((state) => state.toNetwork)
  // const network = networkFinder(toNetwork)
  const Icon = networkTo?.icon
  const setChainId = storeNetwork.getState().setChainId
  const changeStep = storeBridge.getState().changeStep
  const updateStepStatus = storeBridge.getState().updateStepStatus
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const connected = useStoreNetwork((state) => state.connected)

  const networksEqual = React.useMemo(() => networkTo?.chainId === currentChainId, [currentChainId, networkTo])
  const equalAndConnected = React.useMemo(() => networksEqual && connected, [connected, networksEqual])

  React.useEffect(() => {
    if (equalAndConnected) {
      updateStepStatus(BRIDGE_STEPS.SWITCH_NETWORK, true)
      changeStep(BRIDGE_STEPS.CLAIM_TOKEN)
    }
  }, [equalAndConnected])

  const changeNetwork = () => {
    setChainId(networkTo?.chainId)
  }

  return (
    <Wrapper>
      <NetworksIcon>
        <BridgeSwitchNetworkIcon />
      </NetworksIcon>

      <p className='message'>
        Please copy the hash of the transaction and switch the network in your wallet to <b>{networkTo?.label}</b>
      </p>
      <p className='title'>Transaction Hash:</p>
      <CopyInput value='123e783hds78129000a0192ead123e783hds78129' />
      <BridgeBtnWithIcon onClick={changeNetwork} variant='secondary'>
        <Icon />
        <p className='text'>{networkTo?.label}</p>
      </BridgeBtnWithIcon>
      <Info>
        <BridgeInfoIcon />
        <p>
          After you switch networks, you will complete a second transaction on {networkTo?.label} to claim your 
          {token?.symbol} tokens.
        </p>
      </Info>
    </Wrapper>
  )
}

export default SwitchNetworkStep
