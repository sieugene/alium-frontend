import { Button } from 'alium-uikit/src'
import { BridgeTransferErrorIcon } from 'images/bridge/BridgeTransferErrorIcon'
import { FC } from 'react'
import styled from 'styled-components'

const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 0.3px;
    margin-bottom: 24px;

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
interface Props{
  onRepeat: () => void
}
const TransferError:FC<Props> = ({onRepeat}) => {
  return (
    <Error>
      <Icon>
        <BridgeTransferErrorIcon />
      </Icon>
      <h2 className='error'>Transaction failed</h2>
      <Button onClick={onRepeat}>Repeat</Button>
    </Error>
  )
}

export default TransferError
