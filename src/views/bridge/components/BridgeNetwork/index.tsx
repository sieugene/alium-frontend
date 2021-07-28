import { useAlmToken } from 'hooks/useAlm'
import { BridgeMoreIcon } from 'images/bridge/BridgeMoreIcon'
import React, { FC } from 'react'
import { BridgeNetworks } from 'store/bridge/types'
import { networkFinder, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import DropdownBridgeNetworks from '../DropdownBridgeNetworks'

const Network = styled.div`
  width: 100%;
  height: 98px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 18px 34px 24px 16px;
  border: 1px solid #f5f7ff;
  box-sizing: border-box;
  box-shadow: 0px 6px 8px rgba(220, 224, 244, 0.56);
  border-radius: 6px;
  margin-top: 24px;
  margin-bottom: 24px;
  .network {
    display: flex;
    align-items: center;
    .title {
      padding-left: 9px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.1px;
      color: #0b1359;
      margin-right: 27px;
    }

    padding-bottom: 10px;
  }
  .token {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.3px;
    color: #0b1359;
  }
  .right-column {
    display: flex;
    align-items: center;
    svg {
      cursor: pointer;
      transition: 0.3s all ease;
      &:hover {
        opacity: 0.5;
      }
    }
  }
`
interface Props {
  type: BridgeNetworks
}

const BridgeNetwork: FC<Props> = ({ type }) => {
  const token = useAlmToken()
  const chainId = useStoreBridge((state) => state[type])
  const network = networkFinder(chainId)
  const Icon = network?.icon
  return (
    <Network>
      <div className='left-column'>
        <div className='network'>
          {Icon ? <Icon /> : <img />}
          <p className='title'>{network?.title}</p>
          <DropdownBridgeNetworks type={type} />
        </div>
        <div className='token'>0 {token?.symbol}</div>
      </div>
      <div className='right-column'>
        <BridgeMoreIcon />
      </div>
    </Network>
  )
}

export default BridgeNetwork
