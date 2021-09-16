import { Button, LinkIcon, Modal } from 'alium-uikit/src'
import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { getExplorerLink } from 'utils'
import { useLpTokenPrice } from 'views/farms/hooks/useFarmingPools'
import useRoiCalculatorReducer from 'views/farms/hooks/useRoiCalculator'
import { breakpoints, down } from 'views/StrongHoldersPool/mq'
import { InfoAPRProps, useFarmLpAddress } from '../Info'

const Wrapper = styled.div`
  width: 486px;
  height: auto;
  @media ${down(breakpoints.sm)} {
    width: auto;
    max-width: 360px;
  }
`

const Main = styled.div`
  background: url(/images/farms/bg/roibg.png);
  height: 208px;
  width: 100%;
  background-repeat: no-repeat;
  padding: 32px 24px;
`

const StyleRoiTable = styled.div`
  display: flex;
  justify-content: space-between;
`

const Footer = styled.div`
  padding: 16px 22px 24px 22px;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
`

const StyledButton = styled(Button)`
  margin-top: 16px;
  width: 219px;
  svg {
    margin-right: 16px;
    height: 24px;
    width: 24px;
  }
  &:hover {
    svg {
      path {
        fill: transparent;
      }
      stroke: white;
    }
  }
`

type RoiTable = {
  day: string
  roi: string
  per: number
}[]

const RoiModal: FC<InfoAPRProps & { onDismiss?: any }> = ({ farm, onDismiss, almPrice }) => {
  const lpPrice = useLpTokenPrice(farm?.lpSymbol)
  const { apr } = farm
  const stakingTokenPrice = lpPrice?.toNumber()
  const earningTokenPrice = almPrice?.toNumber()
  const autoCompoundFrequency = 0
  const performanceFee = 0
  const { state: calculatorState, setPrincipalFromUSDValue } = useRoiCalculatorReducer(
    stakingTokenPrice,
    earningTokenPrice,
    apr,
    autoCompoundFrequency,
    performanceFee,
  )
  useEffect(() => {
    setPrincipalFromUSDValue('1000')
  }, [farm])

  const { roiTokensAllDuration } = calculatorState.data
  const per = {
    year: roiTokensAllDuration[3] || 0,
    month: roiTokensAllDuration[2] || 0,
    week: roiTokensAllDuration[1] || 0,
    day: roiTokensAllDuration[0] || 0,
  }

  const roiTables: RoiTable = [
    { day: '1 d', roi: '0.61%', per: per.day },
    { day: '7 d', roi: '4.33%', per: per.week },
    { day: '30 d', roi: '19.92%', per: per.month },
    { day: '365 d (APY)', roi: `${farm?.apy}%`, per: per.year },
  ]
  const link = getExplorerLink(97, useFarmLpAddress(farm), 'address')
  const tokenName = farm.lpSymbol

  return (
    <Modal title='ROI' withoutContentWrapper onDismiss={onDismiss}>
      <Wrapper>
        <Main>
          <StyleRoiTable>
            <RoiRow table={roiTables} type='day' title='Timeframe' />
            <RoiRow table={roiTables} type='roi' title='ROI' />
            <RoiRow table={roiTables} type='per' title='Alium per $1000' />
          </StyleRoiTable>
        </Main>
        <Footer>
          <p>
            Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience
            only, and by no means represent guaranteed returns.
          </p>
          <a href={link} target='_blank'>
            <StyledButton variant='secondary'>
              <LinkIcon />
              <h3>Get {tokenName}</h3>
            </StyledButton>
          </a>
        </Footer>
      </Wrapper>
    </Modal>
  )
}

const Row = styled.div`
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: #cbc8ee;
    margin-bottom: 16px;
  }
  .item-roi {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: #ffffff;
    margin-bottom: 8px;
  }
`
interface RowProps {
  table: RoiTable
  type: keyof RoiTable[0]
  title: string
}
const RoiRow: FC<RowProps> = ({ table, type, title }) => {
  return (
    <Row>
      <h2 className='title-roi'>{title}</h2>
      {table.map((tab, index) => {
        return (
          <div className='item-roi' key={index}>
            {tab[type]}
          </div>
        )
      })}
    </Row>
  )
}

export default RoiModal
