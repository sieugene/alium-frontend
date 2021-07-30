import { getConnectorId } from 'alium-uikit/src/util/connectorId/getConnectorId'
import { FC, useEffect, useState } from 'react'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { ArrowDropDownIcon, ArrowDropUpIcon } from '../../components/Svg'
import { networksDev, networksProd } from '../WalletModal/config'
import { FailureNetwork } from '../WalletModal/icons/FailureNetwork'
import { NetworksConfig } from '../WalletModal/types'

const MOBILE_SCREEN = '630px'

const StyledDropDown = styled.div<{ hasError: boolean }>`
  width: 232px;
  border: 1px solid ${(props) => (props.hasError ? 'transparent' : '#6c5dd3')};
  box-sizing: border-box;
  border-radius: 6px;
  height: 48px;
  position: relative;
  cursor: pointer;
  margin-right: 24px;
  background: ${(props) => (props.hasError ? '#FF4D00' : 'transparent;')};
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
  > svg * {
    transition: stroke 200ms ease-in-out;
  }
  :hover {
    background-color: ${(props) => (props.hasError ? '#ff4d00cf' : '#6c5dd3;')};
    > * {
      color: white;
    }
    > svg * {
      stroke: white;
    }
  }

  > svg {
    fill: ${(props) => (props.hasError ? '#fff' : '#6c5dd3;')};
    path {
      stroke: ${(props) => (props.hasError ? '#fff' : '#6c5dd3;')};
    }
    position: absolute;
    right: 23px;
    top: 18px;
  }
  @media screen and (max-width: ${MOBILE_SCREEN}) {
    margin-right: 6px;
    width: 40px;
    height: 40px;
    display: flex;
    > svg {
      display: none;
    }
  }
`

const StyledDropDownMessage = styled.p`
  position: absolute;
  padding-left: 47px;
  margin-top: 28px;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  letter-spacing: 0.3px;
  color: #ffffff;
  @media screen and (max-width: ${MOBILE_SCREEN}) {
    display: none;
  }
`

const StyledSelectedOption = styled.p`
  position: absolute;
  padding-left: 47px;
  margin-top: 15px;
  letter-spacing: 0.3px;
  color: #6c5dd3;
  font-size: 14px;

  @media screen and (max-width: ${MOBILE_SCREEN}) {
    display: none;
  }
`
const StyledSelectedOptionError = styled.p`
  position: absolute;
  padding-left: 47px;
  margin-top: 9px;
  letter-spacing: 0.3px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  @media screen and (max-width: ${MOBILE_SCREEN}) {
    display: none;
  }
`

const StyledOptionsContainer = styled.div`
  box-sizing: border-box;
  border-radius: 6px;
  position: relative;
  margin-top: 48px;
  background: white;
  padding: 2px;
  box-shadow: 0 6px 12px rgba(185, 189, 208, 0.4);
  border-radius: 6px;
  @media screen and (max-width: 790px) {
    position: fixed;
    width: calc(100vw - 54px);
  }
  @media screen and (max-width: ${MOBILE_SCREEN}) {
    position: absolute;
    left: 0;
    width: 180px;
  }
`

const StyledOption = styled.div<{ disabled: boolean }>`
  padding: 12px;
  text-align: left;
  color: ${(props) => (props.disabled ? '#cfd0d5' : '#8990a5')};
  transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'pointer')};
  border-radius: 6px;
  :hover {
    background-color: #f5f7ff;
    color: #0b1359;
  }
`

const StyledIconContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 14px;
  @media screen and (max-width: ${MOBILE_SCREEN}) {
    margin: auto;
    position: initial;
    width: 24px;
    height: 24px;
  }
`
interface Props {
  chainId?: number | null
}
const NetworkSwitch: FC<Props> = () => {
  const setChainId = useStoreNetwork((state) => state.setChainId)
  const currentChainId = useStoreNetwork((state) => state.currentChainId)
  const connectIsFailed = useStoreNetwork((state) => state.connectIsFailed)
  const hasError = Boolean(connectIsFailed)
  const [showOptions, setShowOptions] = useState(false)

  const isDev = process.env.APP_ENV === 'development'

  const networks = isDev ? networksDev : networksProd
  const networkExist = networks.find((x) => x.chainId === currentChainId)
  const { icon: Icon, label } = networkExist ?? networks[0]

  const [selectedOption, setSelectedOption] = useState(label)

  const handleClick = (item: NetworksConfig) => {
    setSelectedOption(item.label)
    setChainId(item.chainId)
  }

  const validSupportConnector = (network: NetworksConfig) => {
    const currentConnectorId = getConnectorId()
    if (!currentConnectorId) {
      return true
    }
    return Boolean(network.supportConnectors.includes(currentConnectorId))
  }

  useEffect(() => {
    if ((currentChainId && !networkExist) || (networkExist && !validSupportConnector(networkExist))) {
      // toastError("Can't find network", 'Please choice network')
      // If network not found, set default
      handleClick(networks[0])
    }
  }, [currentChainId, handleClick, networkExist, networks])

  // Update label when chainId change in modal
  useEffect(() => {
    if (networkExist?.label && selectedOption !== networkExist.label) {
      setSelectedOption(networkExist.label)
    }
  }, [selectedOption, networkExist])

  return (
    <StyledDropDown hasError={hasError} onClick={() => setShowOptions(!showOptions)}>
      <StyledIconContainer>{hasError ? <FailureNetwork /> : Icon && <Icon />}</StyledIconContainer>
      {hasError ? (
        <>
          <StyledSelectedOptionError>{selectedOption}</StyledSelectedOptionError>
          <StyledDropDownMessage>Invalid network</StyledDropDownMessage>
        </>
      ) : (
        <StyledSelectedOption>{selectedOption}</StyledSelectedOption>
      )}
      {!showOptions ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      {showOptions && (
        <StyledOptionsContainer>
          {networks.map((item) => {
            const support = validSupportConnector(item)
            return (
              <StyledOption disabled={!support} key={item.chainId} onClick={() => support && handleClick(item)}>
                {item.label}
              </StyledOption>
            )
          })}
        </StyledOptionsContainer>
      )}
    </StyledDropDown>
  )
}

export default NetworkSwitch
