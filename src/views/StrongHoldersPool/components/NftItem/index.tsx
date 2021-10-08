import styled from 'styled-components'

export default function NftItem() {
  return <NftItem.Root src='/images/shp/nft.png' />
}

NftItem.Root = styled.img`
  max-height: 100%;
  max-width: 100%;
`
