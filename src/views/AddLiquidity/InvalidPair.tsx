import { Currency, Pair, Percent, Price } from '@alium-official/sdk'
import { Text as UIKitText } from 'alium-uikit/src'
import { AutoColumn } from 'components/Column'
import Pane from 'components/Pane'
import { MinimalPositionCard } from 'components/PositionCard'
import { PairState } from 'data/Reserves'
import { FC } from 'react';
import { useTranslation } from 'react-i18next'
import { Field } from 'state/mint/actions'
import styled from 'styled-components'
import { PoolPriceBar } from './PoolPriceBar'

interface Props {
  pair: Pair
  noLiquidity: boolean
  pairState: PairState
  oneCurrencyIsWETH: boolean
}

interface Components {
  Currencies: FC<CurrenciesProps>
}

interface CurrenciesProps {
  currencies: {
    CURRENCY_A?: Currency
    CURRENCY_B?: Currency
  }
  pairState: PairState
  noLiquidity: boolean
  poolTokenPercentage: Percent
  price: Price
}

export const InvalidPair: FC<Props> & Components = ({ pair, noLiquidity, pairState, oneCurrencyIsWETH }) => {
  if (pair && !noLiquidity && pairState !== PairState.INVALID) {
    return (
      <AutoColumn style={{ minWidth: '20rem', marginTop: '1rem' }}>
        <MinimalPositionCard showUnwrapped={oneCurrencyIsWETH} pair={pair} />
      </AutoColumn>
    )
  }
  return null
}

InvalidPair.Currencies = ({ currencies, pairState, noLiquidity, poolTokenPercentage, price }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation()

  /* TODO: ducker / из-за странного создания компонента не работает перевод (disable до добра не доведет :)) */

  if (currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID) {
    return (
      <div>
        <StyledUIKitText
          style={{ textTransform: 'uppercase', fontWeight: 600 }}
          color='textSubtle'
          fontSize='12px'
          mb='2px'
        >
          {noLiquidity ? t('liquidity.initialPricesAndPoolShare') : t('liquidity.pricesAndPoolShare')}
        </StyledUIKitText>
        <Pane>
          <PoolPriceBar
            currencies={currencies}
            poolTokenPercentage={poolTokenPercentage}
            noLiquidity={noLiquidity}
            price={price}
          />
        </Pane>
      </div>
    )
  }
  return null
}

// styles

const StyledUIKitText = styled(UIKitText)`
  @media screen and (max-width: 600px) {
    text-align: center;
  }
`
