import * as React from 'react';
import {cn} from '@/lib/utils';
interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  circleStrokeWidth?: number;
  progressStrokeWidth?: number;
  shape?: 'square' | 'round';
  className?: string;
  circleClassName?: string;
  progressClassName?: string;
  labelClassName?: string;
}
export const CircularProgress = ({
  value,
  className,
  circleClassName,
  progressClassName,
  shape = 'round',
  size = 100,
  strokeWidth,
  circleStrokeWidth = 10,
  progressStrokeWidth = 10,
}: CircularProgressProps) => {
  const radius = size / 2 - 10;
  const circumference = Math.ceil(3.14 * radius * 2);
  const percentage = Math.ceil(circumference * ((100 - value) / 100));
  const viewBox = `-${size * 0.125} -${size * 0.125} ${size * 1.25} ${
    size * 1.25
  }`;
  return (
    <div className={cn('', className)}>
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        style={{transform: 'rotate(-90deg)'}}
        className='relative'
      >
        {/* Base Circle */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill='transparent'
          strokeWidth={strokeWidth ?? circleStrokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset='0'
          className={cn('stroke-primary/25', circleClassName)}
        />
        {/* Progress */}
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth ?? progressStrokeWidth}
          strokeLinecap={shape}
          strokeDashoffset={percentage}
          fill='transparent'
          strokeDasharray={circumference}
          className={cn('stroke-primary', progressClassName)}
        />
      </svg>
    </div>
  );
};
