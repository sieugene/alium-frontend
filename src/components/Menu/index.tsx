import { ChainId } from '@alium-official/sdk'
import { useWeb3React } from '@web3-react/core'
import { externalLinks, Menu as UikitMenu, MenuEntry, useModal } from 'alium-uikit/src'
// import { getMainDomain } from 'alium-uikit/src/util/getMainDomain'
import ConnectionPending from 'components/ConnectionPending/ConnectionPending'
import { useActiveWeb3React } from 'hooks'
import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { ROUTES } from 'routes'
import { getExplorerLink, useExplorerName } from 'utils'
import RecentTransactionsModal from '../PageHeader/RecentTransactionsModal'

const Menu: FC<{ loginBlockVisible?: boolean }> = ({ loginBlockVisible, ...props }) => {
  const { t } = useTranslation()

  const links: MenuEntry[] = [
    {
      label: t('menu.home'),
      icon: 'HomeIcon',
      href: ROUTES.home,
    },
    {
      label: t('menu.trade'),
      icon: 'TradeIcon',
      triggers: [ROUTES.pool, ROUTES.exchange],
      items: [
        { label: t('menu.exchange'), href: ROUTES.exchange },
        { label: t('menu.liquidity'), href: ROUTES.pool },
        { label: t('menu.migrate'), href: ROUTES.migrate },
      ],
    },
    { label: 'Farms', icon: 'FarmIcon', href: ROUTES.farms },
    { label: 'Strong Holders Pool', icon: 'ShpIcon', href: ROUTES.shp },
    { label: t('menu.tokenHolderArea'), icon: 'PrivateRoundIcon', href: ROUTES.tokenHolderArea },
    /* {
      label: 'Analytics',
      icon: 'InfoIcon',
      items: [
        { label: t('menu.overview'), href: `https://info.${getMainDomain()}` },
        { label: t('menu.tokens'), href: `https://info.${getMainDomain()}/tokens` },
        { label: t('menu.pairs'), href: `https://info.${getMainDomain()}/pairs` },
      ],
    }, */
    {
      label: t('menu.more'),
      icon: 'MoreIcon',
      triggers: [ROUTES.audits],
      items: [
        { label: t('menu.audits'), href: ROUTES.audits },
        // { label: t('menu.voting'), href: 'https://voting.dev.alium.finance' },
        { label: t('menu.github'), href: externalLinks.github },
        { label: t('menu.docs'), href: 'https://aliumswap.gitbook.io/alium-finance/' },
        { label: t('menu.blog'), href: externalLinks.medium },
      ],
    },
    { label: t('menu.aliumArt'), icon: 'IconArt', href: `https://alium.art`, new: true },
  ]

  const { account } = useWeb3React()

  const { chainId } = useActiveWeb3React()
  const { login, logout } = useAuth()

  const { isDark, toggleTheme } = useTheme()

  const { explorerName } = useExplorerName(chainId)
  const explorerLink = getExplorerLink(chainId as ChainId, account as string, 'address')

  const [transactionsHistoryModal] = useModal(<RecentTransactionsModal />)

  return (
    <>
      <ConnectionPending />
      <UikitMenu
        // isProduction={process.env.APP_ENV !== 'development'}
        links={links}
        account={account as string}
        login={login}
        logout={logout}
        isDark={isDark}
        toggleTheme={toggleTheme}
        loginBlockVisible={loginBlockVisible}
        buttonTitle={t('others.connect')}
        explorerName={explorerName}
        explorerLink={explorerLink}
        onTransactionHistoryHandler={transactionsHistoryModal}
        betaText='This is the main version. Press here to switch to Beta.'
        betaLink='https://beta.exchange.alium.finance'
        {...props}
      />
    </>
  )
}

export default Menu
