import { Skeleton } from 'alium-uikit/src'
import times from 'lodash/times'
import styled from 'styled-components'
import { useYourPoolsIds } from 'views/StrongHoldersPool/hooks'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import YourPoolCard from '../YourPoolCard'

export default function NestedYour() {
  const { data } = useYourPoolsIds()
  return (
    <NestedYour.Root>
      <NestedYour.Pools>
        {data
          ? data.map((poolId) => <YourPoolCard key={poolId.toString()} poolId={poolId} />)
          : times(4, (i) => <Skeleton animation='waves' key={i} height={400} />)}
      </NestedYour.Pools>
      {/* TODO: Pagination? */}
    </NestedYour.Root>
  )
}

NestedYour.Pools = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 1fr 1fr;
  gap: 32px 30px;
`

NestedYour.Root = styled.div`
  @media ${down(breakpoints.lg)} {
    ${NestedYour.Pools} {
      gap: 16px;
    }
  }

  @media ${down(breakpoints.sm)} {
    ${NestedYour.Pools} {
      grid-template-columns: 1fr;
    }
  }
`
