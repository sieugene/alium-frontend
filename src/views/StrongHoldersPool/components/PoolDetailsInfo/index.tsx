import styled from 'styled-components'

export default function PoolDetailsInfo() {
  return (
    <PoolDetailsInfo.Root>
      <PoolDetailsInfo.Field>
        <span>Pool share</span>
        <span>0,34%</span>
      </PoolDetailsInfo.Field>
      <PoolDetailsInfo.Field>
        <span>Participant number</span>
        <span>26</span>
      </PoolDetailsInfo.Field>
      <PoolDetailsInfo.Field>
        <span>Pool creation date</span>
        <span>18/08/2021, 18:34:40</span>
      </PoolDetailsInfo.Field>
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
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;
      color: #8990a5;
    }

    &:nth-child(2) {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;
      color: #0b1359;
    }
  }
`
