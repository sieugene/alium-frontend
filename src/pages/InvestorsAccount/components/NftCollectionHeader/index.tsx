import React from 'react'
import styled from 'styled-components'
import { Flex } from '@alium-official/uikit'

const NftCollectionHeaderWrap = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background: #EBEDF9;
  border-radius: 6px;
  width: 100%;
  padding: 16px 24px;
  @media (max-width: 1024px) {
    display: none;
  }
`

const Field = styled(Flex)<{maxWidth: string}>`
  font-style: normal;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #8990A5;
  width: 100%;
  max-width: ${({maxWidth}) => maxWidth};
  flex: 1;
`

function NftCollectionHeader() {
  return (
    <NftCollectionHeaderWrap>
      <Field maxWidth="292px">pool</Field>
      <Field maxWidth="unset">souvenir cards</Field>
    </NftCollectionHeaderWrap>
  )
}

export default NftCollectionHeader