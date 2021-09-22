import { Button } from 'alium-uikit/src'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { ROUTES } from 'routes'
import styled from 'styled-components'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'

export default function Header() {
  const router = useRouter()
  const tabs = useMemo(
    () => [
      {
        title: 'New Pool',
        href: ROUTES.shp,
      },
      {
        title: 'Your Pools',
        href: ROUTES.shpYour,
      },
    ],
    [],
  )
  return (
    <Header.Root>
      <Header.Main>
        <Header.Title>Strong Holders Pool</Header.Title>
        <Header.Tabs>
          {tabs.map((t) => (
            <Link href={t.href} key={t.href} passHref>
              <Header.Tab forwardedAs='a' variant={t.href === router.pathname ? 'primary' : 'tertiary'}>
                {t.title}
              </Header.Tab>
            </Link>
          ))}
        </Header.Tabs>
      </Header.Main>
      <Header.Image src='/images/shp/header-bg.svg' />
    </Header.Root>
  )
}

Header.Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`

Header.Image = styled.img``

Header.Title = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: 0.3px;
  color: #0b1359;
  margin-bottom: 32px;
`

Header.Tabs = styled.div`
  background: #f4f5fa;
  border: 1px solid #d2d6e5;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  margin-bottom: 24px;

  & > * + * {
    margin-left: 8px;
  }
`

Header.Tab = styled(Button)`
  min-width: 164px;
  height: 40px;
`

Header.Root = styled.div`
  display: flex;
  align-items: center;

  @media ${down(breakpoints.lg)} {
    ${Header.Title} {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      line-height: 48px;
      letter-spacing: 0.3px;
    }
  }

  @media ${down(breakpoints.md)} {
    ${Header.Title} {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 28px;
      line-height: 36px;
      letter-spacing: 0.3px;
      margin-bottom: 24px;
    }
  }

  @media ${down(breakpoints.sm)} {
    ${Header.Tab} {
      min-width: auto;
      flex: 1;
    }

    ${Header.Image} {
      display: none;
    }

    ${Header.Main} {
      align-items: stretch;
    }
  }
`
