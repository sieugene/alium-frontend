import { FC } from 'react'
import styled from 'styled-components'

const Item = styled.span`
  width: 30px;
  height: 18px;
  background: #e5f8f0;
  border: 1px solid #24ba7b;
  box-sizing: border-box;
  border-radius: 4px;
  font-style: normal;
  font-weight: bold;
  font-size: 9px;
  line-height: 12px;
  letter-spacing: 1px;
  padding: 4px;
  color: #1ea76d;
  display: flex;
  align-items: center;
  text-transform: uppercase;

  &:hover {
    opacity: 0.7;
  }
`
interface Props {
  isnew: boolean
}
export const MenuNewItem: FC<Props> = ({ isnew }) => {
  if (!isnew) {
    return null
  }
  return <Item>New</Item>
}
