import { Currency, CurrencyAmount, Percent, Price, TokenAmount } from '@alium-official/sdk'
import { Text, Text as UIKitText } from 'alium-uikit/src'
import { LightCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import Row, { RowFlat } from 'components/Row'
import { ConfirmationModalContent } from 'components/TransactionConfirmationModal'
import { FC, memo } from 'react'
import { Field } from 'state/mint/actions'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import { ConfirmAddModalBottom } from './ConfirmAddModalBottom'

interface Props extends HeaderProps, BottomProps {
  noLiquidity: boolean
  handleDismissConfirmation: () => void
}

export const AddLiqudityModalContent: FC<Props> = memo(
  ({
    noLiquidity,
    handleDismissConfirmation,
    currencies,
    liquidityMinted,
    allowedSlippage,
    price,
    parsedAmounts,
    onAdd,
    poolTokenPercentage,
  }) => {
    const modalHeader = () => {
      return (
        <ModalHeader
          noLiquidity={noLiquidity}
          currencies={currencies}
          liquidityMinted={liquidityMinted}
          allowedSlippage={allowedSlippage}
        />
      )
    }

    const modalBottom = () => {
      return (
        <ModalBottom
          price={price}
          currencies={currencies}
          parsedAmounts={parsedAmounts}
          noLiquidity={noLiquidity}
          onAdd={onAdd}
          poolTokenPercentage={poolTokenPercentage}
        />
      )
    }
    return (
      <ConfirmationModalContent
        title={noLiquidity ? 'You are creating a pool' : 'You will receive'}
        onDismiss={handleDismissConfirmation}
        topContent={modalHeader}
        bottomContent={modalBottom}
      />
    )
  },
)

interface HeaderProps {
  noLiquidity: boolean
  currencies: {
    CURRENCY_A?: Currency
    CURRENCY_B?: Currency
  }
  liquidityMinted: TokenAmount
  allowedSlippage: number
}
const ModalHeader: FC<HeaderProps> = memo(({ noLiquidity, currencies, liquidityMinted, allowedSlippage }) => {
  return noLiquidity ? (
    <AutoColumn gap='20px'>
      <LightCard mt='20px' borderRadius='20px' padding='0'>
        <RowFlat>
          <UIKitText fontSize='24px' mr='8px'>
            {`${currencies[Field.CURRENCY_A]?.symbol}/${currencies[Field.CURRENCY_B]?.symbol}`}
          </UIKitText>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={24}
          />
        </RowFlat>
      </LightCard>
    </AutoColumn>
  ) : (
    <AutoColumn gap='10px'>
      <RowFlat>
        <UIKitText fontSize='24px' mr='8px'>
          {toSignificantCurrency(liquidityMinted)}
        </UIKitText>
        <DoubleCurrencyLogo
          currency0={currencies[Field.CURRENCY_A]}
          currency1={currencies[Field.CURRENCY_B]}
          size={24}
        />
      </RowFlat>
      <Row>
        <UIKitText fontSize='22px'>
          {`${currencies[Field.CURRENCY_A]?.symbol}/${currencies[Field.CURRENCY_B]?.symbol} Pool Tokens`}
        </UIKitText>
      </Row>
      <Text fontSize='14px' color='#8990A5'>
        {`Output is estimated. If the price changes by more than ${
          allowedSlippage / 100
        }% your transaction will revert.`}
      </Text>
    </AutoColumn>
  )
})

interface BottomProps {
  price: Price
  currencies: {
    CURRENCY_A?: Currency
    CURRENCY_B?: Currency
  }
  parsedAmounts: {
    CURRENCY_A?: CurrencyAmount
    CURRENCY_B?: CurrencyAmount
  }
  noLiquidity: boolean
  onAdd: () => Promise<void>
  poolTokenPercentage: Percent
}
const ModalBottom: FC<BottomProps> = memo(
  ({ price, currencies, parsedAmounts, noLiquidity, onAdd, poolTokenPercentage }) => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  },
)
