import { removeConnectorId } from 'alium-uikit/src/util/connectorId/removeConnectorId'
import { FC, useEffect, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import styled from 'styled-components'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import Button from '../../components/Button/Button'
import Flex from '../../components/Flex/Flex'
import { BSCScanIcon, ExitIcon, ModalBackgroundIcon, TransactionHistoryIcon } from '../../components/Svg'
import DefaultAvatar from '../../components/Svg/Icons/DefaultAvatar'
import InputCopy from '../../components/Svg/Icons/InputCopy'
import MetaMask from '../../components/Svg/Icons/MetaMask'
import Text from '../../components/Text/Text'
import { Modal } from '../Modal'

interface Props {
  account: string
  logout: () => void
  onDismiss?: () => void
  title?: string
  logoutTitle?: string
  explorerName?: string
  explorerLink?: string
  tokenAmount?: string
  tokenSymbol?: string
  networkName?: string
  balance?: string
  onTransactionHistoryHandler?: any
  balanceHook?: any
}

const StyledBackGround = styled.div`
  background-position: center;
  height: 128px;
  width: 694px;
  margin: 0 -25px;
  display: flex;
  align-items: center;
  padding: 24px;
  background-clip: padding-box;
  @media screen and (max-width: 800px) {
    width: auto;
  }
`

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
`

const StyledInput = styled.input`
  width: 100%;
  padding: 16px 16px 16px 46px;
  border: 1px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 6px;
  color: #8990a5;

  overflow: hidden;
  padding-right: 50px;

  :focus {
    border: 1px solid #d2d6e5;
    outline: none;
  }
`

const StyledInputContainer = styled.div`
  margin-top: 24px;
  position: relative;
  > svg:first-child {
    cursor: pointer;
    position: absolute;
    left: 8px;
    top: 10px;
  }
  > svg:last-child {
    cursor: pointer;
    position: absolute;
    right: 16px;
    top: 12px;
  }
`

const StyledButton = styled(Button)`
  svg * {
    transition: stroke 200ms ease-in-out;
  }
  max-width: 225px;
  :hover {
    svg * {
      stroke: white;
    }
  }
`

const StyledFlex = styled(Flex)`
  @media screen and (max-width: 800px) {
    flex-direction: column;
    > * {
      width: 100%;
    }
    > *:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`

const svgString = encodeURIComponent(renderToStaticMarkup(<ModalBackgroundIcon />))

const AccountModal: FC<Props> = ({
  account,
  logout,
  onDismiss = () => null,
  title = 'Account',
  logoutTitle = 'Disconnect',
  balance,
  explorerName = 'View on BscScan',
  explorerLink,
  tokenSymbol = 'BNB',
  networkName = 'Binance Smart Chain',
  onTransactionHistoryHandler,
  balanceHook,
}) => {
  const [currentBalance, setBalance] = useState(balance)
  useEffect(() => {
    balanceHook().then((result?: any) => setBalance(toSignificantCurrency(result)))
  }, [balanceHook])

  return (
    <Modal title={title} onDismiss={onDismiss} styledModalContent={{ padding: '0 24px 32px 24px' }}>
      <StyledBackGround style={{ backgroundImage: `url("data:image/svg+xml,${svgString}")` }}>
        <StyledInfo>
          <DefaultAvatar width='80px' height='80px' />
          <StyledFlex>
            <Flex flexDirection='column' marginLeft={40}>
              <Text color='#CBC8EE'>Balance</Text>
              <Text color='white'>
                {!currentBalance ? <p>Loading balance...</p> : `${currentBalance} ${tokenSymbol}`}
                {/* {balance} {tokenSymbol} */}
              </Text>
            </Flex>
            <Flex flexDirection='column' marginLeft={40}>
              <Text color='#CBC8EE'>Network</Text>
              <Text color='white'>{networkName}</Text>
            </Flex>
          </StyledFlex>
        </StyledInfo>
      </StyledBackGround>
      <StyledInputContainer>
        <MetaMask width='32' height='32' />
        <StyledInput value={account} />
        <InputCopy
          height='24px'
          width='24px'
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(account)
            }
          }}
        />
      </StyledInputContainer>
      <StyledFlex mt='16px' justifyContent='space-between'>
        <StyledButton size='md' variant='secondary' onClick={() => window.open(explorerLink)}>
          <BSCScanIcon mr={16} />
          {explorerName}
        </StyledButton>
        <StyledButton size='md' variant='secondary' onClick={onTransactionHistoryHandler}>
          <TransactionHistoryIcon mr={16} />
          Transaction History
        </StyledButton>
        <StyledButton
          size='md'
          variant='secondary'
          onClick={() => {
            logout()
            removeConnectorId()
            onDismiss()
          }}
        >
          <ExitIcon mr={16} />
          {logoutTitle}
        </StyledButton>
      </StyledFlex>
    </Modal>
  )
}

export default AccountModal
