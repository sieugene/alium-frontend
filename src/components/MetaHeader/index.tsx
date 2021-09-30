import Head from 'next/head'
import { useRouter } from 'next/router'
import { ROUTES } from 'routes'
import styled from 'styled-components'

const metaTags = [
  {
    title: 'Home Aluim Swap',
    link: ROUTES.home,
    description:
      'Aluim Swap - DeFi aggregator on Ethereum, Polygon, Huobi and Binance Smart Chain. Buy ALM token on Alium DEX.',
    seo: '',
  },
  {
    title: 'Exchange | Aluim Swap',
    link: ROUTES.exchange,
    description: '',
    seo: 'Exchange',
  },
  {
    title: 'Liquidity | Aluim Swap',
    link: ROUTES.pool,
    description: '',
    seo: 'Trade',
  },
  {
    title: 'Migrate | Aluim Swap',
    link: ROUTES.migrate,
    description: '',
    seo: 'Trade',
  },
  {
    title: 'NFT deck | Aluim Swap',
    link: ROUTES.tokenHolderArea,
    description: '',
    seo: 'Your NFT deck',
  },
  {
    title: 'Audits | Aluim Swap',
    link: ROUTES.audits,
    description: '',
    seo: 'Our completed audits',
  },
]
const defaultMeta = {
  title: 'Alium Swap',
  description: '',
  seo: '',
}
// Since ssr is off, we do it at the level _app.tsx (Head component in components not works)
// TODO when ssr work, refactor this
const MetaHeader = () => {
  const router = useRouter()
  console.log(router.pathname, '!!!!!!!!')

  const homeMeta = router.pathname === '/' && metaTags[0]

  const { title, description, seo } =
    homeMeta || metaTags.find((meta) => meta.link !== '/' && router.pathname.includes(meta.link)) || defaultMeta

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={`${description}`} />
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1' />
      </Head>
      {seo && <MetaHeader.H1>{seo}</MetaHeader.H1>}
    </>
  )
}

MetaHeader.H1 = styled.h1`
  display: none;
`

export default MetaHeader
