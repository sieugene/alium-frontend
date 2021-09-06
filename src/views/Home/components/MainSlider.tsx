import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'

interface MainSliderProps {
  className?: string
}

const MainSlider: React.FC<MainSliderProps> = ({ className }) => {
  return (
    <CarouselStyled className={className} dynamicHeight showStatus={false} showThumbs={false} swipeable>
      <Slide />
      <Slide />
    </CarouselStyled>
  )
}

export default MainSlider

const Slide = () => (
  <SlideW>
    <SlideInfoW>
      <Label>Coming soon</Label>
      <SliderTitle>Earn ALM Farming and Strong Holders Pools. Up to 3000% APY</SliderTitle>
    </SlideInfoW>
    <SliderImage />
  </SlideW>
)

const CarouselStyled = styled(Carousel)`
  .control-dots {
    display: none;
  }
  .control-arrow {
    display: none;
  }
  .carousel-status {
    display: none;
  }
`

const SlideW = styled.div`
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
`

const SlideInfoW = styled.div`
  width: 100%;
  padding: 24px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 50%;
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
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 40px;
    line-height: 48px;
  }
`

const SliderImage = styled.div`
  width: 100%;
  padding-bottom: 80%;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    display: block;
    background-image: url('/images/home-new/slider/farming-bg.svg');
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
    padding-bottom: 44%;
  }
`
