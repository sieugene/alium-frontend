import { FARM_DESKTOP_MEDIA, FARM_LAPTOP_MEDIA, FARM_MOBILE_MEDIA } from 'constants/layout/farm.layout'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: #dfe4ff;
  border-radius: 6px;
  height: 360px;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: ${FARM_MOBILE_MEDIA}) {
    height: 320px;
  }
`

const Labels = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
  width: 320px;
  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 64px;
    line-height: 72px;
    letter-spacing: 0.3px;
    color: #0b1359;
    padding-bottom: 16px;
  }
  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
  @media screen and (max-width: ${FARM_MOBILE_MEDIA}) {
    width: 100%;
    padding: 0;
    justify-content: center;
    align-items: center;
    height: fit-content;
    padding-top: 24px;
    h1 {
      font-size: 32px;
      line-height: 40px;
    }
    h3 {
      font-size: 16px;
      line-height: 22px;
    }
  }
`

const Backgrounds = styled.div`
  background-size: contain;
  background-image: url(/images/farms/banners/farm-banner.png);
  height: 360px;
  width: 100%;
  max-width: 830px;
  background-repeat: no-repeat;
  background-position: bottom right;
  position: absolute;
  right: 0;
  top: 0;

  @media screen and (max-width: ${FARM_DESKTOP_MEDIA}) {
    background-position: 159px;
  }
  @media screen and (max-width: ${FARM_LAPTOP_MEDIA}) {
    background-size: cover;
  }

  @media screen and (max-width: 375px) {
    background-image: url(/images/farms/banners/farm-banner-small.png);
    background-size: 100% auto;
    background-position: center 55px;
  }
`

const FarmBanner = () => {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Labels>
        <h1>{t('Farms')}</h1>
        <h3>{t('Stake LP tokens to earn')}</h3>
      </Labels>
      <Backgrounds />
    </Wrapper>
  )
}

export default FarmBanner
