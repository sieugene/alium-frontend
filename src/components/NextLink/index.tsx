import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { AnchorHTMLAttributes, CSSProperties, FC } from 'react'

type Props = LinkProps & {
  className?: string
  style?: CSSProperties
  id?: string
}
type DuplicatedProps = Props & {
  handleClick?: () => void
} & AnchorHTMLAttributes<HTMLAnchorElement>
export const NextLink: FC<Props> & { Multiple: FC<DuplicatedProps> } = ({ href, children, className, ...other }) => {
  return (
    <Link href={href || '/'} {...other}>
      <a href={(href as string) || '/'} className={className || ''}>
        {children}
      </a>
    </Link>
  )
}
// When you see error like multiple children
NextLink.Multiple = ({ handleClick, href, children, className, ...other }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useRouter()
  const link = (href as string) || '/'
  return (
    <a
      className={className || ''}
      href={link}
      onClick={(event) => {
        event.preventDefault()
        handleClick?.()
        location.push(link)
      }}
      {...other}
    >
      {children}
    </a>
  )
}
