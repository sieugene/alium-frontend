import { useTranslation, Trans } from 'next-i18next'
import React from 'react'
import styled from 'styled-components'
import MainSlider from './MainSlider'

const md = '768px'
const lg = '1024px'
const xl = '1280px'

const Arrow = () => {
  return (
    <svg width='16' height='40' viewBox='0 0 18 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 1L17 21L1 41' stroke='#D2D6E5' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

const PlayMarket = () => {
  return (
    <svg width='26' height='29' viewBox='0 0 26 29' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M20.1959 18.4796L16.8523 15.1919L4.57776 27.2961L20.1959 18.4796Z' fill='white' />
      <path d='M20.1959 9.53037L4.57776 0.713867L16.8523 12.818L20.1959 9.53037Z' fill='white' />
      <path
        d='M25.0904 15.6669C26.0914 14.8852 26.0914 13.1235 25.0239 12.3419L21.7479 10.4775L18.0928 14.0055L21.7479 17.5335L25.0904 15.6669Z'
        fill='white'
      />
      <path
        d='M1.3732 28.002L15.6462 13.9996L1.3732 0.00311979V0.00195312C0.651037 0.37412 0.16687 1.05195 0.16687 1.93279V26.0711C0.16687 26.952 0.651037 27.6298 1.3732 28.002Z'
        fill='white'
      />
    </svg>
  )
}

const PlayButton = () => {
  return (
    <svg width='64' height='64' viewBox='0 0 65 64' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='0.5' width='64' height='64' rx='32' fill='white' />
      <path d='M27.25 25.25L37.75 32L27.25 38.75V25.25Z' fill='#6C5DD3' />
    </svg>
  )
}

const HomeNew = () => {
  const { t } = useTranslation()

  return (
    <>
      <MainSlider />

      <H1>{t('home.roadMap.title')}</H1>

      <RoadMapContainer>
        <CardContainer>
          <CardLogoFarming />
          <div className='card-content'>
            <div className='title'>{t('home.roadMap.oneTitle')}</div>
            <ExtraButton>{t('home.roadMap.oneButtonText')}</ExtraButton>
          </div>
        </CardContainer>

        <div className='arrow__container'>
          <Arrow />
        </div>

        <CardContainer>
          <CardLogoCross />
          <div className='card-content'>
            <div className='title'>{t('home.roadMap.twoTitle')}</div>
            <ExtraButton>{t('home.roadMap.twoButtonText')}</ExtraButton>
          </div>
        </CardContainer>

        <div className='arrow__container'>
          <Arrow />
        </div>

        <CardContainer>
          <CardLogoAvalanche />
          <div className='card-content'>
            <div className='title'>{t('home.roadMap.threeTitle')}</div>
            <ExtraButton>{t('home.roadMap.threeButtonText')}</ExtraButton>
          </div>
        </CardContainer>
      </RoadMapContainer>

      <BuyAlmContainer>
        <img src='/images/home-new/alm-left.png' alt='Buy alm img' />
        <div>
          <H1>
            <Trans i18nKey='home.buyAliumFinance' components={{ br: <br /> }} />
          </H1>
          <h2>{t('home.aliumFinanceTeamIs')}</h2>

          <ActionButton>
            <a href='https://alium.finance/swap/ETH/0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11' target='_blank'>
              {t('home.buyALM')}
            </a>
          </ActionButton>
        </div>
      </BuyAlmContainer>

      <FooterContainer>
        <a className='overlay' href='https://www.youtube.com/watch?v=9j3M7qz2Z04' target='_blank'>
          <PlayButton />
          <p>{t('home.howItWorks')}</p>
        </a>
        <div className='left'>
          <h1>
            <div className='title'>{t('home.aliumSwapIsAlways')}</div>
          </h1>
          <SocialItem href='https://play.google.com/store/apps/details?id=com.alium.finance' target='_blank'>
            <div className='icon'>
              <PlayMarket />
            </div>
            <div className='info'>
              <p className='title'>{t('home.getItOn')}</p>
              <p className='social'>{t('home.googlePlay')}</p>
            </div>
          </SocialItem>
        </div>
      </FooterContainer>
    </>
  )
}

export default HomeNew

const H1 = styled.h1`
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 28px;
  line-height: 36px;

  font-weight: bold;
  text-align: center;
  letter-spacing: 0.3px;
  color: #0b1359;

  @media screen and (min-width: ${md}) {
    font-size: 32px;
    line-height: 40px;
  }

  @media screen and (min-width: ${xl}) {
    font-size: 40px;
    line-height: 48px;
  }
`

// RoadMapContainer

const RoadMapContainer = styled.div`
  margin-top: 32px;

  .arrow__container {
    display: none;
  }

  @media screen and (min-width: ${md}) {
    display: flex;
    justify-content: space-around;

    .arrow__container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media screen and (min-width: ${xl}) {
    margin-top: 40px;
  }
`

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  .card-content {
    display: flex;
    flex-direction: column;

    .title {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      text-align: left;
      width: 150px;
      color: #0b1359;
      margin: 0 0 16px;
    }
  }

  @media screen and (min-width: ${md}) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: initial;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        text-align: center;
        margin-top: 24px;
      }
    }
  }

  @media screen and (min-width: 1440px) {
    .card-content {
      .title {
        width: 354px;
      }
    }
  }
