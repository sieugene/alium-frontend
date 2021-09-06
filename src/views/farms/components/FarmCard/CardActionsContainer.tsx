import { Button, ChevronDownIcon } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTokenContract } from 'hooks/useContract'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Farm } from 'state/types'
import { fetchFarmUserDataAsync } from 'store/farms'
import styled from 'styled-components'
import { getAddress } from 'utils/addressHelpers'
import useApproveFarm from 'views/farms/hooks/useApproveFarm'
import { InfoFarm } from '.'
import HarvestAction from '../HarvestAction'
import StakeAction from '../StakeAction'

const Footer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`
export interface FarmWithStakedValue extends Farm {
  apr?: number
}
interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
  almBnbPrice?: BigNumber
  lpLabel?: string
}

const CardActionsContainer: React.FC<FarmCardActionsProps> = ({
  farm,
  account,
  addLiquidityUrl,
  almBnbPrice,
  lpLabel,
}) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses } = farm
  const {
    allowance: allowanceAsString = 0,
    tokenBalance: tokenBalanceAsString = 0,
    stakedBalance: stakedBalanceAsString = 0,
    earnings: earningsAsString = 0,
  } = farm.userData || {}
  const allowance = new BigNumber(allowanceAsString)
  const tokenBalance = new BigNumber(tokenBalanceAsString)
  const stakedBalance = new BigNumber(stakedBalanceAsString)
  const earnings = new BigNumber(earningsAsString)
  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpContract = useTokenContract(lpAddress)

  const { onApprove } = useApproveFarm(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      await fetchFarmUserDataAsync(account, [pid])
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, account, pid])

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenName={farm.lpSymbol}
        pid={pid}
        apr={farm.apr}
        lpLabel={lpLabel}
        almBnbPrice={almBnbPrice}
        addLiquidityUrl={addLiquidityUrl}
      />
    ) : (
      <Button mt='8px' disabled={requestedApproval} onClick={handleApprove}>
        {t('Enable Farm')}
      </Button>
    )
  }

  return (
    <div>
      <InfoFarm>
        <HarvestAction pid={farm?.pid} earnings={earnings} />
      </InfoFarm>
      <InfoFarm withBg>
        <div className='title'>{farm.lpSymbol} Staked</div>
        <div className='field'>-</div>
      </InfoFarm>
      <Footer>
        {!account ? <ConnectWalletButton /> : renderApprovalOrStakeButton()}
        <div className='details'>
          <p>Details</p>
          <ChevronDownIcon />
        </div>
      </Footer>
    </div>
  )
}

export default CardActionsContainer
