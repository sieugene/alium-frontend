import BigNumber from 'bignumber.js'
import { ReactNode } from 'react'
import styled from 'styled-components'
import { formatBigNumber } from 'views/StrongHoldersPool/utils'

export interface FormattedValueProps {
  value: BigNumber
  suffix?: ReactNode
  className?: string
}

export default function FormattedValue({ value, suffix, className }: FormattedValueProps) {
  return (
    <FormattedValue.Root className={className}>
      {formatBigNumber(value)}
      {suffix && <FormattedValue.Suffix>{suffix}</FormattedValue.Suffix>}
    </FormattedValue.Root>
  )
}

FormattedValue.Root = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0.3px;
  color: #0b1359;
`
FormattedValue.Suffix = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.3px;
`
