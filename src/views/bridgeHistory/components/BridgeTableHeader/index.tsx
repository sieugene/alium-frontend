import { FC } from 'react'
import styled from 'styled-components'

const Header = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr 1.5fr 1.5fr 1.5fr 1.5fr;
  grid-gap: 16px;
  @media screen and (max-width: 1240px) {
    grid-template-columns: 1.5fr 2.5fr 1.5fr 1.5fr 1.5fr 1.5fr;
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: 4fr 1.5fr 1.5fr 1.5fr 1.5fr;
    .direction {
      display: none;
    }
  }

  background: #ebedf9;
  border-radius: 6px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #0b1359;
  padding: 16px;
  white-space: nowrap;

  div:last-child {
    text-align: right;
  }
`
interface Props {
  items: string[]
}
const BridgeTableHeader: FC<Props> = ({ items }) => {
  return (
    <Header>
      {items?.length &&
        items.map((h, index) => (
          <div key={index.toString()} className={h.replace(' ', '').toLowerCase()}>
            {h}
          </div>
        ))}
    </Header>
  )
}

export default BridgeTableHeader
