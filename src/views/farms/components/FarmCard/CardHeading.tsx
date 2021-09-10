import { Skeleton } from 'alium-uikit/src'
import CurrencyLogo from 'components/CurrencyLogo'
import React from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/farms/farms.types'
import { useFarmsLoading } from 'views/farms/hooks/useFarmingPools'
import { useFarmLpLabel } from '../Info'

export interface CardHeadingProps {
  farm: FarmWithStakedValue
}

const Wrapper = styled.div`
  background-size: contain;
  background: url(/images/farms/cards/farm_card_1.png), linear-gradient(180deg, #4334a6 -3.7%, #8677f0 103.7%);
  background-repeat: no-repeat;
  border-radius: 6px;
  width: 100%;
  height: 116px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0px 24px 0px 20px;
  align-items: center;
`

const Info = styled.div`
  .label {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.3px;

    color: #ffffff;
  }
`

const Tags = styled.div`
  display: flex;
`

const Core = styled.div`
  margin-right: 4px;
  background: rgba(41, 217, 143, 0.3);
  border: 1px solid #29d98f;
  box-sizing: border-box;
  border-radius: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #29d98f;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 3px 8px 3px 3px;
  span {
    margin-right: 6px;
    width: 24px;
    height: 24px;
    left: 3px;
    top: 3px;
    background: #29d98f;
    border-radius: 14px;
    display: block;
  }
`
const Multiplier = styled.div`
  background: rgba(255, 161, 0, 0.3);
  border: 1px solid #ffa100;
  box-sizing: border-box;
  border-radius: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #ffa100;
  padding: 8px 10px 8px 10px;
  width: fit-content;
  min-width: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const DoubleLogo = styled.div`
  display: flex;
`

const WrapMainLogo = styled.div`
  position: relative;
  z-index: 1;
`
const WrapSecondLogo = styled.div`
  position: relative;
  z-index: 0;
  right: 20px;
`

const MultiplierSkeleton = styled(Skeleton)`
  border-radius: 16px;
`

const CardHeading: React.FC<CardHeadingProps> = ({ farm }) => {
  const loading = useFarmsLoading()
  return (
    <Wrapper>
      <div className='icons'>
        <DoubleLogo>
          <WrapMainLogo>
            <CurrencyLogo size='48px' currency={farm.token} />
          </WrapMainLogo>
          <WrapSecondLogo>
            <CurrencyLogo size='48px' currency={farm.quoteToken} />
          </WrapSecondLogo>
        </DoubleLogo>
      </div>
      <Info>
        <div className='label'>{useFarmLpLabel(farm).split(' ')[0]}</div>
        <Tags>
          <Core>
            <span />
            {farm.isCommunity ? 'Community' : 'Core'}
          </Core>
          {loading ? <MultiplierSkeleton width='41px' height='32px' /> : <Multiplier>{farm.multiplier}</Multiplier>}
        </Tags>
      </Info>
    </Wrapper>
  )
}

export default CardHeading
