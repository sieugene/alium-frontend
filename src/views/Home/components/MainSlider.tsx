import { Button } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useMedia } from 'react-use'
import styled from 'styled-components'

const md = '768px'
const lg = '1024px'
const xl = '1280px'

interface IMainSliderProps {
  className?: string
}

interface ISlide {
  label: string
  title: React.ReactNode
  image: string
  subTitle?: React.ReactNode
  active?: boolean
}

// MainSlider

const MainSlider: React.FC<IMainSliderProps> = ({ className }) => {
  const { t } = useTranslation()
  const isNotMobile = useMedia(`screen and (min-width: ${md})`)
  const slides: ISlide[] = [
    {
      label: t('Live'),
      active: true,
      title: t('Earn ALM Farming and Strong Holders Pools. Up to 3000% APY'),
      image: isNotMobile ? '/images/home-new/slider/farming-bg.svg' : '/images/home-new/slider/farming-bg-small.svg',
    },
    {
      label: t('Coming soon'),
      title: t('"Cyber City Inc" Character Boxes Drop'),
      subTitle: t('NFT Game with open economy and 10 000 cool and exciting Cyberpunk NFT Characters'),
      image: '/images/home-new/slider/cyper-city-bg.svg',
    },
    {
      label: t('September 9th'),
      title: t('Alpaca Grazing Range'),
      subTitle: t('Earn ALM in an exciting Alium partnership with Alpaca Finance'),
      image: '/images/home-new/slider/alpaca-grazing-bg.svg',
    },
    {
      label: t('September 13th'),
      title: t('ALM x Krystal Trading Competition'),
      subTitle: t('Participate in Krystal.app Alium Trading competition and win one of 20 000$ worth of Prizes!'),
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
      renderArrowPrev={(onClickHandler) => (
        <ArrowItem onClick={onClickHandler} type='prev'>
          <Arrow />
        </ArrowItem>
      )}
      renderArrowNext={(onClickHandler) => (
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

const CarouselStyled = styled(Carousel)`
  margin-bottom: 32px;

  .control-dots {
    position: absolute;
    top: 240px;
    left: 50%;
    transform: translate(-50%, -50%);

    width: fit-content;
    display: flex;
    margin: 0;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: ${md}) {
    margin-bottom: 48px;

    .control-dots {
      transform: initial;
      top: initial;
      bottom: 32px;
      left: 57px;
    }
  }

  @media screen and (min-width: ${lg}) {
    .control-dots {
      left: 67px;
    }
  }

  @media screen and (min-width: ${xl}) {
    .control-dots {
      left: 80px;
    }
  }
`

const ArrowItem = styled.div<{ type: 'next' | 'prev' }>`
  position: absolute;
  top: 240px;
  left: ${({ type }) => (type === 'next' ? 'calc(50% + 60px)' : 'calc(50% - 60px)')};
  transform: translate(-50%, -50%);
  z-index: 99;

  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;

  svg {
    ${({ type }) => type === 'next' && `transform: rotate(180deg);`}
  }

  @media screen and (min-width: ${md}) {
    transform: initial;
    top: initial;
    bottom: 24px;
    left: ${({ type }) => (type === 'next' ? '141px' : '17px')};
  }

  @media screen and (min-width: ${lg}) {
    left: ${({ type }) => (type === 'next' ? '151px' : '27px')};
  }

  @media screen and (min-width: ${xl}) {
    left: ${({ type }) => (type === 'next' ? '164px' : '40px')};
  }
`

const Indicator = styled.div<{ isSelected: boolean }>`
  background: #ffffff;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: ${(props) => (props.isSelected ? 1 : 0.4)};
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 12px;
  }
`

export default MainSlider

// Slide

const Slide = (props: ISlide) => {
  const LabelType = props.active ? LabelGreen : Label
  return (
    <SlideW bgImage={props.image}>
      <SlideInfoW>
        {props.label && <LabelType>{props.label}</LabelType>}
        <SliderTitle>{props.title}</SliderTitle>
        <SliderSubtitle>{props.subTitle}</SliderSubtitle>
      </SlideInfoW>
    </SlideW>
  )
}

const SlideW = styled.div<{ bgImage: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 500px;
  background-color: #6c5dd3;
  border-radius: 6px;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: -1px;
    right: 0;
    left: 0;
    width: 356px;
    min-height: 246px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: ${({ bgImage }) => `url('${bgImage}')`};
    background-position: center bottom;
  }

  @media screen and (min-width: ${md}) {
    min-height: 280px;

    &:after {
      width: 100%;
      height: initial;
      margin: initial;
      top: 0;
      right: 0;
      bottom: 0;
      background-position: right 2px;
    }
  }

  @media screen and (min-width: ${xl}) {
    min-height: 380px;
  }
`

const SlideInfoW = styled.div`
  width: 100%;
  padding: 24px;
  z-index: 2;

  @media screen and (min-width: ${md}) {
    width: 264px;
    padding: 32px 0 32px 24px;
    text-align: left;
  }

  @media screen and (min-width: ${lg}) {
    width: 274px;
    padding: 32px 0 32px 32px;
  }

  @media screen and (min-width: ${xl}) {
    width: 460px;
    padding: 70px 0 70px 40px;
  }
`

const Label = styled(Button).attrs({ variant: 'extraRed' })`
  display: inline-block;
  padding: 6px 12px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  margin-bottom: 16px;
  height: auto;
  width: fit-content;
`

const LabelGreen: any = styled(Label).attrs({ variant: 'extraGreen' })`
  background: #e5f8f00d;
`

const SliderTitle = styled.h2`
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  letter-spacing: 0.3px;
  color: #ffffff;
  margin-bottom: 8px;

  @media screen and (min-width: ${md}) {
    font-size: 24px;
    line-height: 30px;
  }

  @media screen and (min-width: ${xl}) {
    font-size: 40px;
    line-height: 48px;
  }
`

const SliderSubtitle = styled.span`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #ffffff;
`

// Arrow

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
