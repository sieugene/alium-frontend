import React, { FC } from 'react'
import styled from 'styled-components'

const Item = styled.div`
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

  &:hover {
    opacity: 0.7;
  }
`
interface Props {
  isNew: boolean
}
export const MenuNewItem: FC<Props> = ({ isNew }) => {
  if (!isNew) {
    return null
  }
  return <Item>New</Item>
}
