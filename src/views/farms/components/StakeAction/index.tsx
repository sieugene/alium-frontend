import { useWeb3React } from '@web3-react/core'
import { AddIcon, IconButton, MinusIcon, useModal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { getBalanceAmount, getBalanceNumber } from 'utils/formatBalance'
import { farmUserDataUpdate, useLpTokenPrice } from 'views/farms/hooks/useFarmingPools'
import useStakeFarms from 'views/farms/hooks/useStakeFarms'
import useUnstakeFarms from 'views/farms/hooks/useUnstakeFarms'
import DepositModal from 'views/Pools/components/DepositModal'
import WithdrawModal from 'views/Pools/components/WithdrawModal'
import { InfoFarm } from '../FarmCard'
import { FarmCardActionsProps } from '../FarmCard/CardActionsContainer'
import FooterStake from './FooterStake'

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const StakeAction: React.FC<FarmCardActionsProps> = ({ farm, addLiquidityUrl, almBnbPrice, lpLabel }) => {
  const { pid } = farm
  const { tokenBalance: tokenBalanceAsString = 0, stakedBalance: stakedBalanceAsString = 0 } = farm.userData || {}
  const tokenName = farm.lpSymbol
  const multiplier = farm?.multiplier
  const apr = farm?.apr
  const displayApr = `${apr}`

  const tokenBalance = new BigNumber(tokenBalanceAsString)
  const stakedBalance = new BigNumber(stakedBalanceAsString)
  const stakedBalanceNotZero = !stakedBalance.eq(0)

  const { onStake } = useStakeFarms(pid)
  const { onUnstake } = useUnstakeFarms(pid)
  const location = useRouter()
  const { account } = useWeb3React()
  const lpPrice = useLpTokenPrice(tokenName)

  const handleStake = async (amount: string) => {
    await onStake(amount)
    await farmUserDataUpdate(account, [pid])
  }

  const handleUnstake = async (amount: string) => {
    await onUnstake(amount)
    await farmUserDataUpdate(account, [pid])
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
    return stakedBalanceNotZero ? (
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
    ) : (
      <div>-</div>
    )
  }

  return (
    <>
      <InfoFarm withBg>
        <div className='title'>
          <p>{tokenName} Staked</p>
          <p>{displayBalance()}</p>
        </div>
        <div className='field'>
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
        </div>
      </InfoFarm>
      <FooterStake
        account={account}
        addLiquidityUrl={addLiquidityUrl}
        farm={farm}
        stakedBalanceNotZero={stakedBalanceNotZero}
        onPresentDeposit={onPresentDeposit}
      />
    </>
  )
}
export default StakeAction
