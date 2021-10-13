import styled from 'styled-components'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import JoinPoolCard from '../JoinPoolCard'
import LockedInPoolsCard from '../LockedInPoolsCard'
import MyPoolAmountCard from '../MyPoolAmountCard'
import OpenedPoolsCard from '../OpenedPoolsCard'

export default function NestedNew() {
  return (
    <NestedNew.Root>
      <JoinPoolCard />
      <NestedNew.Stats>
        <MyPoolAmountCard />
        <OpenedPoolsCard />
        <LockedInPoolsCard />
      </NestedNew.Stats>
    </NestedNew.Root>
  )
}

NestedNew.Stats = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 354px;
  margin-left: 30px;

  & > * {
    flex: 1;
  }

  & > * + * {
    margin-top: 30px;
  }
`

NestedNew.Root = styled.div`
  display: flex;

  & > ${JoinPoolCard.Root} {
    flex: 1;
  }

  @media ${down(breakpoints.lg)} {
    flex-direction: column-reverse;
    align-items: stretch;

    ${NestedNew.Stats} {
      flex-basis: auto;
      flex-direction: row;
      margin-left: 0;
      margin-bottom: 16px;

      & > * + * {
        margin-top: 0;
        margin-left: 16px;
      }
    }
  }

  @media ${down(breakpoints.sm)} {
    padding-top: 16px;

    ${NestedNew.Stats} {
      margin-top: 16px;
      flex-direction: column;

      & > * + * {
        margin-left: 0;
      }
    }
  }
`
