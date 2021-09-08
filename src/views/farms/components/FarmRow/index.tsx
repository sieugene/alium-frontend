import { ChevronDownIcon, ChevronUpIcon } from 'alium-uikit/src'
import { useMemo } from 'react'
import { useMedia, useToggle } from 'react-use'
import styled from 'styled-components'
import type { FarmCardProps } from '../FarmCard'
import CardHeading from '../FarmCard/CardHeading'
import {
  InfoApr,
  InfoDeposit,
  InfoDepositFee,
  InfoEarn,
  InfoLpType,
  InfoTitle,
  InfoTotalLiquidity,
  InfoValue,
  InfoViewBscScan,
  useInfoEarned,
  useInfoStaked,
} from '../Info'

export type FarmRowProps = FarmCardProps

export default function FarmRow({ farm }: FarmRowProps) {
  const earned = useInfoEarned(farm)
  const staked = useInfoStaked({ farm, addLiquidityUrl: '/none' })
  const [isOpen, toggleOpen] = useToggle(false)
  const isDesktop = useMedia(`screen and (min-width: 1440px)`)
  const isMobile = useMedia(`screen and (max-width: 767px)`)
  const cells = useMemo(
    () => ({
      heading: (
        <FarmRow.HeadingCell>
          <CardHeading farm={farm} />
        </FarmRow.HeadingCell>
      ),
      apr: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoApr farm={farm} />
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
            <InfoTitle>{earned.titleNode}</InfoTitle>
            <InfoValue>
              {earned.displayBalanceNode}
              {earned.earningsBusdNode}
            </InfoValue>
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      staked: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoTitle>{staked.titleNode}</InfoTitle>
            <InfoValue>
              {staked.displayBalanceNode}
              {staked.balanceNode}
            </InfoValue>
          </FarmRow.Field>
        </FarmRow.Cell>
      ),
      stakedButtons: <FarmRow.Cell>{staked.stakedBalanceNotZero && staked.stakingButtonsNode}</FarmRow.Cell>,
      stakedActions: <FarmRow.Cell>{staked.actionsNode}</FarmRow.Cell>,
      indicator: (
        <FarmRow.IndicatorCell onClick={toggleOpen}>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </FarmRow.IndicatorCell>
      ),
      deposit: (
        <FarmRow.Cell>
          <FarmRow.Field>
            <InfoDeposit farm={farm} />
          </FarmRow.Field>
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
            <InfoDepositFee />
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
    }),
    [
      earned.displayBalanceNode,
      earned.earningsBusdNode,
      earned.harvestButtonNode,
      earned.titleNode,
      farm,
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
        <FarmRow.MobileView>
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
      <FarmRow.Summary>
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
        <FarmRow.Details>
          <td colSpan={100}>
            <FarmRow.DetailsTable>
              <tbody>
                {isDesktop ? (
                  <tr>
                    {[
                      cells.deposit,
                      cells.totalLiquidity,
                      cells.depositFee,
                      cells.lpType,
                      cells.earned,
                      cells.harvest,
                      cells.bscScan,
                    ]}
                  </tr>
                ) : (
                  <>
                    <tr>
                      {[
                        cells.deposit,
                        cells.totalLiquidity,
                        cells.earned,
                        cells.staked,
                        cells.stakedButtons,
                        cells.stakedActions,
                      ]}
                    </tr>
                    <tr>{[cells.lpType, cells.depositFee, cells.bscScan]}</tr>
                  </>
                )}
              </tbody>
            </FarmRow.DetailsTable>
          </td>
        </FarmRow.Details>
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
  width: 260px;
  padding: 4px;

  & > * {
    height: 90px;
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
