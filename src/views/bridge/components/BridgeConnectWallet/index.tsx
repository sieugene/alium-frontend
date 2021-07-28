import { ConnectButton } from 'alium-uikit/src/widgets/Menu/ConnectButton'
import { useActiveWeb3React } from 'hooks'
import { BridgeConnectWalletIcon } from 'images/bridge/BridgeConnectWalletIcon'
import React, { FC } from 'react'
import { storeAccount } from 'store/account/useStoreAccount'
import styled from 'styled-components'

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 424px;
  @media screen and (max-width: 500px) {
    height: 304px;
  }
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
    padding-bottom: 8px;
  }
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;

    text-align: center;
    letter-spacing: 0.3px;

    color: #8990a5;
    padding-bottom: 24px;
  }
`

const IconWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
`

const BridgeConnectWallet: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { account } = useActiveWeb3React()
  const showModalConnect = storeAccount.getState().showModalConnect

  if (account) {
    return <> {children} </>
  }
  return (
    <CardContent>
      <IconWrap>
        <BridgeConnectWalletIcon />
      </IconWrap>

      <h2>Connect Wallet</h2>
      <p>To get started, connect your wallet.</p>
      <ConnectButton isAccount={!!account} accountEllipsis='' onClick={showModalConnect} />
    </CardContent>
  )
}
export default BridgeConnectWallet
