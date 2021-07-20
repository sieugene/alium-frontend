import { ChainId } from '@alium-official/sdk'
import { useWeb3React } from '@web3-react/core'
import { externalLinks, Menu as UikitMenu, MenuEntry, useModal } from 'alium-uikit/src'
import ConnectionPending from 'components/ConnectionPending/ConnectionPending'
import { useActiveWeb3React } from 'hooks'
import useAuth from 'hooks/useAuth'
import useCurrencyBalance from 'hooks/useCurrencyBalance'
import useTheme from 'hooks/useTheme'
import useWeb3 from 'hooks/useWeb3'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'
import { ROUTES } from 'routes'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import { getExplorerLink, getExplorerName } from 'utils'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import RecentTransactionsModal from '../PageHeader/RecentTransactionsModal'

const Menu: FC<{ loginBlockVisible?: boolean }> = ({ loginBlockVisible, ...props }) => {
  const networkProviderParams = useStoreNetwork((state) => state.networkProviderParams)
  const { nativeCurrency } = networkProviderParams
  const { t } = useTranslation()

  const links: MenuEntry[] = [
    {
      label: t('mainMenu.home'),
      icon: 'HomeIcon',
      href: ROUTES.home,
    },
    {
      label: t('mainMenu.trade'),
      icon: 'TradeIcon',
      triggers: [ROUTES.pool, ROUTES.exchange],
      items: [
        { label: t('swap'), href: ROUTES.exchange },
        { label: t('mainMenu.liquidity'), href: ROUTES.pool },
        { label: 'Migrate', href: ROUTES.migrate },
      ],
    },
    { label: 'Token holder area', icon: 'PrivateRoundIcon', href: ROUTES.tokenHolderArea },
    // {
    //   label: 'Analytics',
    //   icon: 'InfoIcon',
    //   items: [
    //     { label: 'Overview', href: `https://info.${getMainDomain()}` },
    //     { label: 'Tokens', href: `https://info.${getMainDomain()}/tokens` },
    //     { label: 'Pairs', href: `https://info.${getMainDomain()}/pairs` },
    //   ],
    // },
    {
      label: t('mainMenu.more'),
      icon: 'MoreIcon',
      triggers: [ROUTES.audits],
      items: [
        { label: 'Audits', href: ROUTES.audits },
        // { label: 'Voting', href: 'https://voting.dev.alium.finance' },
        { label: t('mainMenu.github'), href: externalLinks.github },
        // { label: 'Docs', href: 'https://docs.pancakeswap.finance' },
        { label: 'Docs', href: 'https://aliumswap.gitbook.io/alium-finance/' },
        { label: t('mainMenu.blog'), href: externalLinks.medium },
      ],
    },
    { label: 'Alium.art', icon: 'IconArt', href: `https://alium.art`, new: true },
  ]

  const { account } = useWeb3React()
  const web3 = useWeb3()
  const { chainId } = useActiveWeb3React()
  const { login, logout } = useAuth()

  const { isDark, toggleTheme } = useTheme()
  const { balance } = useCurrencyBalance(account, nativeCurrency)
  const explorerName = getExplorerName(chainId as ChainId)
  const explorerLink = getExplorerLink(chainId as ChainId, account as string, 'address')
  // const useBalance = async () => {
  //   const result = await useCurrencyBalance(account as string, nativeCurrency)
  //   return result
  // }

  // useBalance().then((result)=>console.log(result))

  const [transactionsHistoryModal] = useModal(<RecentTransactionsModal />)

  return (
    <>
      <ConnectionPending />
      <UikitMenu
        // isProduction={process.env.NODE_ENV === "production"}
        links={links}
        account={account as string}
        login={login}
        logout={logout}
        isDark={isDark}
        toggleTheme={toggleTheme}
        loginBlockVisible={loginBlockVisible}
        buttonTitle={t('connect')}
        balance={toSignificantCurrency(balance)}
        explorerName={explorerName}
        explorerLink={explorerLink}
        options={{
          modalTitle: 'Account',
          modalFooter: t('learnHowConnect'),
          modelLogout: t('logout'),
          modalBscScan: t('viewOnBscscan'),
          modelCopyAddress: t('copyAddress'),
        }}
        onTransactionHistoryHandler={transactionsHistoryModal}
        betaText='This is the main version. Press here to switch to Beta.'
        betaLink='https://beta.exchange.alium.finance'
        balanceHook={async () => null}
        {...props}
      />
    </>
  )
}

export default Menu
