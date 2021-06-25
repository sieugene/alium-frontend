import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { AnchorHTMLAttributes, FC } from 'react'

type Props = LinkProps & {
  className?: string
}
type DuplicatedProps = Props & {
  handleClick?: () => void
} & AnchorHTMLAttributes<HTMLAnchorElement>
export const NextLink: FC<Props> & { multiple: FC<DuplicatedProps> } = ({ href, children, className, ...other }) => {
  return (
    <Link href={href || '/'} {...other}>
      <a href={(href as string) || '/'} className={className || ''}>
        {children}
      </a>
    </Link>
  )
}
// When you see error like multiple children
NextLink.multiple = ({ handleClick, href, children, className, ...other }) => {
  const location = useRouter()
  const link = (href as string) || '/'
  return (
    <a
      className={className || ''}
      href={link}
      onClick={(event) => {
        event.preventDefault()
        handleClick && handleClick()
        location.push(link)
      }}
      {...other}
    >
      {children}
    </a>
  )
}
