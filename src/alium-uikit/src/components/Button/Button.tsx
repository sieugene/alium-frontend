import { NextLink } from 'components/NextLink'
import React from 'react'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import StyledButton from './StyledButton'
import { ButtonProps, sizes, variants } from './types'

const LinkWrapped: React.FC<{ as: ButtonProps['as']; href?: string; id?: string }> = ({ as, href, children }) => {
  if (as === 'a') {
    return <NextLink.multiple href={href}>{children}</NextLink.multiple>
  }
  return <>{children}</>
}

const Button: React.FC<ButtonProps> = ({ startIcon, endIcon, children, external, isloading, disabled, ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {}
  const isDisabled = isloading || disabled

  return (
    <StyledButton {...internalProps} {...props} isloading={isloading} disabled={isDisabled} as={null}>
      <LinkWrapped as={props.as} href={props.href}>
        {React.isValidElement(startIcon) &&
          React.cloneElement(startIcon, {
            mr: '0.5rem',
          })}
        {children}
        {React.isValidElement(endIcon) &&
          React.cloneElement(endIcon, {
            ml: '0.5rem',
          })}
      </LinkWrapped>
    </StyledButton>
  )
}

Button.defaultProps = {
  variant: variants.PRIMARY,
  size: sizes.MD,
  external: false,
  isloading: false,
  disabled: false,
}

export default Button
