import { ChevronDownIcon, ChevronUpIcon } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { useMedia, useToggle } from 'react-use'
import styled from 'styled-components'
import { ViewMode } from 'views/farms/farms.types'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import type { FarmCardProps } from '../FarmCard'
import CardHeading from '../FarmCard/CardHeading'
import {
  EarnsFarm,
  InfoApr,
  InfoDeposit,
  InfoDepositFee,
  InfoEarn,
  InfoLpType,
  InfoTitle,
  InfoTotalLiquidity,
  InfoViewBscScan,
  useInfoEarned,
  useInfoStaked,
} from '../Info'

export type FarmRowProps = FarmCardProps & {
  farmNum: number
  almPrice: BigNumber
}

export default function FarmRow({ farm, farmNum, almPrice }: FarmRowProps) {
  const earned = useInfoEarned(farm)
  const staked = useInfoStaked({ farm })
  const [isOpen, toggleOpen] = useToggle(false)
  const isDesktop = useMedia(`screen and (min-width: 1240px)`)

  const isMobile = useMedia(`screen and (max-width: 767px)`)
  const farmClassname = farmNum < 3 ? `farm__row${farmNum}` : 'farm__row'

  const cells = useMemo(
    () => ({
      heading: (
        <FarmRow.HeadingCell>
          <CardHeading farm={farm} type={ViewMode.TABLE} />
        </FarmRow.HeadingCell>
      ),
      apr: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoApr farm={farm} almPrice={almPrice} />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      earn: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoEarn farm={farm} />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      earned: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <StyledInfoTitle>{earned.titleNode}</StyledInfoTitle>
            <EarnsFarm>
              {earned.displayBalanceNode}
              {earned.earningsBusdNode}
            </EarnsFarm>
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      staked: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <StyledInfoTitle>{staked.titleNode}</StyledInfoTitle>
            <EarnsFarm>
              {staked.displayBalanceNode || '-'}
              {staked.balanceNode}
            </EarnsFarm>
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      stakedButtons: (
        <FarmRow.Cell>
          {isDesktop && staked.stakedBalanceNotZero && staked.stakingButtonsNode}
          {!isDesktop && !isMobile && (staked.stakedBalanceNotZero ? staked.stakingButtonsNode : staked.actionsNode)}
        </FarmRow.Cell>
      ),
      stakedActions: <FarmRow.Cell>{staked.actionsNode}</FarmRow.Cell>,
      indicator: (
        <FarmRow.IndicatorCell onClick={toggleOpen}>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </FarmRow.IndicatorCell>
      ),
      deposit: (
        <FarmRow.Cell>
          {isDesktop ? (
            <MultipleField>
              <FarmRow.Field>
                <InfoDeposit farm={farm} />
              </FarmRow.Field>
              <FarmRow.Field>
                <InfoTotalLiquidity farm={farm} />
              </FarmRow.Field>
            </MultipleField>
          ) : (
            <FarmRow.Field>
              <InfoDeposit farm={farm} />
            </FarmRow.Field>
          )}
        </FarmRow.Cell>
      ),
      totalLiquidity: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoTotalLiquidity farm={farm} />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      depositFee: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoDepositFee depositFee={farm?.depositFee} />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      lpType: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoLpType />
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      harvest: <FarmRow.Cell>{earned.harvestButtonNode}</FarmRow.Cell>,
      bscScan: (
        <FarmRow.Cell>
          <InfoViewBscScan farm={farm} />
        </FarmRow.Cell>
      ),
      empty: <FarmRow.Cell />,
    }),
    [
      almPrice,
      earned.displayBalanceNode,
      earned.earningsBusdNode,
      earned.harvestButtonNode,
      earned.titleNode,
      farm,
      isDesktop,
      isMobile,
      isOpen,
      staked.actionsNode,
      staked.balanceNode,
      staked.displayBalanceNode,
      staked.stakedBalanceNotZero,
      staked.stakingButtonsNode,
      staked.titleNode,
      toggleOpen,
    ],
  )

  if (isMobile) {
    return (
      <>
        <FarmRow.MobileView className={farmClassname}>
          <tr>{cells.heading}</tr>
          <tr>{[cells.apr, cells.earn, !isOpen && cells.indicator]}</tr>
          {isOpen && (
            <>
              <tr>{[cells.totalLiquidity, cells.deposit]}</tr>
              <tr>{[cells.lpType, cells.depositFee]}</tr>
              <tr>{[cells.earned, cells.harvest]}</tr>
              <tr>{[cells.staked, cells.stakedButtons]}</tr>
              <tr>{[cells.bscScan]}</tr>
              <tr>{[cells.stakedActions, cells.indicator]}</tr>
            </>
          )}
        </FarmRow.MobileView>
        <FarmRow.Separator />
      </>
    )
  }

  return (
    <>
      <FarmRow.Summary className={farmClassname}>
        {isDesktop
          ? [
              cells.heading,
              cells.apr,
              cells.earn,
              cells.earned,
              cells.staked,
              cells.stakedButtons,
              cells.stakedActions,
              cells.indicator,
            ]
          : [cells.heading, cells.apr, cells.earn, cells.earned, cells.indicator]}
      </FarmRow.Summary>
      {isOpen && (
        <>
          {isDesktop ? (
            <FarmRow.Details>
              {[
                cells.deposit,
                cells.depositFee,
                cells.lpType,
                cells.earned,
                cells.harvest,
                cells.empty,
                cells.bscScan,
                cells.empty,
              ]}
            </FarmRow.Details>
          ) : (
            <FarmRow.Details>
              <td colSpan={100}>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>{[cells.deposit, cells.totalLiquidity, cells.staked, cells.stakedButtons, cells.bscScan]}</tr>
                    <tr>{[cells.lpType, cells.depositFee, cells.earned, cells.harvest]}</tr>
                  </tbody>
                </table>
              </td>
            </FarmRow.Details>
          )}
        </>
      )}
      <FarmRow.Separator />
    </>
  )
}

