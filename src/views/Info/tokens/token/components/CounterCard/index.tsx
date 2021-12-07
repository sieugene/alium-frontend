import { ReactNode } from 'react'
import styled from 'styled-components'
import { breakpoints, Card, mq, typography } from 'ui'
import Percentage from 'views/Info/components/Percentage'

export interface CounterCardProps {
  title: ReactNode
  value: ReactNode
  percentage?: number
}

export default function CounterCard({ title, value, percentage }: CounterCardProps) {
  return (
    <CounterCard.Root>
      <div>
        <CounterCard.Title>{title}</CounterCard.Title>
        <CounterCard.Value>{value}</CounterCard.Value>
      </div>
      {percentage !== undefined && <CounterCard.Percentage value={percentage} />}
    </CounterCard.Root>
  )
}

CounterCard.Value = styled.div`
  ${typography.h6}
  color: #0B1359;
`

CounterCard.Title = styled.div`
  ${typography.ultrasmall.medium}
  color: #8990A5;
  margin-bottom: 8px;
`

CounterCard.Percentage = styled(Percentage)`
  ${typography.ultrasmall.regular}
`

CounterCard.Root = styled(Card)`
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  padding: 16px;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 8px;
  }

  @media ${mq.down(breakpoints.sm)} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

    & > * + * {
      margin-top: 0;
      margin-left: 8px;
    }
  }
`
