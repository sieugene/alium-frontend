import Link from 'next/link'
import styled from 'styled-components'

const Arrow = styled.div`
  padding: 24px 24px 0px 24px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  width: fit-content;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #8990a5;

  svg {
    margin-right: 16px;
  }
`

const BridgeBackItem = () => {
  return (
    <Arrow>
      <Link href='/bridge'>
        <a href='/bridge'>
          <ArrowLeft />
          <p>Back</p>
        </a>
      </Link>
    </Arrow>
  )
}

const ArrowLeft = () => {
  return (
    <svg width='13' height='10' viewBox='0 0 13 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M5 1L1 5L5 9' stroke='#8990A5' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M1 5L11.3291 5' stroke='#8990A5' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

export default BridgeBackItem
