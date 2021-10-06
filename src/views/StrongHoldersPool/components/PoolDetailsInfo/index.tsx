import { Percent } from '@alium-official/sdk'
import BigNumber from 'bignumber.js'
import { format, fromUnixTime } from 'date-fns'
import { useMemo } from 'react'
import styled from 'styled-components'

export interface PoolDetailsInfoProps {
  leftId?: BigNumber
  createdAt?: BigNumber
  poolShare?: Percent
}

export default function PoolDetailsInfo({ leftId, createdAt, poolShare }: PoolDetailsInfoProps) {
  const formattedCreatedAt = useMemo(
    () => createdAt && format(fromUnixTime(createdAt.toNumber()), 'dd/MM/yyyy, HH:mm:ss'),
    [createdAt],
  )
  return (
    <PoolDetailsInfo.Root>
      {poolShare && (
        <PoolDetailsInfo.Field>
          <span>Pool share</span>
          <span>{poolShare.toFixed(2)}%</span>
        </PoolDetailsInfo.Field>
      )}
      {leftId && (
        <PoolDetailsInfo.Field>
          <span>Participant number</span>
          <span>{leftId.toString()}</span>
        </PoolDetailsInfo.Field>
      )}
      {formattedCreatedAt && (
        <PoolDetailsInfo.Field>
          <span>Pool creation date</span>
          <span>{formattedCreatedAt}</span>
        </PoolDetailsInfo.Field>
      )}
    </PoolDetailsInfo.Root>
  )
}

PoolDetailsInfo.Root = styled.div``

PoolDetailsInfo.Field = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 6px;

  &:nth-child(even) {
    background: #f4f5fa;
  }

  & > span {
    &:nth-child(1) {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;
      color: #8990a5;
    }

    &:nth-child(2) {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;
      color: #0b1359;
    }
  }
`
