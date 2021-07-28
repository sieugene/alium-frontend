import NFT_COLLECTIBLE_ABI from './collectible.json'
import NFT_ABI from './nft-private-seller.json'

const NFT_PRIVATE_ADDRESS: any = process.env.APP_NFT_PUBLIC_SELLER_ADDRESS
const NFT_COLLECTIBLE_ADDRESS: any = process.env.APP_NFT_COLLECTIBLE_ADDRESS

export { NFT_PRIVATE_ADDRESS, NFT_ABI, NFT_COLLECTIBLE_ADDRESS, NFT_COLLECTIBLE_ABI }
