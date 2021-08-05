import { Token } from '@alium-official/sdk'
import { Spinner } from 'alium-uikit/src'
import { BridgeMoreIcon } from 'images/bridge/BridgeMoreIcon'
import React, { FC, useState } from 'react'
import { BridgeNetworks } from 'store/bridge/types'
import { networkFinder, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import DropdownBridgeNetworks from '../DropdownBridgeNetworks'
import BridgeScan from '../Popups/BridgeScan'

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
      @media screen and (max-width: 768px) {
        margin-right: 9px;
      }
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
  value: string
  token: Token
  balanceLoading: boolean
}

const BridgeNetwork: FC<Props> = ({ type, value, token, balanceLoading }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const chainId = useStoreBridge((state) => state[type])
  const network = networkFinder(chainId)
  const Icon = network?.icon
  const onShow = () => {
    setModalOpen(true)
  }

  return (
    <Network>
      {balanceLoading && <Spinner />}
      {modalOpen && <BridgeScan type={type} modalOpen={modalOpen} setModalOpen={setModalOpen} />}
      <div className='left-column'>
        <div className='network'>
          {Icon ? <Icon /> : <img />}
          <p className='title'>{network?.label}</p>
          <DropdownBridgeNetworks type={type} />
        </div>
        <div className='token'>
          {value || 0} {token?.symbol}
        </div>
      </div>
      <div className='right-column'>
        <div onClick={onShow}>
          <BridgeMoreIcon />
        </div>
      </div>
    </Network>
  )
}

export default BridgeNetwork
