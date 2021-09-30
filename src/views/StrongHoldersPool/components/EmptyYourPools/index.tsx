import { Card } from 'alium-uikit/src'
import styled from 'styled-components'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import { ReactComponent as Icon } from './icon.svg'

export default function EmptyYourPools() {
  return (
    <EmptyYourPools.Root>
      <Icon />
      <EmptyYourPools.Text>You don&apos;t have active pools yet</EmptyYourPools.Text>
    </EmptyYourPools.Root>
  )
}

EmptyYourPools.Text = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;
  margin-top: 16px;
`

EmptyYourPools.Root = styled(Card)`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 366px;

  @media ${down(breakpoints.sm)} {
    min-height: 248px;

    ${EmptyYourPools.Text} {
      font-size: 18px;
      line-height: 24px;
    }
  }
`
