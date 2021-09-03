import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'

const ContainerSlider = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    margin-top: 8px
    flex-direction: column-reverse;
    
  }
`

const RoadMapContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .arrow__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 1024px) {
    padding-right: 24px;
    padding-left: 24px;
    max-width: none;
    a {
      width: 49%;
    }
  }
  @media screen and (max-width: 768px) {
    .arrow__container {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    margin-top: 24px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    a {
      width: 100%;
    }
  }

  @media screen and (max-width: 576px) {
    align-items: baseline;
    padding-right: 16px;
    padding-left: 16px;
  }
  @media screen and (max-width: 414px) {
    max-width: none;
    a {
      width: 100%;
    }
  }
`
const BuyAlmContainer = styled.div`
  background: #ffffff;
  border-radius: 6px;
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 55px 80px;
  .marketplace__right {
    max-width: 451px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  margin-bottom: 48px;
  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-bottom: 16px;
  }
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: #8990a5;
    margin-bottom: 32px;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 20px 16px 24px 16px;
    .marketplace__right {
      max-width: 322px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    h1 {
      text-align: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 40px;
      margin: 16px 0px;
      letter-spacing: 0.3px;
    }
    h2 {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: 0.3px;
      margin: 16px 0px;
    }
  }
  @media screen and (max-width: 475px) {
    display: flex;
    flex-direction: column;
    .marketplace__right {
      max-width: 322px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`

const MainBanner = styled.div`
  padding: 40px;
  border-radius: 6px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  background: url(/images/home-new/Illustration-farming.png) no-repeat, #6c5dd3;
  background-position: right;
  height: 320px;
  background-size: contain;

  width: 100%;
  margin: 0 auto 16px auto;
  flex-direction: row;
  @media screen and (max-width: 1440px) {
    background-size: cover;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    margin: 0 auto 0 auto;
  }
  @media screen and (max-width: 475px) {
    display: flex;
    flex-direction: column;
    background-position: right -198px top 154px;
  }
`

const FooterContainer = styled.div`
  position: relative;
  padding: 40px;
  border-radius: 6px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  background: url(/images/home-new/app-image.png) no-repeat, #6c5dd3;
  background-position: right;
  background-size: contain;
  width: 100%;
  height: 350px;
  margin: 0 auto 10px auto;
  flex-direction: row;
  @media screen and (max-width: 1440px) {
    background-size: cover;
    background-position: center;
  }
  @media screen and (max-width: 768px) {
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      h1 {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 40px;
        letter-spacing: 0.3px;
        color: #ffffff;
        max-width: 272px;
      }
    }
  }
  .overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 1px;
      color: #ffffff;
    }
  }
  .left {
    display: flex;

    flex-direction: column;
    justify-content: center;
    h1 {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      line-height: 48px;
      letter-spacing: 0.3px;
      color: #ffffff;
      margin-bottom: 32px;
      max-width: 272px;
    }
  }
  @media screen and (max-width: 475px) {
    background: url(/images/home-new/mob-image.png) no-repeat, #6c5dd3;
    background-size: cover;
    height: 475px;
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    .overlay {
      position: absolute;
      right: 0;
      bottom: 56px;
      top: auto;
      left: auto;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        display: none;
      }
    }
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      h1 {
        margin: 0;
        margin-bottom: 24px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 30px;
        letter-spacing: 0.3px;
        color: #ffffff;
        max-width: 222px;
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
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 0.3px;
    color: #ffffff;
  }
  .social {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #ffffff;
  }
`

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-top: 17px;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto 0 auto;
  }

  h2 {
    margin-top: 24px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    letter-spacing: 0.3px;
    color: #ffffff;
    @media screen and (max-width: 475px) {
      font-size: 28px;
      line-height: 36px;
      text-align: center;
      letter-spacing: 0.3px;
      color: #ffffff;
    }
  }
`

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 430px;
  height: 330px;
  padding-top: 102px;
  padding-left: 0;
  position: relative;
  margin: auto;
  zoom: 0.6;
  @media screen and (min-width: 640px) {
    zoom: 1;
    margin: 0;
    padding: 0;
  }
  @media screen and (min-width: 1320px) {
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    zoom: inherit;
    margin: 0;
    padding: 0;
    height: 150px;
  }
  @media screen and (max-width: 414px) {
    zoom: 0.8;
  }
`

const H1 = styled.h1`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  text-align: center;
  letter-spacing: 0.3px;
  margin-top: 48px;
  margin-bottom: 48px;
  color: #0b1359;
  span {
    margin-left: 8px;
  }
  @media screen and (max-width: 1024px) {
    font-size: 40px;
    line-height: 48px;
    span {
      display: block;
      margin-left: 0;
    }
  }
  @media screen and (max-width: 768px) {
    line-height: 40px;
    margin-top: 16px;
    padding-right: 24px;
    padding-left: 24px;
    span {
      display: inline-block;
      margin-left: 8px;
    }
  }
  @media screen and (max-width: 414px) {
    padding-right: 16px;
    padding-left: 16px;
    font-size: 32px;
  }
  @media screen and (max-width: 350px) {
    font-size: 30px;
  }
  & .title {
    text-align: center;
    width: 400px;
    margin-top: 30px;
    color: #ffffff;
  }
`

