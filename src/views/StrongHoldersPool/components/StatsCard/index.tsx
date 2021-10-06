import { ReactNode } from 'react'
import styled from 'styled-components'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import Card from '../Card'
import FormattedValue from '../FormattedValue'

export interface StatsCardProps {
  title?: ReactNode
  icon?: ReactNode
  content?: ReactNode
}

export default function StatsCard({ title, icon, content }: StatsCardProps) {
  return (
    <StatsCard.Root>
      <StatsCard.Header>
        {icon && <StatsCard.Icon>{icon}</StatsCard.Icon>}
        {title}
      </StatsCard.Header>
      <StatsCard.Content>{content}</StatsCard.Content>
    </StatsCard.Root>
  )
}

StatsCard.Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f4f5fa;
  padding: 16px 24px;
`

StatsCard.Content = styled.div`
  padding: 41px 24px;
  flex: 1;
`

StatsCard.Icon = styled.div`
  margin-right: 16px;
`

StatsCard.Value = styled(FormattedValue)`
  color: #6c5dd3;
`

StatsCard.Root = styled(Card)`
  display: flex;
  flex-direction: column;

  @media ${down(breakpoints.lg)} {
    ${StatsCard.Content} {
      padding: 24px;
    }
  }

  @media ${down(breakpoints.sm)} {
    ${StatsCard.Value} {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: 0.3px;
    }

    ${StatsCard.Icon} {
      margin-right: 10px;
    }
  }
`
