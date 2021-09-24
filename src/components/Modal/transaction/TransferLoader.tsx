import { FC } from 'hoist-non-react-statics/node_modules/@types/react'
import React from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { TransactionIndicateWrapper } from './TransactionModal'

const StyledLoader = styled(Loader)`
  width: 80px;
  height: 80px;
`

interface Props {
  children?: React.ReactNode
}
const TransferLoader: FC<Props> = ({ children }) => {
  return (
    <TransactionIndicateWrapper>
      <StyledLoader type='TailSpin' color='#6C5DD3' />
      {children && children}
    </TransactionIndicateWrapper>
  )
}

export default TransferLoader
