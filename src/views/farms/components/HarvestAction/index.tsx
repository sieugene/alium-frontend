import { useWeb3React } from '@web3-react/core'
import { Button } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from 'state/hooks'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { farmUserDataUpdate, useBnbPriceFromPid } from 'views/farms/hooks/useFarmingPools'
import useHarvestFarm from 'views/farms/hooks/useHarvestFarm'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvestFarm(pid)
  const almBnbPrice = useBnbPriceFromPid()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(almBnbPrice).toNumber() : 0

  return (
    <>
      <div className='title'>
        ALM earned
        <div color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance}</div>
        {earningsBusd > 0 && (
          <Balance fontSize='12px' color='textSubtle' decimals={2} value={earningsBusd} unit=' USD' />
        )}
      </div>
      <div className='field'>
        <Button
          disabled={rawEarningsBalance.eq(0) || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onReward()
              toastSuccess(
                `${t('Harvested')}!`,
                t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'CAKE' }),
              )
            } catch (e) {
              toastError(
                t('Error'),
                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
            await farmUserDataUpdate(account, [pid])
          }}
        >
          {t('Harvest')}
        </Button>
      </div>
    </>
  )
}

export default HarvestAction
