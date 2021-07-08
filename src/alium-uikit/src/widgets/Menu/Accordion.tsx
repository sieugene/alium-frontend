import useOnClickOutside from 'hooks/useOnClickOutside'
import { Children, FC, ReactElement, useRef, useState } from 'react'
import styled from 'styled-components'
import { ArrowDropDownIcon, ArrowDropUpIcon } from '../../components/Svg'
import { MENU_ENTRY_HEIGHT } from './config'
import { LinkLabel, MenuEntry } from './MenuEntry'
import { PushedProps } from './types'

interface Props extends PushedProps {
  label: string
  icon: ReactElement
  initialOpenState?: boolean
  className?: string
}

const Container = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
  div:first-child > div {
    margin-left: 8px;
    padding-bottom: 2px;
    ${({ isOpen }) => isOpen && `color: #24BA7B;`}
  }

  div:first-child > svg * {
    ${({ isOpen }) => isOpen && `stroke: #24BA7B;`}
  }

  @media screen and (max-width: 968px) {
    > div > svg:last-child {
      display: none;
    }
  }
`

const AccordionContent = styled.div<{ isOpen: boolean; isPushed: boolean; maxHeight: number }>`
  max-height: ${({ isOpen, maxHeight }) => (isOpen ? `${maxHeight}px` : 0)};
  transition: max-height 0.3s ease-out;
  overflow: hidden;

  > div > a {
    padding-left: 25px;
    color: #8990a5;
  }

  @media screen and (max-width: 968px) {
    max-height: ${({ maxHeight }) => `${maxHeight}px`};
  }
`

const Accordion: FC<Props> = ({ label, icon, isPushed, pushNav, initialOpenState = false, children, className }) => {
  const accordRef = useRef()
  const [isOpen, setIsOpen] = useState(initialOpenState)

  const handleClick = () => {
    if (isPushed) {
      setIsOpen((prevState) => !prevState)
    } else {
      pushNav(true)
      setIsOpen(true)
    }
  }

  useOnClickOutside(accordRef, () => {
    setIsOpen(false)
  })
  return (
    <Container isOpen={isOpen} ref={accordRef}>
      <MenuEntry onClick={handleClick} className={className}>
        {icon}
        <LinkLabel isPushed={isPushed}>{label}</LinkLabel>
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </MenuEntry>
      <AccordionContent isOpen={isOpen} isPushed={isPushed} maxHeight={Children.count(children) * MENU_ENTRY_HEIGHT}>
        {children}
      </AccordionContent>
    </Container>
  )
}

export default Accordion
