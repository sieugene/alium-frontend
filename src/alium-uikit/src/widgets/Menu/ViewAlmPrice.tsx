import { ChevronRightIcon } from 'alium-uikit/src/components/Svg'
import { externalLinks } from 'alium-uikit/src/config'
import { StyledInternalLink } from 'components/Shared'
import { useTranslation } from 'next-i18next'
import { FC, useEffect, useState } from 'react'
import { fetchTokenPriceFromCoingecko } from 'services/coingecko'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import { getAlmPrice } from 'utils/prices/getAlmPrice'
import { breakpoints, down, up } from 'views/StrongHoldersPool/mq'
import { getCookieOptions } from '../../config/getCookieOptions'
import { IconTokenAlm } from './icons/IconTokenAlm'

const cookies = new Cookies()

interface props {
  ispushed?: boolean
  inPanel?: boolean
}

const ViewAlmPrice: FC<props> = ({ ispushed, inPanel }) => {
  const { t } = useTranslation()
  const [price, setPrice] = useState<null | string>(null)

  useEffect(() => {
    const cookieAlmPrice = getAlmPrice()
    setPrice(cookieAlmPrice ? String(cookieAlmPrice) : null)

    fetchTokenPriceFromCoingecko('alium-swap').then((response) => {
      const price = response?.data?.market_data?.current_price?.usd
      if (price) {
        const fixedPrice = Number(price).toFixed(3)
        setPrice(fixedPrice)
        cookies.set('alm-price', fixedPrice, getCookieOptions())
      }
    })
  }, [])

  if (!price) {
    return null
  }

  return (
    <Styled ispushed={ispushed} inPanel={inPanel}>
      <IconWrapper inPanel={inPanel}>
        <IconTokenAlm />
      </IconWrapper>
      <TextWrapper inPanel={inPanel}>
        <Text>
          {t('ALM Price:')}&nbsp;
          <a style={{ color: '#6C5DD3' }} href={externalLinks.bscscan}>
            ${price}
          </a>
        </Text>
        <BuyALM
          inPanel={inPanel}
          href='https://alium.finance/swap/ETH/0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11'
          target='_blank'
        >
          {t('Buy ALM')}
          <ChevronRightIcon color='currentColor' />
        </BuyALM>
      </TextWrapper>
    </Styled>
  )
}

export default ViewAlmPrice

// styles

const Styled = styled.div<{ ispushed: boolean; inPanel: boolean }>`
  margin-top: ${({ inPanel }) => inPanel && '24px'};
  display: ${({ inPanel }) => (inPanel ? 'flex' : 'none')};
  justify-content: ${({ inPanel }) => !inPanel && 'center'};
  align-items: center;
  transition: all 200ms ease-out;

  @media ${up(breakpoints.sm)} {
    display: ${({ inPanel }) => (inPanel ? 'none' : 'flex')};
  }

  @media ${down(breakpoints.md)} {
    margin-left: ${({ inPanel }) => (inPanel ? '22px' : '24px')};
  }
`

const IconWrapper = styled.div<{ inPanel: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dfefed;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  margin-right: 8px;

  @media ${up(breakpoints.sm)} {
    width: 40px;
    height: 40px;
  }

  @media ${down(breakpoints.md)} {
    display: ${({ inPanel }) => !inPanel && 'none'};
  }
`

const TextWrapper = styled.div<{ inPanel: boolean }>`
  display: flex;
  align-items: ${({ inPanel }) => inPanel && 'center'};
  flex-direction: ${({ inPanel }) => !inPanel && 'column'};
  font-size: 11px;
  line-height: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: #0b1359;

  @media ${up(breakpoints.sm)} {
    font-size: 14px;
    line-height: 20px;
    width: auto;
  }
`

const Text = styled.div`
  font-size: 11px;
  line-height: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: #0b1359;

  @media ${up(breakpoints.md)} {
    font-size: 14px;
    line-height: 20px;
    width: auto;
  }
`

const BuyALM = styled(StyledInternalLink)<{ inPanel: boolean }>`
  display: flex;
  align-items: center;
  margin-left: ${({ inPanel }) => inPanel && '8px'};
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
`
