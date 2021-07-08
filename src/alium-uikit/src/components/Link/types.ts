import { LinkProps as NextLinkProps } from 'next/link'
import { TextProps } from '../Text'

export interface LinkProps extends TextProps, NextLinkProps {
  external?: boolean
  as?: 'a' | 'button'
  style?: React.CSSProperties
  id?: string
}
