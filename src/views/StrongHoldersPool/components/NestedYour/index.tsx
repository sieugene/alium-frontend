import styled from 'styled-components'
import { useYourPools } from 'views/StrongHoldersPool/hooks'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import YourPoolCard from '../YourPoolCard'

export default function NestedYour() {
  const pools = useYourPools()
  return (
    <NestedYour.Root>
      <NestedYour.Pools>
        <YourPoolCard />
        <YourPoolCard />
        <YourPoolCard />
        <YourPoolCard />
        <YourPoolCard />
        <YourPoolCard />
        <YourPoolCard />
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
