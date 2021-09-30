import { Token } from '@alium-official/sdk'
import { BridgeSuccessIcon } from 'images/bridge/BridgeSuccessIcon'
import React, { FC } from 'react'
import { ChevronRight } from 'react-feather'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { getExplorerLink, getExplorerName } from 'utils'
import AddTokenBtn from '../../../components/Buttons/AddTokenBtn'
import { CloseItem, TransactionWrapper } from './TransactionModal'

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`
export const ViewOnWrapper = styled.div`
  cursor: pointer;
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  letter-spacing: 1px;

  color: #6c5dd3;
  svg {
    stroke: #6c5dd3;
    width: 18px;
    height: 16px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

interface MainProps {
  children?: React.ReactNode
  cancel?: () => void
  withoutHeader?: boolean
  withoutWrapper?: boolean
}
const TransactionCompleted: FC<MainProps> = ({ cancel, children, withoutHeader, withoutWrapper }) => {
  const Wrapper = withoutWrapper ? React.Fragment : TransactionWrapper
  const params = withoutWrapper
    ? {}
    : {
        id: 'transaction_wrapper',
      }
  return (
    <Wrapper {...params}>
      {!withoutHeader && (
        <Header>
          <CloseItem onClick={cancel} />
        </Header>
      )}
      <ContentWrapper>
        <BridgeSuccessIcon />
      </ContentWrapper>
      {children && children}
    </Wrapper>
  )
}

const Content = styled(ContentWrapper)`
  margin-top: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;
  .title {
    margin-top: 24px;
  }

  .amount {
    margin-top: 4px;
  }
  b {
    color: #1ea86d;
  }
`

interface Props {
  cancel: () => void
  amount?: string | number
  token?: Token
  txHash: string
}

export const TransactionAddTokenWithSuccess: FC<Props> = ({ cancel, amount, token, txHash }) => {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const link = getExplorerLink(currentChainId, txHash, 'transaction')
  return (
    <TransactionCompleted cancel={cancel}>
      <Content>
        <h2 className='title'>Transaction completed</h2>
        <p>
          {amount && 'Amount:'}
          <b>
            {amount || ''} {token?.symbol}
          </b>
        </p>
        {txHash && (
          <ViewOnWrapper>
            <a href={link} target='_blank'>
              View on {getExplorerName(currentChainId)}
              <ChevronRight />
            </a>
          </ViewOnWrapper>
        )}
        <AddTokenBtn token={token} />
      </Content>
    </TransactionCompleted>
  )
}

export default TransactionCompleted
