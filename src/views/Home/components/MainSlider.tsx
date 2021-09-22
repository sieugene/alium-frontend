import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useMedia } from 'react-use'
import styled, { css } from 'styled-components'

interface MainSliderProps {
  className?: string
}

// sm =  375
// md = 768
// ld = 1024
// xl = 1440

const CarouselStyled = styled(Carousel)`
  .carousel-status {
    display: none;
  }
  .control-dots {
    position: absolute;
    bottom: 35px;
    left: 81px;
    width: fit-content;
    display: flex;
    margin: 0;
  }

  @media screen and (max-width: 575px) {
    .control-dots {
      position: absolute;
      top: 43%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media screen and (max-width: 395px) {
    .control-dots {
      top: 57%;
    }
  }
`

const ArrowItem = styled.div<{ type: 'next' | 'prev' }>`
  position: absolute;
  bottom: 24px;
  left: ${({ type }) => (type === 'next' ? '167px' : '40px')};
  z-index: 99;
  cursor: pointer;
  svg {
    ${({ type }) =>
      type === 'next' &&
      `transform: rotate(
180deg);`}
  }
  outline: none;
  @media screen and (max-width: 575px) {
    position: absolute;
    top: 43%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    left: ${({ type }) => (type === 'next' ? '70%' : '26%')};
  }
  @media screen and (max-width: 395px) {
    top: 57%;
  }
`
const Indicator = styled.div<{ isSelected: boolean }>`
  background: #ffffff;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 12px;
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  cursor: pointer;
`

const MainSlider: React.FC<MainSliderProps> = ({ className }) => {
  const isMobile = useMedia(`screen and (min-width: 575px)`)
  const slides = [
    {
      label: 'Coming soon',
      title: (
        <>
          Earn ALM Farming <br className='md lg' /> and <br className='sm xl' /> Strong Holders <br className='md lg' />{' '}
          Pools. <br className='xl sm' /> Up to 3000% <br className='md lg' /> APY
        </>
      ),
      image: !isMobile ? '/images/home-new/slider/farming-bg.svg' : '/images/home-new/slider/farming-bg-small.svg',
    },
    {
      label: 'Coming soon',
      title: (
        <>
          "Cyber City Inc" <br className='xl sm md lg' /> Character Boxes Drop
        </>
      ),
      subTitle: (
        <>
          NFT Game with open economy and <br className='md lg' /> 10 000 <br className='sm' /> cool and exciting{' '}
          <br className='xl' /> Cyberpunk <br className='md lg' /> NFT Characters
        </>
      ),
      image: '/images/home-new/slider/cyper-city-bg.svg',
    },
    {
      label: 'September 9th',
      title: 'Alpaca Grazing Range',
      subTitle: (
        <>
          Earn ALM in an exciting Alium <br className='md lg' /> partnership with <br className='sm' /> Alpaca Finance
        </>
      ),
      image: '/images/home-new/slider/alpaca-grazing-bg.svg',
    },
    {
      label: 'September 13th',
      title: 'ALM x Krystal Trading Competition',
      subTitle: (
        <>
          Participate in Krystal.app Alium <br className='md lg' /> Trading <br className='sm' /> competition{' '}
          <br className='xl' /> and win one <br className='md lg' /> of 20 000$ worth <br className='sm' /> of Prizes!
        </>
      ),
      image: '/images/home-new/slider/krystal-trading.svg',
    },
  ]
  return (
    <CarouselStyled
      className={className}
      dynamicHeight
      showStatus={false}
      showThumbs={false}
      swipeable
      autoPlay
      infiniteLoop
      interval={10000}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <ArrowItem onClick={onClickHandler} type='prev'>
          <Arrow />
        </ArrowItem>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <ArrowItem onClick={onClickHandler} type='next'>
          <Arrow />
        </ArrowItem>
      )}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        return (
          <Indicator
            isSelected={isSelected}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            key={index}
            role='button'
            tabIndex={0}
            title={`${label} ${index + 1}`}
            aria-label={`${label} ${index + 1}`}
          />
        )
      }}
    >
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
    background-position: right 2px;
    background-size: contain;
    ${({ bgImage }) => css`
      background-image: url('${bgImage}');
    `}
    @media screen and (max-width: 700px) {
      background-position-y: calc(100% + 2px);
    }
  }
`

const SlideInfoW = styled.div`
  width: 100%;
  padding: 24px;
  z-index: 2;
  & br {
    display: none;
  }
  & br.sm {
    display: block;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 60%;
    text-align: left;
  }

  @media screen and (min-width: 768px) {
    padding: 32px 24px;
    & br.sm {
      display: none;
    }
    & br.md {
      display: block;
    }
  }

  @media screen and (min-width: 1024px) {
    padding: 32px 32px;
    & br.md {
      display: none;
    }
    & br.lg {
      display: block;
    }
  }
  @media screen and (min-width: 1440px) {
    padding: 70px 40px;
    & br.lg {
      display: none;
    }
    & br.xl {
      display: block;
    }
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

// Icons

const Arrow = () => {
  return (
    <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.5001 17.998L9.50012 12.9944L14.5001 7.99805'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
