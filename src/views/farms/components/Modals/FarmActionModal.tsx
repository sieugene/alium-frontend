import { Button, CalculateIcon, LinkIcon, Modal } from 'alium-uikit/src'
import BigNumber from 'bignumber.js'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import React, { FC, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getExplorerLink } from 'utils'
import { getInterestBreakdown } from 'utils/farm/compoundApyHelpers'
import { formatNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useFarmLpAddress } from 'views/farms/components/Info'
import { FarmPair, FarmWithStakedValue } from 'views/farms/farms.types'
import { useLpTokenPrice } from 'views/farms/hooks/useFarmingPools'
import useI18n from '../../../../hooks/useI18n'
import { FarmModalStatuses } from './FarmModalStatuses'
import { ModalFarmBaseWrap } from './modals.styled'

export interface FarmActionModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  farm: FarmWithStakedValue
  title: string
  onDismiss?: () => void
  tokenName?: string
  apr?: number
  almPrice?: BigNumber
  withoutRoi?: boolean
}

const ModalWrapper = styled(ModalFarmBaseWrap)`
  /* min-height: 224px; */
  padding: 24px;

  .symbol-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #6c5dd3;
  }
`

const Roi = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
  .price {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 0.3px;
    color: #0b1359;
    display: flex;
    align-items: center;
    svg {
      margin-left: 10px;
    }
  }
`

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  button {
    &:first-child {
      margin-right: 16px;
    }
  }
`

const ModalFooter = styled.div`
  padding: 24px 24px 0px 24px;
  border-top: 1px solid #f4f5fa;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .link {
    display: flex;
    cursor: pointer;
    h3 {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;
      color: #6c5dd3;
    }
    svg {
      margin-left: 8px;
    }
  }
`

const FarmActionModal: FC<FarmActionModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
  farm,
  almPrice,
  title,
  withoutRoi,
}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, seterror] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const pair: FarmPair = {
    token0: farm.token,
    token1: farm.quoteToken,
    pairName: tokenName,
  }

  const valueBetterZero = Number(val) > 0
  const link = getExplorerLink(97, useFarmLpAddress(farm), 'address')

  // Roi

  const lpPrice = useLpTokenPrice(farm?.lpSymbol)
  const lpTokensToStake = new BigNumber(val)
  const usdToStake = lpTokensToStake.times(lpPrice)
  const interestBreakdown = getInterestBreakdown({
    principalInUSD: !lpTokensToStake.isNaN() ? usdToStake.toNumber() : 0,
    apr: farm?.apr,
    earningTokenPrice: almPrice?.toNumber(),
  })

  const annualRoi = almPrice?.times(interestBreakdown[3])
  const formattedAnnualRoi = formatNumber(
    annualRoi?.toNumber(),
    annualRoi?.gt(10000) ? 0 : 2,
    annualRoi?.gt(10000) ? 0 : 2,
  )

  const handleChange = useCallback(
    (value: string) => {
      setVal(value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={title} onDismiss={onDismiss} withoutContentWrapper>
      <FarmModalStatuses loading={pendingTx} success={success} error={error}>
        <ModalWrapper>
          <CurrencyInputPanel
            label='Stake'
            value={val}
            onUserInput={handleChange}
            onMax={handleSelectMax}
            onCurrencySelect={() => {}}
            showMaxButton
            currency={null}
            id='farm-action-input'
            showCommonBases={false}
            balance={fullBalance}
            disableCurrencySelect
            pair={pair}
          />
          {!withoutRoi && (
            <Roi>
              <h3>Annual ROI at current rates:</h3>
              <p className='price'>
                ${formattedAnnualRoi}
                <CalculateIcon />
              </p>
            </Roi>
          )}
          <ModalActions>
            <Button fullwidth variant='secondary' onClick={onDismiss}>
              {TranslateString(462, 'Cancel')}
            </Button>
            <Button
              fullwidth
              disabled={pendingTx || !valueBetterZero}
              onClick={async () => {
                try {
                  setPendingTx(true)
                  await onConfirm(val)
                  setSuccess(true)
                } catch (error) {
                  seterror(true)
                } finally {
                  setPendingTx(false)
                }
                // onDismiss()
              }}
            >
              {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
            </Button>
          </ModalActions>
          <ModalFooter>
            <a className='link' href={link} target='_blank'>
              <h3>Get {tokenName}</h3>
              <LinkIcon />
            </a>
          </ModalFooter>
        </ModalWrapper>
      </FarmModalStatuses>
    </Modal>
  )
}

export default FarmActionModal
