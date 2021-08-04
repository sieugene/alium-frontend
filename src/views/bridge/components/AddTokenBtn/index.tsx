import { BridgeCheckIcon } from 'images/bridge/BridgeCheckIcon'
import React from 'react'
import styled from 'styled-components'
import BridgeBtnWithIcon from '../BridgeBtnWithIcon'

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

const AddTokenBtn = () => {
  const [added, setAdded] = React.useState(false)
  const onAdd = () => {
    if (!added) {
      setAdded(true)
    }
  }
  return (
    <StyledBtn onClick={onAdd} variant='secondary' active={added}>
      {added ? <BridgeCheckIcon /> : <Coin />}
      <p className='text'>{added ? 'Added' : 'Add token to wallet'}</p>
    </StyledBtn>
  )
}
const Coin = () => {
  return (
    <svg width='21' height='23' viewBox='0 0 21 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13.8256 1.68448L17.656 3.89596C20.8318 5.72948 21.19 11.0545 18.4561 15.7898C15.7222 20.525 10.9314 22.8773 7.75569 21.0438L3.92529 18.8323'
        stroke='#6C5DD3'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        opacity='0.5'
        d='M20.1802 8.49721L16.5405 6.39584'
        stroke='#6C5DD3'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path opacity='0.5' d='M17.4293 16.855L13.709 14.7071' stroke='#6C5DD3' strokeWidth='1.2' strokeLinecap='round' />
      <path
        opacity='0.5'
        d='M19.829 11.6101L16.5801 9.73438'
        stroke='#6C5DD3'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        opacity='0.5'
        d='M15.5223 19.069L12.2734 17.1932'
        stroke='#6C5DD3'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        opacity='0.5'
        d='M18.8649 14.3685L15.1445 12.2205'
        stroke='#6C5DD3'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        opacity='0.5'
        d='M13.0025 20.9295L9.36279 18.8281'
        stroke='#6C5DD3'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        d='M14.6163 13.5743C13.1888 16.0468 11.2369 17.8733 9.26267 18.8427C7.28425 19.8141 5.35129 19.8999 3.85979 19.0388C2.36829 18.1777 1.4761 16.4608 1.32818 14.2617C1.18057 12.0673 1.78638 9.46365 3.21388 6.99115C4.64138 4.51865 6.59329 2.69218 8.56752 1.7228C10.5459 0.751368 12.4789 0.665589 13.9704 1.52671C15.4619 2.38782 16.3541 4.1047 16.502 6.30378C16.6496 8.49821 16.0438 11.1018 14.6163 13.5743Z'
        stroke='#6C5DD3'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
      <path
        opacity='0.5'
        d='M12.1227 12.1327C11.1767 13.7712 9.93554 14.9989 8.72187 15.6732C7.49597 16.3543 6.40175 16.4245 5.62711 15.9772C4.85247 15.53 4.36615 14.5473 4.34303 13.1451C4.32014 11.7569 4.76279 10.0681 5.70877 8.42965C6.65475 6.79116 7.8959 5.56346 9.10956 4.88919C10.3355 4.2081 11.4297 4.13791 12.2043 4.58515C12.979 5.03239 13.4653 6.0151 13.4884 7.41731C13.5113 8.80551 13.0686 10.4942 12.1227 12.1327Z'
        stroke='#6C5DD3'
        strokeWidth='1.2'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default AddTokenBtn
