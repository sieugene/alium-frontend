import { Flex } from 'alium-uikit/src'
import styled from 'styled-components'

const NftPoolsHeaderWrap = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background: #ebedf9;
  border-radius: 6px;
  width: 100%;
  padding: 16px 24px;
  @media (max-width: 1024px) {
    display: none;
  }
`

const Field = styled(Flex)<{ maxWidth: string }>`
  font-style: normal;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #8990a5;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  flex: 1;
`

const FieldEnd = styled(Field)`
  justify-content: flex-end;
`

function NftPoolsHeader() {
  return (
    <NftPoolsHeaderWrap>
      <Field maxWidth='310px'>pool</Field>
      <Field maxWidth='96px'>Total ALMs</Field>
      <Field maxWidth='96px'>Locked</Field>
      <Field maxWidth='172px'>Unlocked</Field>
      <FieldEnd maxWidth='80px'>Claimed</FieldEnd>
      <FieldEnd maxWidth='140px'>Next unclocked date</FieldEnd>
    </NftPoolsHeaderWrap>
  )
}

export default NftPoolsHeader
