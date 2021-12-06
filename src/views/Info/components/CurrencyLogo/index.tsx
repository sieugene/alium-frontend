import { getAddress } from '@ethersproject/address'
import { useUpdate } from 'react-use'
import styled from 'styled-components'
import { isAddress } from 'utils'
import defaultIconUrl from './assets/default.svg'

export interface CurrencyLogoProps {
  address: string
}

const BAD_SRCS = {}

export default function CurrencyLogo({ address }: CurrencyLogoProps) {
  const update = useUpdate()
  const validAddress = isAddress(address)
  const src = validAddress
    ? `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${getAddress(address)}/logo.png`
    : defaultIconUrl
  return (
    <CurrencyLogo.Root>
      <img
        src={BAD_SRCS[src] ? defaultIconUrl : src}
        onError={() => {
          if (validAddress) {
            BAD_SRCS[src] = true
          }
          update()
        }}
      />
    </CurrencyLogo.Root>
  )
}

CurrencyLogo.Root = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  padding: 1px;
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`
