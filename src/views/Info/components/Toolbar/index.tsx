import { ReactNode } from 'react'
import styled from 'styled-components'
import ToolbarActions from './ToolbarActions'
import ToolbarTitle from './ToolbarTitle'

export interface ToolbarProps {
  title: ReactNode
}

export default function Toolbar({ title }: ToolbarProps) {
  return (
    <Toolbar.Root>
      <ToolbarTitle>{title}</ToolbarTitle>
      <ToolbarActions />
    </Toolbar.Root>
  )
}

Toolbar.Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
