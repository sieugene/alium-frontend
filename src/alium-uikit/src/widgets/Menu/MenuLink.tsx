import Link from 'next/link'
import React, { AnchorHTMLAttributes } from 'react'

const MenuLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...otherProps }) => {
  return <Link href={href} {...otherProps} />
}

export default MenuLink
