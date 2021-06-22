import { ChainId,ETHER } from '@alium-official/sdk'
import { externalLinks,Menu as UikitMenu,MenuEntry,useModal } from '@alium-official/uikit'
import { useWeb3React } from '@web3-react/core'
import ConnectionPending from 'components/ConnectionPending/ConnectionPending'
import { useActiveWeb3React } from 'hooks'
import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ROUTES } from 'routes'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { getExplorerLink,getExplorerName } from 'utils'
import RecentTransactionsModal from '../PageHeader/RecentTransactionsModal'

const Menu: React.FC<{ loginBlockVisible?: boolean }> = ({ loginBlockVisible, ...props }) => {
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
      items: [
        { label: t('swap'), href: ROUTES.exchange },
        { label: t('mainMenu.liquidity'), href: ROUTES.pool },
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
      items: [
        { label: 'Audits', href: ROUTES.audits },
        // { label: 'Voting', href: 'https://voting.dev.alium.finance' },
        { label: t('mainMenu.github'), href: externalLinks.github },
        // { label: 'Docs', href: 'https://docs.pancakeswap.finance' },
        { label: 'Docs', href: 'https://aliumswap.gitbook.io/alium-finance/' },
        { label: t('mainMenu.blog'), href: externalLinks.medium },
      ],
    },
  ]

  const { account } = useWeb3React()
  const { chainId } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const balance = useCurrencyBalance(account as string, ETHER)
  const explorerName = getExplorerName(chainId as ChainId)
  const explorerLink = getExplorerLink(chainId as ChainId, account as string, 'address')
  // const useBalance = async () => {
  //   const result = await useCurrencyBalance(account as string, ETHER)
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
        balance={balance?.toSignificant(6)}
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
        betaText="This is the main version. Press here to switch to Beta."
        betaLink="https://beta.exchange.alium.finance"
        balanceHook={async () => null}
        {...props}
      />
    </>
  )
}

export default Menu
