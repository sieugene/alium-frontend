import { ChainId, Currency, ETHER, Token } from '@alium-official/sdk'
import PolygonMaticLogo from 'assets/images/polygon-matic-logo.png'
import { useActiveWeb3React } from 'hooks'
import { CSSProperties, useMemo } from 'react'
import { WrappedTokenInfo } from 'state/lists/hooks'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import useHttpLocations from '../../hooks/useHttpLocations'
import CoinLogo from '../alium/CoinLogo'
import Logo from '../Logo'

const HTlogo = '/images/heco-logo.png'
const BNBLogo = '/images/binance-logo.png'

const BaseLogo: { [chainId in ChainId]: any } = {
  [ChainId.MAINNET]: BNBLogo,
  [ChainId.BSCTESTNET]: BNBLogo,
  [ChainId.HECOMAINNET]: HTlogo,
  [ChainId.HECOTESTNET]: HTlogo,
  [ChainId.ETHER_MAINNET]: HTlogo,
  [ChainId.ETHER_TESTNET]: HTlogo,
  [ChainId.MATIC_MAINNET]: PolygonMaticLogo,
  [ChainId.MATIC_TESTNET]: PolygonMaticLogo,
}

const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/${address}/logo.png`

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

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
}: {
  currency?: Currency
  size?: string
  style?: CSSProperties
}) {
  let { chainId } = useActiveWeb3React()
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  if (currentChainId) {
    chainId = currentChainId
  }

  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, `/images/coins/${currency?.symbol ?? 'token'}.png`, getTokenLogoURL(currency.address)]
      }

      return [`/images/coins/${currency?.symbol ?? 'token'}.png`, getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency?.symbol === 'BNB') {
    return <StyledEthereumLogo src={BNBLogo} size={size} style={style} />
  }

  if (currency === ETHER) {
    return <StyledEthereumLogo src={chainId && BaseLogo[chainId]} size={size} style={style} />
  }

  return (currency as any)?.symbol ? (
    <CoinLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
  ) : (
    // <FilledHelp height="24px" width="24px" mr="8px" />
    <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
  )
}
