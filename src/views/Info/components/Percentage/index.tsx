import styled from 'styled-components'
import { formatPercentage } from 'views/Info/utils'

export interface PercentageProps {
  value: number
}

export default function Percentage({ value }: PercentageProps) {
  return <Percentage.Root data-negative={value < 0 || undefined}>{formatPercentage(value)}</Percentage.Root>
}

Percentage.Root = styled.span`
  color: #24ba7b;

  &[data-negative] {
    color: #f04628;
  }
`
