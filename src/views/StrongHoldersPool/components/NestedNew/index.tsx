import styled from 'styled-components'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import JoinPoolCard from '../JoinPoolCard'
import LockedInPoolsCard from '../LockedInPoolsCard'
import OpenedPoolsCard from '../OpenedPoolsCard'
import StatsCard from '../StatsCard'

export default function NestedNew() {
  return (
    <NestedNew.Root>
      <JoinPoolCard />
      <NestedNew.Stats>
        <OpenedPoolsCard />
        <LockedInPoolsCard />
      </NestedNew.Stats>
    </NestedNew.Root>
  )
}

NestedNew.Stats = styled.div`
  display: grid;
  gap: 30px;
  flex-basis: 354px;
  margin-left: 30px;
`

NestedNew.Root = styled.div`
  display: flex;
  align-items: flex-start;

  & > ${JoinPoolCard.Root} {
    flex: 1;
  }

  @media ${down(breakpoints.lg)} {
    flex-direction: column;
    align-items: stretch;

    ${NestedNew.Stats} {
      flex-basis: auto;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-left: 0;
      margin-top: 16px;
    }
  }

  @media ${down(breakpoints.sm)} {
    flex-direction: column-reverse;

    ${NestedNew.Stats} {
      gap: 0;
      background: #fff;
      border-radius: 6px;
      margin-top: 0;
      margin-bottom: 8px;
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
