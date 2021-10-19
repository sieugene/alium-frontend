import { Currency, Pair } from '@alium-official/sdk'
import { ArrowDropDownIcon, Button, Text } from 'alium-uikit/src'
import Loader from 'components/Loaders/Loader'
import { Input as NumericalInput } from 'components/NumericalInput'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { useActiveWeb3React } from 'hooks'
import { useTranslation } from 'next-i18next'
import { darken } from 'polished'
import { useCallback, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { TranslateString } from 'utils/translateTextHelpers'

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  currencyList?: any
  customHeight?: number
  onKeyUp?: any
  loading?: boolean
}

export default function BridgeCurrencyInput(props: CurrencyInputPanelProps) {
  const {
    value,
    onUserInput,
    onMax,
    showMaxButton,
    label = TranslateString(132, 'Input'),
    onCurrencySelect,
    currency,
    disableCurrencySelect = false,
    pair = null, // used for double token logo
    hideInput = false,
    otherCurrency,
    id,
    showCommonBases,
    currencyList,
    customHeight,
    onKeyUp,
    loading,
  } = props

  const theme = useTheme()
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        <InputRow
          style={hideInput ? { padding: '0', borderRadius: '8px' } : {}}
          selected={disableCurrencySelect}
          customHeight={customHeight}
        >
          {!hideInput && (
            <>
              <NumericalInput
                className='token-amount-input'
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
                style={{ fontSize: '14px' }}
                onKeyUp={onKeyUp}
              />
            </>
          )}
          <CurrencySelect
            selected={!!currency}
            className='open-currency-select-button'
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <Aligner>
              {pair ? (
                <Text color={theme.colors.textSubtle} style={{ marginLeft: '8px', fontSize: '14px' }}>
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </Text>
              ) : (
                <Text color='#8990A5' style={{ paddingRight: '16px', fontSize: '14px' }}>
                  {(currency?.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                    : currency?.symbol) || (
                    <Text color='#8990A5' style={{ fontSize: '14px' }}>
                      {loading && <Loader />}
                    </Text>
                  )}
                </Text>
              )}
              {!disableCurrencySelect && <ArrowDropDownIcon />}
            </Aligner>
          </CurrencySelect>
          {account && currency && showMaxButton && label !== 'To' && (
            <Button onClick={onMax} size='sm' variant='text' buttonType='max'>
              {t('MAX')}
            </Button>
          )}
        </InputRow>
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
          currencyList={currencyList}
        />
      )}
    </InputPanel>
  )
}

// styles

const InputRow = styled.div<{ selected: boolean; customHeight?: number }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.4rem 0.5rem 0.4rem 1rem' : '0.4rem 0.75rem 0.4rem 1rem')};
  ${({ customHeight }) => (customHeight ? `height: ${customHeight}px;` : '')}
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 34px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ selected, theme }) => (selected ? theme.colors.text : '#FFFFFF')};
  border-radius: 6px;
  outline: none;
  /* cursor: pointer; */
  user-select: none;
  border: none;
  padding: 0;
  position: relative;
`

const LabelRow = styled.div`
  position: absolute;
  padding: 4px 0.75rem;
  top: -17px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  & ${Text} {
    background: #fff;
    padding: 4px;
    font-size: 13px;
    line-height: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primaryBright};
  }

  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.colors.textSubtle)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  border: 1px solid #d2d6e5;
  position: relative;
  border-radius: 6px;
  background-color: transparent;
  z-index: 1;
  margin-right: 16px;
  width: 340px;

  @media screen and (max-width: 480px) {
    width: 100%;
    max-width: initial;
    margin-right: 0;
  }
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 6px;
  background-color: transparent;
  box-shadow: ${({ theme }) => theme.shadows.inset};
`
