import { Button } from 'alium-uikit/src'
import { Handler } from 'alium-uikit/src/widgets/Modal/types'
import BigNumber from 'bignumber.js'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTokenContract } from 'hooks/useContract'
import { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { getExplorerLink } from 'utils'
import { getAddress } from 'utils/addressHelpers'
import useApproveFarm from 'views/farms/hooks/useApproveFarm'
import { farmUserDataUpdate } from 'views/farms/hooks/useFarmingPools'
import DetailsSection from '../DetailsSection'
import { FarmCardActionsProps } from '../FarmCard/CardActionsContainer'

const Footer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`

interface FooterStakeProps extends FarmCardActionsProps {
  stakedBalanceNotZero: boolean
  onPresentDeposit: Handler
}
const FooterStake: FC<FooterStakeProps> = ({
  account,
  farm,
  stakedBalanceNotZero,
  onPresentDeposit,
  addLiquidityUrl,
}) => {
  const { t } = useTranslation()
  const [requestedApproval, setRequestedApproval] = useState(false)

  const { pid, lpAddresses } = farm
  const { allowance: allowanceAsString = 0 } = farm.userData || {}
  const allowance = new BigNumber(allowanceAsString)

  const lpAddress = getAddress(lpAddresses)
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const lpContract = useTokenContract(lpAddress)

  const { onApprove } = useApproveFarm(lpContract)

  const lpLabel = farm.lpSymbol?.toUpperCase().replace('PANCAKE', '')

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      await farmUserDataUpdate(account, [pid])
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, account, pid])

  const FARM_NOT_ENABLED = account && !isApproved
  const STAKE_ALLOW = isApproved && !stakedBalanceNotZero
  const noActions = !FARM_NOT_ENABLED && !STAKE_ALLOW
  return (
    <Footer>
      {noActions && <div> </div>}
      {!account ? (
        <ConnectWalletButton />
      ) : (
        <>
          {FARM_NOT_ENABLED && (
            <Button mt='8px' disabled={requestedApproval} onClick={handleApprove}>
              {t('Enable Farm')}
            </Button>
          )}
          {STAKE_ALLOW && (
            <Button
              onClick={onPresentDeposit}
              disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
            >
              {t('Stake LP')}
            </Button>
          )}
        </>
      )}
      <DetailsSection
        bscScanAddress={getExplorerLink(97, lpAddress, 'address')}
        lpLabel={lpLabel}
        farm={farm}
      />
    </Footer>
  )
}

export default FooterStake
