import { rgba } from 'polished'
import { Fragment, useMemo } from 'react'
import styled from 'styled-components'

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180)
}

function getPoint(center: number, radius: number, degrees: number) {
  const normalized = toRadians(degrees - 90)
  return {
    x: center + radius * Math.cos(normalized),
    y: center + radius * Math.sin(normalized),
  }
}

export interface UsersProgressBarProps {
  current: number
  all: number
}

export default function UsersProgressBar({ current, all }: UsersProgressBarProps) {
  const padding = 10
  const radius = 250 / 2 - padding
  const center = radius

  // gap in degrees
  const areaGap = 3
  const areas = useMemo(
    () => [
      {
        start: 0,
        end: 90,
      },
      {
        start: 90,
        end: 180,
      },
      {
        start: 180,
        end: 270,
      },
      {
        start: 270,
        end: 360,
      },
    ],
    [],
  )
  const areaMax = all / areas.length
  return (
    <UsersProgressBar.Root>
      <UsersProgressBar.Inner>
        <UsersProgressBar.Svg style={{ padding: padding }}>
          {areas.map((area, i) => {
            const startDegrees = area.start + areaGap
            const endDegrees = area.end - areaGap
            const startPoint = getPoint(center, radius, startDegrees)
            const endPoint = getPoint(center, radius, endDegrees)
            const progress = Math.max(0, current - areaMax * i) / areaMax
            const progressDegrees = Math.min(startDegrees + (endDegrees - startDegrees) * progress, endDegrees)
            const progressPoint = getPoint(center, radius, progressDegrees)
            return (
              <Fragment key={i}>
                <UsersProgressBar.Arc
                  d={`M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 0 1 ${endPoint.x} ${endPoint.y}`}
                  opacity='0.1'
                />
                {progress > 0 && (
                  <UsersProgressBar.Arc
                    d={`M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 0 1 ${progressPoint.x} ${progressPoint.y}`}
                  />
                )}
              </Fragment>
            )
          })}
        </UsersProgressBar.Svg>
        <UsersProgressBar.Counters>
          <UsersProgressBar.Value>
            {current}
            <UsersProgressBar.Sup>/ {all}</UsersProgressBar.Sup>
          </UsersProgressBar.Value>
          <UsersProgressBar.Text>
            Users In the pool
            <br />/ All
          </UsersProgressBar.Text>
        </UsersProgressBar.Counters>
      </UsersProgressBar.Inner>
    </UsersProgressBar.Root>
  )
}

UsersProgressBar.Root = styled.div`
  border: 15px solid ${rgba('#6c5dd3', 0.05)};
  border-radius: 50%;
  width: 100%;
  height: 100%;
`

UsersProgressBar.Inner = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, #8071ed 0%, #6c5dd3 100%);
  border-radius: 50%;
  position: relative;
`

UsersProgressBar.Counters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

UsersProgressBar.Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #ffffff;
`

UsersProgressBar.Value = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: 0.3px;
  color: #ffffff;
  position: relative;
  margin-bottom: 8px;
`

UsersProgressBar.Sup = styled(UsersProgressBar.Text).attrs({
  as: 'span',
})`
  position: absolute;
  top: 5px;
  white-space: nowrap;
`

UsersProgressBar.Svg = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
`

UsersProgressBar.Arc = styled.path.attrs({
  fill: 'none',
  stroke: '#F5F7FF',
  strokeWidth: 5,
  strokeLinecap: 'round',
})``
