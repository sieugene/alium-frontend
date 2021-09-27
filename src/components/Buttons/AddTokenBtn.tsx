import { Token } from '@alium-official/sdk'
import { CheckMarkDoneIcon, CoinLogoIcon } from 'alium-uikit/src'
import { FC } from 'hoist-non-react-statics/node_modules/@types/react'
import React from 'react'
import styled from 'styled-components'
import { getTokenLogoURL } from 'utils/common/getTokenLogoURL'
import { registerToken } from 'utils/wallet'
import BridgeBtnWithIcon from '../../views/bridge/components/BridgeBtnWithIcon'

const StyledBtn = styled(BridgeBtnWithIcon)<{ active: boolean }>`
  margin-top: 24px;
  ${(props) =>
    props.active &&
    `border: 1px solid #1EA76D !important;
 	 color: #1EA76D !important; 
	 &:hover,&:active{
		background: transparent !important;
		p {
		 color: #1EA76D !important; 
		}
		color: #1EA76D !important; 
	 }
  `}
`
interface Props {
  token: Token
}
const AddTokenBtn: FC<Props> = ({ token }) => {
  const tokenImage = getTokenLogoURL(token?.address, token?.symbol)
  const [added, setAdded] = React.useState(false)
  const onAdd = async () => {
    if (!added && token) {
      try {
        await registerToken(token.address, token.symbol, token.decimals, tokenImage)
        setAdded(true)
      } catch (error) {}
    } else {
      setAdded(true)
    }
  }

  if (!token?.address) {
    return <></>
  }
  return (
    <StyledBtn onClick={onAdd} variant='secondary' active={added}>
      {added ? <CheckMarkDoneIcon /> : <CoinLogoIcon />}
      <p className='text'>{added ? 'Added' : 'Add token to wallet'}</p>
    </StyledBtn>
  )
}

export default AddTokenBtn
