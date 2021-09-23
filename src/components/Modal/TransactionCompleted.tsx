import { Token } from '@alium-official/sdk'
import AddTokenBtn from 'components/Buttons/AddTokenBtn'
import { CloseItem } from 'components/Modal/BridgeModal'
import { FC } from 'hoist-non-react-statics/node_modules/@types/react'
import { BridgeSuccessIcon } from 'images/bridge/BridgeSuccessIcon'
import React from 'react'
import { ChevronRight } from 'react-feather'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { getExplorerLink, getExplorerName } from 'utils'

const Wrapper = styled.div`
  width: 500px;
  min-height: 363px;
  padding: 8px;

  @media screen and (max-width: 768px) {
    max-width: 354px;
  }
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
  b {
    color: #1ea86d;
  }
  .amount {
    margin-top: 4px;
  }
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
interface Props {
  cancel: () => void
  amount?: string | number
  token: Token
  txHash: string
}
const TransactionCompleted: FC<Props> = ({ cancel, amount, token, txHash }) => {
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const link = getExplorerLink(currentChainId, txHash, 'transaction')
  const onDismiss = () => {
    cancel()
  }

  return (
    <Wrapper>
      <Header>
        <CloseItem onClick={onDismiss} />
      </Header>
      <Content>
        <BridgeSuccessIcon />
        <h2 className='title'>Transaction completed</h2>
        <p className='amount'>
          Amount:{' '}
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
    </Wrapper>
  )
}

export default TransactionCompleted
