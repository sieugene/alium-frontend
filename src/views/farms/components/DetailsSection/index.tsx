import { ChevronDownIcon, Skeleton } from 'alium-uikit/src'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div<{ open: boolean }>`
  padding: 0px 16px 24px 16px;
  position: absolute;
  width: 100%;
  left: 0;
  background: #ffffff;
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  border-radius: 6px;
  z-index: 9;
  .hide {
    width: fit-content;
    margin-top: 8px;
    float: right;
    cursor: pointer;
  }
  height: ${(props) => (props.open ? '240px' : '0px')};
  bottom: ${(props) => (props.open ? '-233px;' : '0')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: 0.3s all ease;
  overflow: hidden;
`
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 32px;
  align-items: center;
  .title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
  .field {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
  a {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    color: #6c5dd3;
    border-bottom: 1px solid #6c5dd3;
    padding-bottom: 4px;
  }
`

const DetailsLabel = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  infoAddress,
  removed,
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
}) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const toggle = () => {
    setOpen(!open)
  }

  return (
    <>
      {!open && (
        <DetailsLabel onClick={toggle}>
          <p>Details</p>
          <ChevronDownIcon />
        </DetailsLabel>
      )}
      <Wrapper open={open}>
        {open && (
          <>
            <Info>
              <div className='title'>Deposit:</div>
              <div className='field'>{lpLabel}</div>
            </Info>
            <Info>
              <div className='title'>Total Liquidity</div>
              <div className='field'>
                {totalValueFormatted ? <p>{totalValueFormatted}</p> : <Skeleton width={75} height={25} />}
              </div>
            </Info>
            <Info>
              <div className='title'>Deposit fee</div>
              <div className='field'>0%</div>
            </Info>
            <Info>
              <div className='title'>LP Type</div>
              <div className='field'>Alium LP</div>
            </Info>
            <Info>
              <div className='title'>
                <a href={bscScanAddress} target='_blank'>
                  View on BacScan
                </a>
              </div>
            </Info>
            <div className='hide' onClick={toggle}>
              Hide
            </div>
          </>
        )}
      </Wrapper>
    </>
  )
}

export default DetailsSection
