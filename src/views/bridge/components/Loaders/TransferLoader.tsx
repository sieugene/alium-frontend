import { Token } from '@alium-official/sdk'
import { FC } from 'react'
import { ChevronRight } from 'react-feather'
import Loader from 'react-loader-spinner'
import { useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'

const StyledLoader = styled(Loader)`
  width: 80px;
  height: 80px;
`

export const View = styled.div`
  cursor: pointer;
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;

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
  token: Token
  amount: string
}
const TransferLoader: FC<Props> = ({ token, amount }) => {
  const loadingText = useStoreBridge((state) => state.transactionText)
  return (
    <>
      <StyledLoader type='TailSpin' color='#6C5DD3' />

      <h2>
        Transfer {amount} {token?.symbol} pending...
      </h2>
      <p>{loadingText || 'Transaction is pending...'}</p>
      <View>
        View on explorer <ChevronRight />
      </View>
    </>
  )
}

export default TransferLoader