FarmRow.Paper = styled.tr`
  width: 100%;
  border-radius: 6px;
  background: #fff;
`

FarmRow.Cell = styled.td`
  vertical-align: middle;
  padding: 0 12px;
`

FarmRow.HeadingCell = styled(FarmRow.Cell)`
  min-width: 292px;
  max-width: 292px;
  width: 292px;
  padding: 4px;
  @media ${down(breakpoints.md)} {
    width: 268px;
    max-width: none;
  }

  & > * {
    height: 90px;
  }
  @media ${down(375)} {
    & > * {
      height: 64px;
    }
  }
`

FarmRow.Separator = styled.div`
  height: 4px;
`

FarmRow.IndicatorCell = styled(FarmRow.Cell)`
  cursor: pointer;
`

FarmRow.Summary = styled(FarmRow.Paper)``

FarmRow.MobileView = styled(FarmRow.Summary)`
  display: flex;
  flex-direction: column;

  ${FarmRow.HeadingCell} {
    width: 100%;
  }

  & > tr {
    padding: 18px 0;
    width: 100%;
    display: flex;
    align-items: center;
    &:first-child {
      @media ${down(375)} {
        padding: 0;
      }
    }

    & > * {
      flex: 1;
    }
  }

  ${FarmRow.IndicatorCell} {
    margin-left: auto;
    text-align: right;
  }
`

FarmRow.Details = styled(FarmRow.Paper)`
  ${FarmRow.Cell} {
    padding-top: 22px;
    padding-bottom: 22px;
  }
`

FarmRow.DetailsTable = styled.table`
  width: 100%;
`

FarmRow.Field = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 24px 24px;
  align-items: center;
  gap: 8px;
  width: 100%;
`

const MultipleField = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledInfoTitle = styled(InfoTitle)`
  & {
    white-space: nowrap;
  }
`
