import { ReactNode } from 'react'
import styled from 'styled-components'

export interface FormattedValueProps {
  value: number
  suffix?: ReactNode
  className?: string
}

export default function FormattedValue({ value, suffix, className }: FormattedValueProps) {
  return (
    <FormattedValue.Root className={className}>
      {value}
      {suffix && <FormattedValue.Suffix>{suffix}</FormattedValue.Suffix>}
    </FormattedValue.Root>
  )
}

FormattedValue.Root = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0.3px;
  color: #0b1359;
`
FormattedValue.Suffix = styled.span`
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.3px;
`
