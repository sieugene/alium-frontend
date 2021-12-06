/* eslint-disable react/no-unstable-nested-components */
import format from 'date-fns/format'
import fromUnixTime from 'date-fns/fromUnixTime'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartEntry } from 'views/Info/types'
import { formatNumber } from 'views/Info/utils'
import HoverHandler, { HoverHandlerProps } from './HoverHandler'

export interface LineChartProps {
  data: ChartEntry[]
  onHover?: HoverHandlerProps['onHover']
}

export default function LineChart({ data, onHover }: LineChartProps) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart data={data} onMouseLeave={() => onHover?.(undefined)}>
        <defs>
          <linearGradient id='Gradient' x1='0' x2='0' y1='0' y2='1'>
            <stop offset='0%' stopColor='#B9B2EA' />
            <stop offset='100%' stopColor='#B9B2EA' stopOpacity='0' />
          </linearGradient>
        </defs>
        <XAxis
          dataKey='date'
          axisLine={false}
          tickLine={false}
          tickFormatter={(date) => (typeof date === 'number' ? format(fromUnixTime(date), 'dd') : date)}
          minTickGap={10}
          fontSize='11px'
          fontWeight='500'
          letterSpacing='0.1px'
          tickMargin={8}
        />
        <YAxis
          dataKey='value'
          tickCount={6}
          scale='linear'
          axisLine={false}
          tickLine={false}
          color='#8990A5'
          fontSize='11px'
          fontWeight='500'
          letterSpacing='0.1px'
          tickFormatter={(val) => '$' + formatNumber(val, { notation: 'compact' })}
          orientation='right'
          tick={{ stroke: '#8990A5', strokeWidth: 0 }}
          tickMargin={8}
        />
        <Tooltip
          contentStyle={{ display: 'none' }}
          formatter={(_, __, { payload }: any) => <HoverHandler payload={payload} data={data} onHover={onHover} />}
        />
        <Area type='monotone' dataKey='value' stroke='#6C5DD3' strokeWidth='2' fill='url(#Gradient)' />
      </AreaChart>
    </ResponsiveContainer>
  )
}
