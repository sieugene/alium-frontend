import { useWeb3React } from '@web3-react/core'
import { AddIcon, Button, Flex, Heading, IconButton, MinusIcon, useModal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchFarmUserDataAsync } from 'store/farms'
import styled from 'styled-components'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import { useLpTokenPrice } from 'views/farms/hooks/useFarmingPools'
import useStakeFarms from 'views/farms/hooks/useStakeFarms'
import useUnstakeFarms from 'views/farms/hooks/useUnstakeFarms'
import DepositModal from 'views/Pools/components/DepositModal'
import WithdrawModal from 'views/Pools/components/WithdrawModal'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  multiplier?: string
  apr?: number
  displayApr?: string
  addLiquidityUrl?: string
  almBnbPrice?: BigNumber
  lpLabel?: string
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  multiplier,
  apr,
  displayApr,
  addLiquidityUrl,
  almBnbPrice,
  lpLabel,
}) => {
  const { t } = useTranslation()
  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const location = useRouter()
  //   const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const lpPrice = useLpTokenPrice(tokenName)

  const handleStake = async (amount: string) => {
    await onStake(amount)
    fetchFarmUserDataAsync(account, [pid])
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    fetchFarmUserDataAsync(account, [pid])
  }

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance)
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return '<0.0000001'
    }
    if (stakedBalanceBigNumber.gt(0)) {
      return stakedBalanceBigNumber.toFixed(8, BigNumber.ROUND_DOWN)
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }, [stakedBalance])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      stakedBalance={stakedBalance}
      onConfirm={handleStake}
      tokenName={tokenName}
      multiplier={multiplier}
      lpPrice={lpPrice}
      lpLabel={lpLabel}
      apr={apr}
      displayApr={displayApr}
      addLiquidityUrl={addLiquidityUrl}
      almBnbPrice={almBnbPrice}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={handleUnstake} tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <Button
        onClick={onPresentDeposit}
        disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
      >
        {t('Stake LP')}
      </Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant='tertiary' onClick={onPresentWithdraw} mr='6px'>
          <MinusIcon color='primary' width='14px' />
        </IconButton>
        <IconButton
          variant='tertiary'
          onClick={onPresentDeposit}
          disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
        >
          <AddIcon color='primary' width='14px' />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <Flex flexDirection='column' alignItems='flex-start'>
        <Heading color={stakedBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance()}</Heading>
        {renderStakingButtons()}
        {stakedBalance.gt(0) && lpPrice.gt(0) && (
          <Balance
            fontSize='12px'
            color='textSubtle'
            decimals={2}
            value={getBalanceNumber(lpPrice.times(stakedBalance))}
            unit=' USD'
          />
        )}
      </Flex>
    </Flex>
  )
}

export default StakeAction
