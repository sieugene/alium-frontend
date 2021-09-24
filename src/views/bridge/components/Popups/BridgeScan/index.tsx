import { Skeleton } from 'alium-uikit/src'
import TransactionModal, { CloseItem } from 'components/Modal/transaction/TransactionModal'
import { MAINNET_BDRIGE_OWNER, TESTNET_BDRIGE_OWNER } from 'constants/bridge/bridge.constants'
import { useBridgeContext } from 'contexts/BridgeContext'
import React, { FC } from 'react'
import { BridgeNetworks } from 'store/bridge/types'
import { networkFinder, useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { getExplorerLink, getExplorerName } from 'utils'
import { formatBridgeTokenAmount, formatValue } from 'utils/bridge/helpers'

const Wrapper = styled.div`
  width: 450px;
  padding: 32px 32px 0px 32px;
  position: relative;
  @media screen and (max-width: 480px) {
    max-width: 354px;
  }
`
const Header = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`
const TopContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  svg {
    height: 48px;
    width: 48px;
  }
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-top: 16px;
  }
`
const Table = styled.div`
  margin-bottom: 32px;
  margin-top: 32px;
  .table-item {
    display: flex;
    justify-content: space-between;
    :nth-child(2n) {
      background: #f4f5fa;
      border-radius: 6px;
    }
    padding: 8px;
    .title {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      line-height: 14px;
      letter-spacing: 0.3px;

      color: #8990a5;
    }
  }
`

const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #0b1359;
`

const TextLinkStyled = styled.a`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.3px;
  color: #6c5dd3;
`

const TextLink: FC<{ link: string; text?: string }> = ({ link, text }) => {
  return (
    <TextLinkStyled href={link} target='_blank'>
      {text || link}
    </TextLinkStyled>
  )
}

interface Props {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  type: BridgeNetworks
}
const BridgeScan: FC<Props> = ({ modalOpen, setModalOpen, type }) => {
  const ownerForeignAddress = process.env.APP_ENV === 'development' ? TESTNET_BDRIGE_OWNER : MAINNET_BDRIGE_OWNER
  const isFrom = type === 'fromNetwork'
  const chainId = useStoreBridge((state) => state[type])
  const token = useStoreBridge((state) => (isFrom ? state.tokens.fromToken : state.tokens.toToken))
  const { toBalance, fromBalance, tokenLimits } = useBridgeContext()
  const balance = isFrom ? fromBalance : toBalance

  const formattedTokenLimits = token &&
    tokenLimits && {
      minPerTx: formatValue(tokenLimits.minPerTx, token?.decimals) || '0',
      maxPerTx: formatValue(tokenLimits.maxPerTx, token?.decimals) || '0',
      dailyLimit: formatValue(tokenLimits.dailyLimit, token?.decimals) || '0',
    }

  const network = networkFinder(chainId)
  const explorer = getExplorerName(chainId)
  const Icon = network?.icon

  const onDismiss = () => {
    setModalOpen(false)
  }

  const tokenLoading = !token
  const tokenLimitLoading = !formattedTokenLimits
  const data = [
    {
      title: 'Default RPC URL',
      content: <TextLink link={getExplorerLink(chainId, '', 'default')} />,
      loading: false,
    },
    {
      title: 'Bridge Foreign Address',
      content: (
        <TextLink
          link={getExplorerLink(chainId, ownerForeignAddress, 'address')}
          text={textEllipsis(ownerForeignAddress)}
        />
      ),
      loading: false,
    },
    {
      title: 'Token Address',
      content: (
        <TextLink link={getExplorerLink(chainId, token?.address, 'token')} text={textEllipsis(token?.address)} />
      ),
      loading: tokenLoading,
    },
    {
      title: 'Token Name',
      content: <Text>{token?.name}</Text>,
      loading: tokenLoading,
    },
    {
      title: `Remaining Daily ${token?.symbol} Quota`,
      content: <Text>{formattedTokenLimits?.dailyLimit}</Text>,
      loading: tokenLimitLoading,
    },
    {
      title: 'Maximum Amount Per Transaction',
      content: (
        <Text>
          {formattedTokenLimits?.maxPerTx} {token?.symbol}
        </Text>
      ),
      loading: tokenLimitLoading,
    },
    {
      title: 'Minimum Amount Per Transaction',
      content: (
        <Text>
          {formattedTokenLimits?.minPerTx} {token?.symbol}
        </Text>
      ),
      loading: tokenLimitLoading,
    },
    {
      title: `${token?.symbol} Tokens Amount`,
      content: (
        <Text>
          {formatBridgeTokenAmount(token, token?.totalSupply)} {token?.symbol}
        </Text>
      ),
      loading: tokenLoading,
    },
    {
      title: `Your ${token?.symbol} Balance`,
      content: (
        <Text>
          {formatBridgeTokenAmount(token, balance)} {token?.symbol}
        </Text>
      ),
      loading: tokenLoading,
    },
  ]
  return (
    <TransactionModal isOpen={modalOpen} onDismiss={onDismiss}>
      <Wrapper>
        <Header>
          <CloseItem onClick={onDismiss} />
        </Header>
        <TopContent>
          {Icon && <Icon />}
          <p>{explorer}</p>
        </TopContent>
        <Table>
          {data?.map((d, index) => (
            <div className='table-item' key={index?.toString()}>
              <div className='title'>{d.loading ? <Skeleton width={50} /> : d.title}</div>
              {d.loading ? <Skeleton width={50} /> : d.content}
            </div>
          ))}
        </Table>
      </Wrapper>
    </TransactionModal>
  )
}

const textEllipsis = (text: string) => {
  return text ? `${text.substring(0, 6)}...${text.substring(text.length - 4)}` : null
}

export default BridgeScan
