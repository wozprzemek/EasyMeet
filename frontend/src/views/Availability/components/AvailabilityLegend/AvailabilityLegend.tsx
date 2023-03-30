import { useCallback, useEffect, useState } from 'react';
import { backgroundColor, baseCellColor, calculateCellColor, Color, selectedCellColor } from '../AvailabilityGrid/AvailabilityGrid';
import './availabilityLegend.scss';

interface IAvailabilityLegend {
  userCount: number;
}

export const AvailabilityLegend = ({ userCount }: IAvailabilityLegend) => {
  const [colors, setColors] = useState<Color[]>([])

  const getAllColors = useCallback(() => {
    const colors = [...Array(userCount + 1).keys()].map((i) => {
      return calculateCellColor(i, userCount, backgroundColor, selectedCellColor, baseCellColor)
    })
    setColors(colors)
  }, [userCount])

  useEffect(() => {
    getAllColors()
  }, [userCount])

  return (
    <div className='LegendWrapper'>
      <span>0/{userCount}</span>
      <div className='LegendBox'>
        {colors.map((color, index) => {
          return <div key={index} style={{backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`}}></div>
        })}
      </div>
      <span>{userCount}/{userCount}</span>
    </div>
  )
}
