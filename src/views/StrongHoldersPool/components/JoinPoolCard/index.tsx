import { Button, ChevronRightIcon } from 'alium-uikit/src'
import { StyledInternalLink } from 'components/Shared'
import styled from 'styled-components'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import Card from '../Card'
import FormattedValue from '../FormattedValue'
import NftItemCounter from '../NftItemCounter'
import Title from '../Title'
import UsersProgressBar from '../UsersProgressBar'

export default function JoinPoolCard() {
  return (
    <JoinPoolCard.Root>
      <JoinPoolCard.Content>
        <JoinPoolCard.Info>
          <JoinPoolCard.Field>
            <Title>Pool Amount</Title>
            <FormattedValue value={10345.1334} suffix=' ALM' />
          </JoinPoolCard.Field>
          <JoinPoolCard.Join>Join the pool</JoinPoolCard.Join>
          <JoinPoolCard.Field>
            <Title>Bonus NFT</Title>
            <NftItemCounter />
          </JoinPoolCard.Field>
        </JoinPoolCard.Info>
        <JoinPoolCard.Progress>
          <UsersProgressBar />
        </JoinPoolCard.Progress>
      </JoinPoolCard.Content>
      <JoinPoolCard.Footer>
        Increase your ALM Tokens by joining the Strong Holders Pool.{' '}
        <StyledInternalLink href='#more'>
          More details
          <ChevronRightIcon color='currentColor' />
        </StyledInternalLink>
      </JoinPoolCard.Footer>
    </JoinPoolCard.Root>
  )
}

JoinPoolCard.Content = styled.div`
  padding: 32px 32px 16px 24px;
  display: flex;
  justify-content: space-between;
`

JoinPoolCard.Info = styled.div`
  display: flex;
  flex-direction: column;
`

JoinPoolCard.Field = styled.div`
  display: flex;
  flex-direction: column;

  & > ${Title} {
    margin-bottom: 8px;
  }
`

JoinPoolCard.Join = styled(Button)`
  margin: 16px 0 32px;
`

JoinPoolCard.Footer = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #8990a5;
  padding: 16px 24px;
  border-top: 1px solid #f4f5fa;
  display: flex;
  align-items: center;

  svg {
    vertical-align: middle;
  }
`

JoinPoolCard.Progress = styled.div`
  width: 280px;
  height: 280px;
`

JoinPoolCard.Root = styled(Card)`
  @media ${down(breakpoints.sm)} {
    ${JoinPoolCard.Content} {
      flex-direction: column-reverse;
      align-items: center;
      padding: 24px 0;
    }

    ${JoinPoolCard.Info},
    ${JoinPoolCard.Field} {
      align-items: center;
    }

    ${JoinPoolCard.Footer} {
      text-align: center;
      flex-direction: column;
    }
  }
`
