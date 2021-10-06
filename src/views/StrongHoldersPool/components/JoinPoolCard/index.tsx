import { useWeb3React } from '@web3-react/core'
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
import { breakpoints, down, up } from 'views/StrongHoldersPool/mq'
import BonusNft from '../BonusNft'
import Card from '../Card'
import FormattedValue from '../FormattedValue'
import JoinPoolModal from '../JoinPoolModal'
import Title from '../Title'
import UsersProgressBar from '../UsersProgressBar'

export default function JoinPoolCard() {
  const { account } = useWeb3React()
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
              <JoinPoolCard.Amount
                value={getBalanceAmount(ethersToBigNumber(poolLocked))}
                suffix={' ' + rewardTokenSymbol}
              />
            ) : (
              <Skeleton />
            )}
          </JoinPoolCard.Field>
          <JoinPoolCard.Join disabled={!account} onClick={openModal}>
            Join the pool
          </JoinPoolCard.Join>
          <JoinPoolCard.Field>
            <BonusNft />
          </JoinPoolCard.Field>
        </JoinPoolCard.Info>
        {poolUsers && maxPoolLength && <UsersProgressBar current={poolUsers.length} all={maxPoolLength.toNumber()} />}
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

JoinPoolCard.Amount = styled(FormattedValue)`
  @media ${up(breakpoints.sm)} {
    font-size: 40px;
    line-height: 48px;
  }
`

JoinPoolCard.Join = styled(Button)`
  margin: 16px 0 32px;
`

JoinPoolCard.Footer = styled.div`
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

JoinPoolCard.Root = styled(Card)`
  @media ${down(breakpoints.sm)} {
    ${JoinPoolCard.Content} {
      flex-direction: column-reverse;
      align-items: center;
      padding: 24px 0;
    }

    ${JoinPoolCard.Info} {
      align-items: center;
      margin-top: 24px;
    }

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
