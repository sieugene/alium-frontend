import styled from 'styled-components'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import JoinPoolCard from '../JoinPoolCard'
import LockedInPoolsCard from '../LockedInPoolsCard'
import OpenedPoolsCard from '../OpenedPoolsCard'
import StatsCard from '../StatsCard'

export default function NestedNew() {
  return (
    <NestedNew.Root>
      <NestedNew.Pools>
        <JoinPoolCard />
        <JoinPoolCard />
      </NestedNew.Pools>
      <NestedNew.Stats>
        <OpenedPoolsCard />
        <LockedInPoolsCard />
      </NestedNew.Stats>
    </NestedNew.Root>
  )
}

NestedNew.Pools = styled.div`
  display: grid;
  gap: 30px;
`

NestedNew.Stats = styled.div`
  display: grid;
  gap: 30px;
`

NestedNew.Root = styled.div`
  display: grid;
  grid-template-columns: 1fr 354px;
  align-items: start;
  gap: 30px;

  @media ${down(breakpoints.lg)} {
    grid-template-columns: 1fr;
    gap: 16px;

    ${NestedNew.Stats} {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    ${NestedNew.Pools} {
      gap: 16px;
    }
  }

  @media ${down(breakpoints.sm)} {
    ${NestedNew.Stats} {
      gap: 0;
      background: #fff;
      border-radius: 6px;
    }

    && ${StatsCard.Header} {
      padding: 12px 16px;
    }

    && ${StatsCard.Content} {
      padding: 16px;
    }

    ${StatsCard.Root} {
      background: none;
      border-radius: 0;

      :first-child {
        ${StatsCard.Header},
        ${StatsCard.Content} {
          padding-right: 2px;
        }
      }

      :last-child {
        ${StatsCard.Header},
        ${StatsCard.Content} {
          padding-left: 2px;
        }
      }
    }
  }
`