`

const CardLogo = styled.div`
  margin-right: 24px;
  width: 120px;
  min-width: 120px;
  height: 120px;

  @media screen and (min-width: ${md}) {
    margin-right: initial;
  }
`

const CardLogoFarming = styled(CardLogo)`
  background: url('/images/home-new/farming.svg') no-repeat center/contain;
`

const CardLogoCross = styled(CardLogo)`
  background: url('/images/home-new/cross.svg') no-repeat center/contain;
`

const CardLogoAvalanche = styled(CardLogo)`
  background: url('/images/home-new/avalanche.svg') no-repeat center/contain;
`

const ExtraButton = styled.div`
  white-space: pre;
  background: rgba(255, 114, 172, 0.1);
  border: 1px solid #ff72ac;
  box-sizing: border-box;
  border-radius: 6px;
  height: 28px;
  padding: 8px 12px 8px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #ff72ac;
  width: fit-content;
`

// BuyAlmContainer

const BuyAlmContainer = styled.div`
  background: #ffffff;
  border-radius: 6px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 24px;
  margin-bottom: 32px;

  img {
    width: 306px;
    height: 272px;
  }

  h1 {
    text-align: center;
  }

  h2 {
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-bottom: 24px;
  }

  @media screen and (min-width: ${md}) {
    margin-top: 48px;
    padding: 40px 30px;
    flex-direction: row;

    img {
      width: 322px;
      height: 286.42px;
      margin-right: 16px;
    }

    h1 {
      margin-top: 0;
      text-align: left;
    }

    h2 {
      text-align: left;
    }
  }

  @media screen and (min-width: ${lg}) {
    padding: 40px;
  }

  @media screen and (min-width: ${xl}) {
    padding: 48px 94px 48px 48px;

    img {
      width: 450px;
      height: 400px;
      margin-right: 78px;
    }
  }
`

const ActionButton = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 111px;
  height: 48px;
  background: hsl(248, 57%, 60%);
  border-radius: 6px;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: hsl(0, 0%, 100%);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: hsla(248, 57%, 65%);
  }

  @media screen and (min-width: ${md}) {
    margin: initial;
  }
`

// FooterContainer

const FooterContainer = styled.div`
  position: relative;
  background: url('/images/home-new/mob-image.png') no-repeat, #6c5dd3;
  background-size: cover;
  border-radius: 6px;
  height: 475px;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  padding: 24px 16px;

  .overlay {
    position: absolute;
    height: 64px;
    right: 16px;
    bottom: 98px;

    p {
      display: none;
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      margin-bottom: 26px;
      font-weight: 500;
      font-size: 24px;
      line-height: 30px;
      letter-spacing: 0.3px;
      color: #fff;
      max-width: 222px;
    }
  }

  @media screen and (min-width: ${md}) {
    padding: 24px;
    align-items: center;
    height: 350px;
    background: url('/images/home-new/app-image.png') no-repeat center/cover, #6c5dd3;

    .overlay {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: initial;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      
      svg {
        min-height: 64px;
      }

      p {
        margin-top: 16px;
        display: initial;
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 1px;
        color: #fff;
      }
    
    .left {
      h1 {
        max-width: 277px;
        font-size: 32px;
        line-height: 40px;
      }
    }
  }
`

const SocialItem = styled.a`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  width: fit-content;
  padding: 8px 16px 8px 16px;
  display: flex;

  .icon {
    margin-right: 16px;
  }

  .title {
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 0.3px;
    color: #ffffff;
  }

  .social {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #ffffff;
  }
`
