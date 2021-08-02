import { Button } from 'alium-uikit/src'
import { useAlmToken } from 'hooks/useAlm'
import { BridgeWarningInDetail } from 'images/bridge/BridgeWarningInDetail'
import { ChevronRight } from 'react-feather'
import { BRIDGE_STEPS, storeBridge, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { useBridge } from 'views/bridge/hooks/useBridge'
import { useBridgeNetworks } from 'views/bridge/hooks/useBridgeNetworks'
import BridgeModal, { CloseItem } from '../../../../../components/Modal/BridgeModal'
import BadNetworkWrapper from '../../BadNetworkWrapper'

const Wrapper = styled.div`
  max-width: 500px;
`
const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f4f5fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const Content = styled.div`
  padding: 32px 24px 16px 24px;
`
const TokensBridge = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 24px;
`
const Token = styled.div<{ align: 'left' | 'right'; justify: 'end' | 'start' }>`
  width: 50%;
  height: 120px;
  background: #f4f5fa;
  border: 1px solid #f4f5fa;
  box-sizing: border-box;
  border-radius: 12px;
  display: flex;
  align-items: center;

  ${(props) => `padding-${props.align}: 24px`};
  @media screen and (max-width: 768px) {
    ${(props) => `padding-${props.align}: 16px`};
  }
  @media screen and (max-width: 480px) {
    ${(props) => `padding-${props.align}: 10px`};
  }

  ${(props) => `justify-content: flex-${props.justify}`};
  .count {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 40px;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-right: 8px;
    @media screen and (max-width: 768px) {
      font-size: 24px;
    }

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .symbol {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
    position: relative;
    bottom: 4px;
  }
  .text {
    display: flex;
    align-items: flex-end;
    max-width: 150px;
    @media screen and (max-width: 768px) {
      max-width: 165px;
      flex-wrap: wrap-reverse;
    }
    @media screen and (max-width: 480px) {
      max-width: 80px;
    }
  }
`
const Fees = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  .chevron {
    background: #ffffff;
    box-shadow: 0px 6px 8px rgba(220, 224, 244, 0.56);
    border-radius: 36px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 32px;
      height: 32px;
      stroke: #6c5dd3;
    }
  }
  p {
    margin-top: 4px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
`

const Detail = styled.div`
  margin-bottom: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #0b1359;
  b {
    font-weight: 500;
    color: #6c5dd3;
  }
`

const Info = styled.div`
  width: 100%;
  height: auto;

  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #0b1359;
    max-width: 360px;
    padding-left: 18px;
  }
  display: flex;
  padding: 16px;
  svg {
    min-width: 24px;
    min-height: 24px;
  }
  background: rgba(255, 77, 0, 0.1);
  border-radius: 6px;
`

const Footer = styled.div`
  padding: 0px 24px 32px 24px;
  display: flex;
  justify-content: space-between;
`

const BridgeConfirmTransfer = () => {
  const token = useAlmToken()
  const { install } = useBridge()
  const toggleModal = storeBridge.getState().toggleModal
  const modalOpen = useStoreBridge((state) => state.modalOpen)
  const from = useStoreBridge((state) => state.bridgeInputs.from)
  const to = useStoreBridge((state) => state.bridgeInputs.to)
  const { networkFrom, networkTo } = useBridgeNetworks()

  const onDismiss = () => {
    toggleModal(false)
  }
  const confirm = () => {
    install({ step: BRIDGE_STEPS.TRANSFER })
  }
  return (
    <BridgeModal isOpen={modalOpen} onDismiss={onDismiss}>
      <BadNetworkWrapper>
        <Wrapper>
          <Header>
            <h2 className='title'>Confirm Transfer</h2>
            <div onClick={onDismiss}>
              <CloseItem />
            </div>
          </Header>
          <Content>
            <TokensBridge>
              <Token align='left' justify='start'>
                <div className='text'>
                  <h3 className='count'>{from}</h3>
                  <div className='symbol'>{token?.symbol}</div>
                </div>
              </Token>
              <Fees>
                <div className='chevron'>
                  <ChevronRight />
                </div>
                <p>Bridge Fees 2%</p>
              </Fees>
              <Token align='right' justify='end'>
                <div className='text'>
                  <h3 className='count'>{to}</h3>
                  <div className='symbol'>{token?.symbol}</div>
                </div>
              </Token>
            </TokensBridge>
            <Detail>
              Please confirm that you would like to send <b>1 ALM</b> from {networkFrom?.label} and receive{' '}
              <b>0.98 ALM</b> on {networkTo?.label}
            </Detail>
            <Info>
              <BridgeWarningInDetail />
              <p>
                The claim process requires 2 transactions, one on {networkFrom?.label} and one on {networkTo?.label}
              </p>
            </Info>
          </Content>
          <Footer>
            <Button variant='secondary' onClick={onDismiss}>
              cancel
            </Button>
            <Button onClick={confirm}>continue</Button>
          </Footer>
        </Wrapper>
      </BadNetworkWrapper>
    </BridgeModal>
  )
}

export default BridgeConfirmTransfer
