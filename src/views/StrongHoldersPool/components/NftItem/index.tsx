import styled from 'styled-components'
import { NftReward } from 'views/StrongHoldersPool/types'

export interface NftItemProps {
  tokenId: NftReward['tokenId']
}

export default function NftItem(_: NftItemProps) {
  return <NftItem.Root src='/images/shp/nft.png' />
}

NftItem.Root = styled.img`
  max-height: 100%;
  max-width: 100%;
`
