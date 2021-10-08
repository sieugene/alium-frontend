import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: FC<SvgProps> = (props) => {
  return (
    <Svg width='24' height='24' viewBox='0 0 24 24' color='#8990A5' fill='none' {...props}>
      <path
        d='M12.0074 21.2005H12.0074H12.0002C6.91909 21.2005 2.8 17.0814 2.8 12.0002C2.8 6.91909 6.91909 2.8 12.0002 2.8C17.0566 2.8 21.1605 6.87898 21.2004 11.9257V20.4907C20.339 20.0791 19.35 19.8585 18.4638 19.8585C18.0059 19.8585 17.5604 19.9166 17.1348 20.0262C16.5817 20.1688 16.0114 20.373 15.4852 20.5616C15.261 20.6419 15.0447 20.7193 14.8412 20.7879C14.1178 21.0318 13.4665 21.1999 12.8222 21.1999H12.1313V21.1999L12.121 21.2C12.0858 21.2005 12.0497 21.2005 12.0074 21.2005Z'
        stroke='currentColor'
        strokeWidth='1.6'
        fill='none'
      />
      <path
        opacity='0.5'
        d='M11.9993 17.0531C9.20817 17.0531 6.94551 14.7904 6.94551 11.9993C6.94551 9.20817 9.20817 6.94551 11.9993 6.94551C14.7904 6.94551 17.0531 9.20817 17.0531 11.9993C17.0531 14.7904 14.7904 17.0531 11.9993 17.0531Z'
        stroke='currentColor'
        strokeWidth='1.6'
        fill='none'
      />
    </Svg>
  )
}

export default Icon
