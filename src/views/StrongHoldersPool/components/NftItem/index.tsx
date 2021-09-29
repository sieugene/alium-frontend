import styled from 'styled-components'
import { NftReward } from 'views/StrongHoldersPool/hooks'

export interface NftItemProps {
  tokenId: NftReward['tokenId']
}

export default function NftItem({ tokenId }: NftItemProps) {
  return <NftItem.Root src={`/images/shp/nft.png?=tokenId=${tokenId}`} />
}

NftItem.Root = styled.img`
  max-height: 100%;
  max-width: 100%;
`
