import { Button } from 'alium-uikit/src'
import { useToggle } from 'react-use'
import styled from 'styled-components'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import Card from '../Card'
import DetailsButton from '../DetailsButton'
import FormattedValue from '../FormattedValue'
import NftItemCounter from '../NftItemCounter'
import NftItemReward from '../NftItemReward'
import PoolDetailsInfo from '../PoolDetailsInfo'
import Title from '../Title'

export default function YourPoolCard() {
  const [isDetails, toggleDetails] = useToggle(false)
  return (
    <YourPoolCard.Root>
      <YourPoolCard.Summary>
        <YourPoolCard.Info>
          <YourPoolCard.InfoFields>
            <YourPoolCard.Field>
              <Title>Your contribution</Title>
              <YourPoolCard.Value value={100000} suffix=' ALM' />
            </YourPoolCard.Field>
            <YourPoolCard.Field>
              <PickUpFunds />
            </YourPoolCard.Field>
            <YourPoolCard.Field>
              <Title>Bonus NFT</Title>
              <NftItemCounter />
            </YourPoolCard.Field>
          </YourPoolCard.InfoFields>
          <YourPoolCard.InfoActions>
            <Button>Leave the pool</Button>
            <DetailsButton isOpen={isDetails} onClick={toggleDetails} />
          </YourPoolCard.InfoActions>
        </YourPoolCard.Info>
        <YourPoolCard.PoolCounters>
          <YourPoolCard.Field>
            <Title>Users In the pool</Title>
            <YourPoolCard.UsersCounter value={24} />
          </YourPoolCard.Field>
          <YourPoolCard.Field>
            <Title>Pool Amount</Title>
            <YourPoolCard.Value value={100886.0027} suffix=' ALM' />
          </YourPoolCard.Field>
        </YourPoolCard.PoolCounters>
      </YourPoolCard.Summary>
      {isDetails && (
        <YourPoolCard.Details>
          <Details />
        </YourPoolCard.Details>
      )}
    </YourPoolCard.Root>
  )
}

YourPoolCard.Info = styled.div`
  padding-top: 16px;
`

YourPoolCard.Field = styled.div`
  ${Title} {
    margin-bottom: 8px;
  }
`

YourPoolCard.InfoFields = styled.div`
  margin-bottom: 32px;
  & > * + * {
    margin-top: 24px;
  }
`

YourPoolCard.InfoActions = styled.div`
  display: flex;
  align-items: center;
  & > * + * {
    margin-left: 24px;
  }
`

YourPoolCard.Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

YourPoolCard.Value = styled(FormattedValue)`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
`

YourPoolCard.PoolCounters = styled.div`
  display: grid;
  gap: 20px;
  border: 1px solid #f4f5fa;
  border-radius: 6px;
  padding: 16px 24px 16px 16px;
`

YourPoolCard.UsersCounter = styled(YourPoolCard.Value)`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: 0.3px;
  color: #1ea76d;
`

YourPoolCard.Details = styled.div`
  padding-top: 32px;
`

YourPoolCard.Root = styled(Card)`
  padding: 24px;
  position: relative;

  @media ${down(breakpoints.lg)} {
    padding: 12px 8px 24px;

    ${YourPoolCard.Summary} {
      flex-direction: column-reverse;
      align-items: stretch;
    }

    ${YourPoolCard.Info},
    ${YourPoolCard.Details} {
      padding: 16px 16px 0;
    }

    ${YourPoolCard.PoolCounters} {
      grid-template-columns: 1fr 1fr;
      padding: 16px;
      gap: 8px;
      align-items: start;
    }

    ${YourPoolCard.UsersCounter} {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 24px;
      letter-spacing: 0.3px;
    }

    ${YourPoolCard.InfoActions} {
      & > * + * {
        margin-left: 58px;
      }
    }
  }
`

function PickUpFunds() {
  return (
    <>
      <Title>Pick up funds</Title>
      <PickUpFunds.Value>
        <PickUpFunds.Counters>
          <YourPoolCard.Value value={103400} suffix=' ALM' />
          <PickUpFunds.Profit>+3.4%</PickUpFunds.Profit>
        </PickUpFunds.Counters>
        <NftItemReward />
      </PickUpFunds.Value>
    </>
  )
}

PickUpFunds.Counters = styled.div``

PickUpFunds.Value = styled.div`
  display: flex;
  align-items: flex-start;

  ${NftItemReward.Root} {
    height: 50px;
  }
`

PickUpFunds.Profit = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #1ea76d;
  margin-top: 4px;
`

function Details() {
  return (
    <Details.Root>
      <PoolDetailsInfo />
      <Details.HistoryTitle>History</Details.HistoryTitle>
      <Details.HistoryTable>
        <thead>
          <tr>
            <th>Wallet</th>
            <th>Added</th>
            <th>Withdraw</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0xf420c82...AA26E</td>
            <td>13.4340 ALM</td>
            <td>5.2238 ALM</td>
          </tr>
          <tr>
            <td>0xf420c82...AA26E</td>
            <td>13.4340 ALM</td>
            <td>5.2238 ALM</td>
          </tr>
          <tr>
            <td>0xf420c82...AA26E</td>
            <td>13.4340 ALM</td>
            <td>5.2238 ALM</td>
          </tr>
        </tbody>
      </Details.HistoryTable>
    </Details.Root>
  )
}

Details.Root = styled.div``

Details.HistoryTitle = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.3px;
  color: #6c5dd3;
  margin: 24px 0 16px;
`

Details.HistoryTable = styled.table`
  width: 100%;

  thead {
    border-bottom: 1px solid #f4f5fa;
  }

  th {
    padding: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #0b1359;
    text-align: left;
  }

  td,
  th {
    &:last-child {
      text-align: right;
    }
  }

  td {
    padding: 6px 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  tr {
    &:nth-child(even) {
      background: #f4f5fa;
    }
  }
`
