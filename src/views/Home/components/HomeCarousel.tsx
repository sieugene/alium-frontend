import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'

const ContainerSlider = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    margin-top: 8px;
    flex-direction: column-reverse;
  }
`

const Arrow = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 30px;
  cursor: pointer;
`
const Left = styled(Arrow)`
  right: 23px;
`

const Right = styled(Arrow)`
  left: 23px;
`

const Wrapper = styled.div``

const HomeCarousel = () => {
  return (
    <ContainerSlider>
      <Carousel
        dynamicHeight
        autoPlay
        showStatus={false}
        showThumbs={false}
        swipeable
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <Right onClick={onClickHandler}>
              <ChevronLeft />
            </Right>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <Left onClick={onClickHandler}>
              <ChevronRight />
            </Left>
          )
        }
      >
        <Wrapper>
          <img src='/images/home-new/slider-banner.png' />
        </Wrapper>
        <Wrapper>
          <img src='/images/home-new/slider-banner.png' />
        </Wrapper>
        <Wrapper>
          <img src='/images/home-new/slider-banner.png' />
        </Wrapper>
      </Carousel>
    </ContainerSlider>
  )
}

const ChevronLeft = () => {
  return (
    <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M6.50012 11L1.50012 5.99638L6.50012 1'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
const ChevronRight = () => {
  return (
    <svg width='8' height='12' viewBox='0 0 8 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.5 1L6.5 6.00362L1.5 11'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default HomeCarousel
