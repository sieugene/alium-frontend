import { Currency, Token } from '@alium-official/sdk'
import { useActiveWeb3React } from 'hooks'
import { CSSProperties, useMemo } from 'react'
import { WrappedTokenInfo } from 'state/lists/hooks'
import { Farm } from 'state/types'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { getTokenLogoURL } from 'utils/common/getTokenLogoURL'
import useHttpLocations from '../../hooks/useHttpLocations'
import CoinLogo from '../alium/CoinLogo'
import Logo from '../Logo'

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

const defaultIcons = {
  ALM: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11/logo.png',
}

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency | Farm['token'] | Farm['quoteToken']
  size?: string
  style?: CSSProperties
}) {
  const currentNetwork = useStoreNetwork((state) => state.currentNetwork)
  const { nativeCurrency } = currentNetwork.providerParams
  let { chainId } = useActiveWeb3React()
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  if (currentChainId) {
    chainId = currentChainId
  }

  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === nativeCurrency) return []

    if (currency instanceof Token || currency?.address) {
      if (currency instanceof WrappedTokenInfo || (currency?.address && currency?.symbol)) {
        const sources = [
          ...uriLocations,
          `/images/coins/${currency?.symbol ?? 'token'}.png`,
          getTokenLogoURL(currency.address, currency.symbol),
        ]
        return sources
      }

      return [`/images/coins/${currency?.symbol ?? 'token'}.png`, getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  const natives = ['BNB', 'WBNB', 'ETH', 'WETH', 'MATIC', 'WMATIC', 'HT', 'WHT']
  const current = currency?.symbol?.toUpperCase()
  const isNative = natives.includes(current)
  const nativesLogos = {
    BNB: '/images/binance-logo.png',
    WBNB: '/images/binance-logo.png',
    ETH: '/images/coins/ETH.png',
    WETH: '/images/coins/ETH.png',
    MATIC: '/images/coins/matic.png',
    WMATIC: '/images/coins/matic.png',
    HT: '/images/heco-logo.png',
    WHT: '/images/heco-logo.png',
  }

  if (isNative) return <StyledEthereumLogo src={nativesLogos[current]} size={size} style={style} />
  if (currency?.symbol)
    return <CoinLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />

  return (
    // <FilledHelp height="24px" width="24px" mr="8px" />
    <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
  )
}
