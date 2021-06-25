import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

type Props = LinkProps
type DuplicatedProps = Props & {
  handleClick?: () => void
}
export const NextLink: FC<Props> & { multiple: FC<DuplicatedProps> } = ({ href, children, ...other }) => {
  return (
    <Link href={href || '/'} {...other}>
      {children}
    </Link>
  )
}
// When you see error like multiple children
NextLink.multiple = ({ handleClick, href, children, ...other }) => {
  const location = useRouter()
  const link = (href as string) || '/'
  return (
    <a
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
