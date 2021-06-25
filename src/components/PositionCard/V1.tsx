import { Token, TokenAmount, WETH } from '@alium-official/sdk'
import { Button, Text } from 'alium-uikit/src'
import Link from 'next/link'
import React from 'react'
import { ROUTES } from 'routes'
import { useActiveWeb3React } from '../../hooks'
import { AutoColumn } from '../Column'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed } from '../Row'
import { FixedHeightRow, HoverCard } from './index'

interface PositionCardProps {
  token: Token
  V1LiquidityBalance: TokenAmount
}

function V1PositionCard({ token, V1LiquidityBalance }: PositionCardProps) {
  const { chainId } = useActiveWeb3React()

  return (
    <HoverCard>
      <AutoColumn gap="12px">
        <FixedHeightRow>
          <RowFixed>
            <DoubleCurrencyLogo currency0={token} margin size={20} />
            <Text fontSize="20px" style={{ marginLeft: '' }}>
              {`${chainId && token.equals(WETH[chainId]) ? 'WETH' : token.symbol}/ETH`}
            </Text>
            <Text fontSize="12px" ml="0.5rem" px="0.75rem" py="0.25rem" style={{ borderRadius: '1rem' }} color="black">
              V1
            </Text>
          </RowFixed>
        </FixedHeightRow>

        <AutoColumn gap="8px">
          <RowBetween marginTop="10px">
            <Button style={{ width: '68%' }} as={Link} href={`/migrate/v1/${V1LiquidityBalance.token.address}`}>
              Migrate
            </Button>

            <Button
              variant="secondary"
              style={{ width: '28%' }}
              as={Link}
              href={ROUTES.removeByMultiple('v1', `${V1LiquidityBalance.token.address}`)}
            >
              Remove
            </Button>
          </RowBetween>
        </AutoColumn>
      </AutoColumn>
    </HoverCard>
  )
}

export default V1PositionCard
