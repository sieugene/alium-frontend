import styled from 'styled-components'
import inferStyledProps from 'types/inferStyledProps'
import { formatPercentage } from 'views/Info/utils'

export interface PercentageProps extends inferStyledProps<typeof Percentage['Root']> {
  value: number
}

export default function Percentage({ value, ...restProps }: PercentageProps) {
  return (
    <Percentage.Root data-negative={value < 0 || undefined} {...restProps}>
      {formatPercentage(value)}
    </Percentage.Root>
  )
}

Percentage.Root = styled.span`
  color: #24ba7b;

  &[data-negative] {
    color: #f04628;
  }
`
