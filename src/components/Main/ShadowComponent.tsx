import React, { FC } from 'react'
import styled from 'styled-components'

const Shadow = styled.div<{ hide: boolean }>`
  ${(props) => props.hide && 'display: none;'}
`
interface Props {
  hide: boolean
  children: React.ReactNode
}

/**
 * Use when the component needs to be hidden or when there are problems with rendering children
 */
export const ShadowComponent: FC<Props> = ({ hide, children }) => {
  return <Shadow hide={hide}>{children}</Shadow>
}
