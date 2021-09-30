import { Trade, TradeType } from '@alium-official/sdk'
import { Card, CardBody, Text } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import { Field } from 'state/swap/actions'
import { useUserSlippageTolerance } from 'state/user/hooks'
import styled from 'styled-components'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/prices'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { RowBetween, RowFixed } from '../Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const { t } = useTranslation()
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
    <Card>
      <CardBody>
        <RowBetween>
          <RowFixed>
            <Text fontSize='14px'>{isExactIn ? t('swap.minimumReceived') : t('swap.maximumSold')}</Text>
            <QuestionHelper text={t('swap.yourTransactionWillRevert')} />
          </RowFixed>
          <RowFixed>
            <Text fontSize='14px'>
              {isExactIn
                ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                  '-'
                : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ??
                  '-'}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <Text fontSize='14px'>{t('swap.priceImpact')}</Text>
            <QuestionHelper text={t('swap.theDifferenceBetween')} />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <Text fontSize='14px'>{t('swap.liquidityProvider')}</Text>
            <QuestionHelper text={t('swap.forEachTradeAFeeIsPaid')} />
          </RowFixed>
          <StyledText fontSize='16px'>
            {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
          </StyledText>
        </RowBetween>
      </CardBody>
    </Card>
  )
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const { t } = useTranslation()
  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn gap='md'>
      {trade && (
        <>
          <StyledTradeSummary>
            <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          </StyledTradeSummary>
          {showRoute && (
            <StyledRouteContainer>
              <AutoColumn style={{ padding: '0 24px' }}>
                <RowFixed>
                  <Text fontSize='14px' bold>
                    {t('swap.route')}
                  </Text>
                  <QuestionHelper text={t('swap.routingThroughThese')} />
                </RowFixed>
                <SwapRoute trade={trade} />
              </AutoColumn>
            </StyledRouteContainer>
          )}
        </>
      )}
    </AutoColumn>
  )
}

// styles

const StyledTradeSummary = styled.div`
  & > div {
    border-radius: 0 0 6px 6px;
  }

  & > div > div {
    padding: 15px 30px 24px 30px;
  }

  & > div > div > div {
    height: 40px;
    padding: 0 10px 0 10px;
  }

  & > div > div > div:nth-child(2n) {
    background: #f4f5fa;
    border-radius: 6px;
  }

  & > div > div > div > div > div {
    font-size: 14px;
  }

  & > div > div > div > div:first-child > div {
    color: #8990a5;
    letter-spacing: 0.3px;
  }

  & > div > div > div > div > span * {
    background: none;
  }

  @media screen and (max-width: 530px) {
    & > div > div > div > div > div {
      font-size: 11px;
    }
  }

  @media screen and (max-width: 376px) {
    & > div > div {
      padding: 15px 15px 24px 15px;
    }

    & > div > div > div > div > div {
      font-size: 11px;
    }

    & > div * {
      font-size: 11px;
    }
  }
`

const StyledRouteContainer = styled.div`
  background-color: white;
  border-radius: 6px;
  border: none;
  padding: 12px 6px;
`

const StyledText = styled(Text)`
  font-size: 14px;

  @media screen and (max-width: 530px) {
    font-size: 11px;
  }
`