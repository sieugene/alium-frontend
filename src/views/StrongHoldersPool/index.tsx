import { MENU_HEIGHT } from 'alium-uikit/src/widgets/Menu/config'
import { useRouter } from 'next/router'
import { ROUTES } from 'routes'
import styled from 'styled-components'
import Header from './components/Header'
import NestedNew from './components/NestedNew'
import NestedYour from './components/NestedYour'
import { breakpoints, down } from './mq'

export default function StrongHoldersPool() {
  const router = useRouter()
  return (
    <StrongHoldersPool.Root>
      <Header />
      {router.pathname === ROUTES.shp && <NestedNew />}
      {router.pathname === ROUTES.shpYour && <NestedYour />}
    </StrongHoldersPool.Root>
  )
}

StrongHoldersPool.Root = styled.div`
  margin: 0 auto;
  padding: 16px 30px;
  max-width: 1122px;
  min-height: calc(100vh - ${MENU_HEIGHT}px);
  position: relative;

  @media ${down(breakpoints.lg)} {
    padding: 16px 24px;
  }

  @media ${down(breakpoints.sm)} {
    padding: 32px 10px;
  }
`
