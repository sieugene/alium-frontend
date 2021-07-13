import { ConnectButton } from 'alium-uikit/src/widgets/Menu/ConnectButton'
import { useModal } from 'alium-uikit/src/widgets/Modal'
import ConnectModal from 'alium-uikit/src/widgets/WalletModal/ConnectModal'
import { FC } from 'react'
import styled from 'styled-components'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 35px 0 40px 0;

  .title {
    font-family: Roboto, sans-serif;
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0.3px;
  }

  .title2 {
    font-family: Roboto, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0.3px;

    color: #8990a5;
    margin: 8px 0 24px 0;
  }

  .button-wrap {
  }
`

export const Step1Connect: FC = () => {
  // const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" })
  // return accounts[0]

  const [onPresentConnectModal] = useModal(<ConnectModal login={() => null} title='' />) // TODO: add login
  return (
    <Root>
      <div className='title'>Migrate Alium Liquidity</div>
      <div className='title2'>Connect to a wallet to view your liquidity</div>
      <div className='button-wrap'>
        <ConnectButton isAccount={false} accountEllipsis='' onClick={() => onPresentConnectModal()} />
      </div>
    </Root>
  )
}
