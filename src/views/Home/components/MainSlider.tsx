import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled, { css } from 'styled-components'

interface MainSliderProps {
  className?: string
}

const slides = [
  {
    label: 'Coming soon',
    title: 'Earn ALM Farming and Strong Holders Pools. Up to 3000% APY',
    image: '/images/home-new/slider/farming-bg.svg',
  },
  {
    label: 'Coming soon',
    title: '“Cyber City Inc" Character Boxes Drop',
    subTitle: 'NFT Game with open economy and 10 000 cool and exciting Cyberpunk NFT Characters',
    image: '/images/home-new/slider/cyper-city-bg.svg',
  },
  {
    label: 'September 9th',
    title: 'Alpaca Grazing Range',
    subTitle: 'Earn ALM in an exciting Alium partnership with Alpaca Finance',
    image: '/images/home-new/slider/alpaca-grazing-bg.svg',
  },
  {
    label: 'September 13th',
    title: 'ALM x Krystal Trading Competition',
    subTitle: 'Participate in Krystal.app Alium Trading competition and win one of 20 000$ worth of Prizes!',
    image: '/images/home-new/slider/farming-bg.svg',
  },
]

const MainSlider: React.FC<MainSliderProps> = ({ className }) => {
  return (
    <CarouselStyled className={className} dynamicHeight showStatus={false} showThumbs={false} swipeable>
      {slides.map((item, key) => (
        <Slide key={key} {...item} />
      ))}
    </CarouselStyled>
  )
}

export default MainSlider

const Slide = (props: typeof slides[0]) => (
  <SlideW bgImage={props.image}>
    <SlideInfoW>
      {props.label && <Label>{props.label}</Label>}
      <SliderTitle>{props.title}</SliderTitle>
      <SliderSubtitle>{props.subTitle}</SliderSubtitle>
    </SlideInfoW>
  </SlideW>
)

const CarouselStyled = styled(Carousel)`
  .carousel-status {
    display: none;
  }
`

const SlideW = styled.div<{ bgImage: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 500px;
  background-color: #6c5dd3;
  border-radius: 6px;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    min-height: 280px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    min-height: 380px;
  }
  &:after {
    content: '';

    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    background-repeat: no-repeat;
    background-position: right center;
    background-size: contain;
    ${({ bgImage }) => css`
      background-image: url('${bgImage}');
    `}
    @media screen and (max-width: 700px) {
      background-position-y: bottom;
    }
  }
`

const SlideInfoW = styled.div`
  width: 100%;
  padding: 24px;
  z-index: 2;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 60%;
    text-align: left;
  }

  @media screen and (min-width: 768px) {
    padding: 32px 24px;
  }

  @media screen and (min-width: 1024px) {
    padding: 32px 32px;
  }
  @media screen and (min-width: 1440px) {
    padding: 70px 40px;
  }
`

const Label = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(255, 114, 172, 0.1);
  border: 1px solid #ff72ac;
  border-radius: 6px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: #ff72ac;

  margin-bottom: 16px;
`
const SliderTitle = styled.h2`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0.3px;
  color: #ffffff;
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 40px;
    line-height: 48px;
  }
`
const SliderSubtitle = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #ffffff;
`

const SliderImage = styled.div<{ bgSrc: string }>`
  position: absolute;
  width: 100%;
  padding-bottom: 80%;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    display: block;

    ${({ bgSrc }) => css`
      background-image: url('${bgSrc}');
    `}
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 50%;
    padding-bottom: 280px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 50%;
    padding-bottom: 320px;
  }
`
