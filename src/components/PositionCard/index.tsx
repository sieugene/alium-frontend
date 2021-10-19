import { JSBI, Pair, Percent } from '@alium-official/sdk'
import {
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  Button,
  Card as UIKitCard,
  CardBody,
  ColoredCopyIcon,
  IconButton,
  Text,
} from 'alium-uikit/src'
import { NextLink } from 'components/NextLink'
import { useTotalSupply } from 'data/TotalSupply'
import { useActiveWeb3React } from 'hooks'
import { useTranslation } from 'next-i18next'
import { darken } from 'polished'
import { MouseEvent, useState } from 'react'
import { ROUTES } from 'routes'
import { useTokenBalance } from 'state/wallet/hooks'
import styled from 'styled-components'
import { toSignificantCurrency } from 'utils/currency/toSignificantCurrency'
import { currencyId } from 'utils/currencyId'
import { unwrappedToken } from 'utils/wrappedCurrency'
import Card from '../Card'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed } from '../Row'
import { Dots } from '../swap/styleds'

interface FixedHeightProps {
  background?: boolean
}

interface PositionCardProps {
  pair: Pair
  showUnwrapped?: boolean
}

export function MinimalPositionCard({ pair, showUnwrapped = false }: PositionCardProps) {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && (
        <StyledUIKitCard>
          <StyledCardBody>
            <AutoColumn>
              <FixedHeightRow>
                <RowFixed>
                  <Text style={{ textTransform: 'uppercase', fontWeight: 600 }} fontSize='14px' color='textSubtle'>
                    {t('LP Tokens in your Wallet')}
                  </Text>
                </RowFixed>
              </FixedHeightRow>
              <FixedHeightRow
                onClick={() => setShowMore(!showMore)}
                style={{ paddingRight: '16px', paddingLeft: '16px' }}
              >
                <RowFixed>
                  <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
                  <Text fontSize='14px' color='#8990A5' pl='8px' style={{ fontWeight: 500 }}>
                    {currency0.symbol}/{currency1.symbol}
                  </Text>
                </RowFixed>
                <RowFixed>
                  <Text fontSize='14px' style={{ fontWeight: 500 }}>
                    {userPoolBalance ? toSignificantCurrency(userPoolBalance) : '-'}
                  </Text>
                </RowFixed>
              </FixedHeightRow>
              <AutoColumn gap='4px'>
                <FixedHeightRow
                  style={{ backgroundColor: '#F4F5FA', borderRadius: '6px', paddingRight: '16px', paddingLeft: '16px' }}
                >
                  <Text fontSize='14px' color='#8990A5' style={{ fontWeight: 500 }}>
                    {currency0.symbol}:
                  </Text>
                  {token0Deposited ? (
                    <RowFixed>
                      <Text ml='6px' fontSize='14px' style={{ fontWeight: 500 }}>
                        {toSignificantCurrency(token0Deposited)}
                      </Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
                <FixedHeightRow style={{ paddingRight: '16px', paddingLeft: '16px' }}>
                  <Text fontSize='14px' color='#8990A5' style={{ fontWeight: 500 }}>
                    {currency1.symbol}:
                  </Text>
                  {token1Deposited ? (
                    <RowFixed>
                      <Text ml='6px' fontSize='14px' style={{ fontWeight: 500 }}>
                        {toSignificantCurrency(token1Deposited)}
                      </Text>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
              </AutoColumn>
            </AutoColumn>
          </StyledCardBody>
        </StyledUIKitCard>
      )}
    </>
  )
}

export default function FullPositionCard({ pair }: PositionCardProps) {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const liquidityAddress = pair.liquidityToken.address

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  const handleAddressCopy = (e: MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(liquidityAddress)
    e.stopPropagation()
  }

  return (
    <HoverCard>
      <AutoColumn gap='12px'>
        <FixedHeightRow onClick={() => setShowMore(!showMore)} style={{ cursor: 'pointer' }}>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
            <Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
            </Text>

            <CopyButtonWrapper variant='text' onClick={handleAddressCopy} title={t('Copy LP Token address')}>
              <ColoredCopyIcon width='24px' height='24px' />
            </CopyButtonWrapper>
          </RowFixed>
          <RowFixed>
            {showMore ? (
              <ArrowDropUpIcon style={{ marginLeft: '10px' }} />
            ) : (
              <ArrowDropDownIcon style={{ marginLeft: '10px' }} />
            )}
          </RowFixed>
        </FixedHeightRow>
        {showMore && (
          <AutoColumn gap='8px' triggerMobile>
            <FixedHeightRow background>
              <RowFixed>
                <Text color='#8990a5'>{t('Pooled {{currencySymbol}}:', { currencySymbol: currency0.symbol })}</Text>
              </RowFixed>
              {token0Deposited ? (
                <RowFixed>
                  <Text ml='6px' color='#6c5dd3'>
                    {toSignificantCurrency(token0Deposited)}
                  </Text>
                  <CurrencyLogo size='20px' style={{ marginLeft: '8px' }} currency={currency0} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>

            <FixedHeightRow>
              <RowFixed>
                <Text color='#8990a5'>{t('Pooled {{currencySymbol}}:', { currencySymbol: currency1.symbol })}</Text>
              </RowFixed>
              {token1Deposited ? (
                <RowFixed>
                  <Text ml='6px' color='#6c5dd3'>
                    {toSignificantCurrency(token1Deposited)}
                  </Text>
                  <CurrencyLogo size='20px' style={{ marginLeft: '8px' }} currency={currency1} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>
            <FixedHeightRow background>
              <Text color='#8990a5'>{t('Your pool tokens:')}</Text>
              <Text color='#6c5dd3'>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text>
            </FixedHeightRow>
            <FixedHeightRow>
              <Text color='#8990a5'>{t('Your pool share:')}</Text>
              <Text color='#6c5dd3'>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(2)}%` : '-'}</Text>
            </FixedHeightRow>

            <RowBetween marginTop='10px'>
              <NextLink href={ROUTES.addByMultiple(currencyId(currency0), currencyId(currency1))}>
                <Button>{t('Add')}</Button>
              </NextLink>
              <NextLink href={ROUTES.removeByMultiple(currencyId(currency0), currencyId(currency1))}>
                <Button variant='secondary'>{t('Remove')}</Button>
              </NextLink>
            </RowBetween>
          </AutoColumn>
        )}
      </AutoColumn>
    </HoverCard>
  )
}

// styles

export const FixedHeightRow = styled(RowBetween)`
  height: 36px;
  ${(props: FixedHeightProps) =>
    props.background &&
    `
    background: #F5F7FF;
    border-radius: 6px;
  `}
`

export const HoverCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.invertedContrast};

  &:hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.colors.invertedContrast)};
  }
`

const CopyButtonWrapper = styled(IconButton)`
  width: 30px;
  height: 30px;
`

const StyledUIKitCard = styled(UIKitCard)`
  border-radius: 6px;
  max-width: 738px;
`

const StyledCardBody = styled(CardBody)`
  padding: 24px;
`