const ActionButton = styled.div`
  display: inline-flex;
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
  @media screen and (max-width: 414px) {
    margin-left: 0;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 120px;
  border-radius: 6px;
  margin-bottom: 5px;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 354px;
  .card-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  & .title {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
    font-family: Roboto, sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-bottom: 16px;
  }

  @media screen and (max-width: 768px) {
    margin-right: 60px;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 30px;
    margin-right: 0;
    width: 410px;
    justify-content: flex-start;
    display: flex;
    flex-direction: row;
    .card-content {
      padding-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: baseline;
      .title {
        text-align: left;
        max-width: 190px;
        margin: 0;
        margin-bottom: 16px;
      }
    }
  }
`

const CardFarming = styled(Card)`
  background: url('/images/home-new/farming.svg');
  background-repeat: no-repeat;
  background-position: center;
`
const CardCross = styled(Card)`
  background: url('/images/home-new/cross.svg');
  background-repeat: no-repeat;
  background-position: center;
`

const CardAvalanche = styled(Card)`
  background: url('/images/home-new/avalanche.svg');
  background-repeat: no-repeat;
  background-position: center;
`

const MarketPlace = styled.img`
  width: 384px;
  height: 356px;
  margin-right: 94px;
  @media screen and (max-width: 768px) {
    max-width: 261px;
    max-height: 242px;
    margin-right: 0;
  }
  @media screen and (max-width: 475px) {
    background-size: cover;
  }
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
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #ff72ac;
  width: fit-content;
`

const HomeNew = () => {
  return (
    <>
      <MainBanner>
        <LeftColumn>
          <ExtraButton>September, 2021</ExtraButton>
          <h2>ALM Smart Farming with up to 5,000% APY</h2>
        </LeftColumn>
      </MainBanner>
      <ContainerSlider>
        <Carousel autoPlay showStatus={false} showArrows={false} showThumbs={false} swipeable>
          <div>
            <img src='/images/home-new/slider-banner.png' />
          </div>
          <div>
            <img src='/images/home-new/slider-banner.png' />
          </div>
          <div>
            <img src='/images/home-new/slider-banner.png' />
          </div>
        </Carousel>
      </ContainerSlider>
      <H1>Road Map</H1>
      <RoadMapContainer>
        <CardContainer>
          <CardFarming />
          <div className='card-content'>
            <div className='title'>Farming Launch</div>
            <ExtraButton>September, 2021</ExtraButton>
          </div>
        </CardContainer>
        <div className='arrow__container'>
          <Arrow />
        </div>

        <CardContainer>
          <CardCross />
          <div className='card-content'>
            <div className='title'>Cross-blockhain Swaps </div>
            <ExtraButton>October, 2021</ExtraButton>
          </div>
        </CardContainer>
        <div className='arrow__container'>
          <Arrow />
        </div>
        <CardContainer>
          <CardAvalanche />
          <div className='card-content'>
            <div className='title'>Avalanche & Solana Integration</div>
            <ExtraButton>December, 2021</ExtraButton>
          </div>
        </CardContainer>
      </RoadMapContainer>
      <BuyAlmContainer>
        <MarketPlace src='/images/home-new/alm-left.png' />

        <div className='marketplace__right'>
          <h1>Buy Alium Finance (ALM) token</h1>
          <h2>
            Alium Finance team is on the way to reach several milestones aimed on increasing of ALM token value. Be
            ahead of the market and join the ALM holders community!
          </h2>
          <a href='https://alium.finance/swap/ETH/0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11' target='_blank'>
            <ActionButton>Buy ALM</ActionButton>
          </a>
        </div>
      </BuyAlmContainer>
      <FooterContainer>
        <a className='overlay' href='https://www.youtube.com/watch?v=9j3M7qz2Z04' target='_blank'>
          <PlayButton />
          <p>How it works?</p>
        </a>
        <div className='left'>
          <h1>
            <div className='title'>Alium Swap is always at hand</div>
          </h1>
          <SocialItem href='https://play.google.com/store/apps/details?id=com.alium.finance' target='_blank'>
            <div className='icon'>
              <Playmarket />
            </div>
            <div className='info'>
              <p className='title'>Get it on</p>
              <p className='social'>Google Play</p>
            </div>
          </SocialItem>
        </div>
      </FooterContainer>
    </>
  )
}

const Arrow = () => {
  return (
    <svg width='18' height='42' viewBox='0 0 18 42' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 1L17 21L1 41' stroke='#D2D6E5' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

const Playmarket = () => {
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
    <svg width='81' height='81' viewBox='0 0 81 81' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g filter='url(#filter0_d)'>
        <path
          d='M8.5 34.002C8.5 16.3288 22.8269 2.00195 40.5 2.00195C58.1731 2.00195 72.5 16.3288 72.5 34.002C72.5 51.6751 58.1731 66.002 40.5 66.002C22.8269 66.002 8.5 51.6751 8.5 34.002Z'
          fill='white'
        />
        <path d='M35.25 27.252L45.75 34.002L35.25 40.752V27.252Z' fill='#6C5DD3' />
      </g>
      <defs>
        <filter
          id='filter0_d'
          x='0.5'
          y='0.00195312'
          width='80'
          height='80'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='6' />
          <feGaussianBlur stdDeviation='4' />
          <feColorMatrix type='matrix' values='0 0 0 0 0.8625 0 0 0 0 0.878472 0 0 0 0 0.958333 0 0 0 0.56 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
        </filter>
      </defs>
    </svg>
  )
}

export default HomeNew
