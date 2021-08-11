import { Button } from 'alium-uikit/src'
import { CloseItem } from 'components/Modal/BridgeModal'
import { useActiveWeb3React } from 'hooks'
import useAuth from 'hooks/useAuth'
import { BridgeBadNetworkIcon } from 'images/bridge/BridgeBadNetworkIcon'
import React, { FC } from 'react'
import { storeAccount } from 'store/account/useStoreAccount'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { useBridge } from 'views/bridge/hooks/useBridge'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'

interface Props {
  children: React.ReactNode
}

const Wrapper = styled.div`
  width: 500px;
  min-height: 363px;
  padding: 8px;
`
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Content = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    margin-top: 24px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
  b {
    color: #6c5dd3;
  }
  .access {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;

    margin-top: 4px;
  }
`

const StyledVariants = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  margin-bottom: 24px;
`
const Variant = styled.div`
  background: #f5f7ff;
  border-radius: 6px;
  display: flex;
  padding: 3px 6px 3px 10px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
  margin-left: 6px;
  p {
    margin-left: 10px;
  }
`

const BadNetworkWrapper: FC<Props> = ({ children }) => {
  const { logout } = useAuth()
  const { cancel } = useBridge()
  const { account } = useActiveWeb3React()

  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const connected = useStoreNetwork((state) => state.connected)

  const { nativeFrom, nativeTo, networkFrom, networkTo, availableNetworksBridge } = useBridgeNetworks()

  const IconFrom = networkFrom?.icon
  const IconTo = networkTo?.icon
  const showModalConnect = storeAccount.getState().showModalConnect

  const resolveConnection = async () => {
    if (!connected) {
      showModalConnect()
    } else {
      await logout()
      cancel()
    }
  }

  if (!availableNetworksBridge.includes(currentChainId) || !account) {
    return (
      <Wrapper>
        <Header>
          <CloseItem onClick={cancel} />
        </Header>
        <Content>
          <BridgeBadNetworkIcon />
          <h2 className='title'>Switch your network</h2>
          <p className='access'>
            To access the <b>{`${nativeFrom?.nativeCurrency?.symbol} > ${nativeTo?.nativeCurrency?.symbol}`}</b>{' '}
            OmniBridge, please switch to
          </p>
          <StyledVariants>
            <Variant>
              {IconFrom && <IconFrom />} <p>{networkFrom?.label}</p>
            </Variant>
            or
            <Variant>
              {IconTo && <IconTo />} <p>{networkTo?.label}</p>
            </Variant>
          </StyledVariants>
          <Button onClick={resolveConnection}>{!connected ? 'Connect' : 'Disconnect'}</Button>
        </Content>
      </Wrapper>
    )
  }
  return <>{children} </>
}

export default BadNetworkWrapper
