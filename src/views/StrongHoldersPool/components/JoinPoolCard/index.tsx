import { Button, Skeleton, useModal } from 'alium-uikit/src'
import styled from 'styled-components'
import { ethersToBigNumber } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import {
  useCurrentPoolId,
  useMaxPoolLength,
  usePoolLocked,
  usePoolUsers,
  useRewardTokenInfo,
} from 'views/StrongHoldersPool/hooks'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import Card from '../Card'
import FormattedValue from '../FormattedValue'
import JoinPoolModal from '../JoinPoolModal'
import NftItemCounter from '../NftItemCounter'
import Title from '../Title'
import UsersProgressBar from '../UsersProgressBar'

export default function JoinPoolCard() {
  const { data: currentPoolId } = useCurrentPoolId()
  const { data: poolUsers } = usePoolUsers(currentPoolId)
  const { data: poolLocked } = usePoolLocked(currentPoolId)
  const { data: maxPoolLength } = useMaxPoolLength()
  const { rewardTokenSymbol } = useRewardTokenInfo()
  const [openModal] = useModal(<JoinPoolModal />, false)
  return (
    <JoinPoolCard.Root>
      <JoinPoolCard.Content>
        <JoinPoolCard.Info>
          <JoinPoolCard.Field>
            <Title>Pool Amount</Title>
            {poolLocked ? (
              <FormattedValue
                value={getBalanceAmount(ethersToBigNumber(poolLocked))}
                suffix={' ' + rewardTokenSymbol}
              />
            ) : (
              <Skeleton />
            )}
          </JoinPoolCard.Field>
          <JoinPoolCard.Join onClick={openModal}>Join the pool</JoinPoolCard.Join>
          <JoinPoolCard.Field>
            <Title>Bonus NFT</Title>
            <NftItemCounter />
          </JoinPoolCard.Field>
        </JoinPoolCard.Info>
        {poolUsers && maxPoolLength && (
          <JoinPoolCard.Progress>
            <UsersProgressBar current={poolUsers.length} all={maxPoolLength.toNumber()} />
          </JoinPoolCard.Progress>
        )}
      </JoinPoolCard.Content>
      <JoinPoolCard.Footer>
        <span>Increase your ALM Tokens by joining the Strong Holders Pool. </span>
        {/* <StyledInternalLink href='#more'>
          More details
          <ChevronRightIcon color='currentColor' />
        </StyledInternalLink> */}
      </JoinPoolCard.Footer>
    </JoinPoolCard.Root>
  )
}

JoinPoolCard.Content = styled.div`
  padding: 32px 32px 24px 24px;
  display: flex;
  justify-content: space-between;
  & > * {
    flex-shrink: 0;
  }
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
  padding: 15px 24px;
  border-top: 1px solid #f4f5fa;

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
      display: flex;
      text-align: center;
      flex-direction: column;
    }
  }
`
