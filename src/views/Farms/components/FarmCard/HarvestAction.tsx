import { Button, Flex, Heading } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import { useHarvest } from 'hooks/useHarvest'
import useI18n from 'hooks/useI18n'
import { FC, useState } from 'react'
import { getBalanceNumber } from 'utils/formatBalance'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)

  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()

  return (
    <Flex mb='8px' justifyContent='space-between' alignItems='center'>
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</Heading>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
      >
        {TranslateString(562, 'Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
