import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import { getCookieOptions } from '../../config/getCookieOptions'
import { IconTokenAlm } from './icons/IconTokenAlm'

const cookies = new Cookies()

const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 12px;
  transition: all 200ms ease-out;
  opacity: 0;

  &.visible {
    opacity: 1;
  }

  @media screen and (min-width: 968px) {
    &.with-indent {
      margin-left: 180px;
    }
  }
`

const IconWrapper = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  background: #dfefed;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  margin: 0 5px 0 0;

  @media screen and (min-width: 375px) {
    display: flex;
  }

  @media screen and (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 11px;
  line-height: 14px;

  font-family: Roboto, sans-serif;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: #0b1359;
  width: 62px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    font-size: 14px;
    line-height: 20px;
    width: auto;
  }
`

interface props {
  ispushed: boolean
}

const ViewAlmPrice: FC<props> = ({ ispushed }) => {
  const [price, setPrice] = useState<null | string>(null)

  useEffect(() => {
    const cookieAlmPrice = cookies.get('alm-price')
    setPrice(cookieAlmPrice ? String(cookieAlmPrice) : null)

    fetch('https://api.coingecko.com/api/v3/coins/alium-swap')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        const price = response?.market_data?.current_price?.usd
        if (price) {
          const fixedPrice = Number(price).toFixed(3)
          setPrice(fixedPrice)
          cookies.set('alm-price', fixedPrice, getCookieOptions())
        }
      })
  }, [])

  return (
    <Styled className={`${price ? 'visible' : ''} ${ispushed ? 'with-indent' : ''}`}>
      <IconWrapper>
        <IconTokenAlm />
      </IconWrapper>
      <TextWrapper>
        <span>ALM Price:&nbsp;</span>
        <span><a href='https://bscscan.com/address/0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11'>${price}</a></span>
      </TextWrapper>
    </Styled>
  )
}

export default ViewAlmPrice
