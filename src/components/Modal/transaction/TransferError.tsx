import { Button } from 'alium-uikit/src'
import { FC } from 'hoist-non-react-statics/node_modules/@types/react'
import { BridgeTransferErrorIcon } from 'images/bridge/BridgeTransferErrorIcon'
import React from 'react'
import styled from 'styled-components'
import { TransactionIndicateWrapper } from './TransactionModal'

const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-top: 24px;
    margin-bottom: 24px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
`

const Icon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 77, 0, 0.1);
  border-radius: 50px;
`

interface Props {
  children?: React.ReactNode
  onRepeat: () => void
  className?: string
  style?: React.CSSProperties
}
const TransferError: FC<Props> = ({ children, onRepeat, className, style }) => {
  return (
    <TransactionIndicateWrapper className={className || ''} style={style || {}}>
      <Error>
        <Icon>
          <BridgeTransferErrorIcon />
        </Icon>
        <h2 className='error'>Transaction failed</h2>
        <Button onClick={onRepeat}>Repeat</Button>
      </Error>
    </TransactionIndicateWrapper>
  )
}

export default TransferError
