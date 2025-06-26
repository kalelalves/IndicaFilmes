import * as React from 'react'

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export const Text: React.FC<TextProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`text-[var(--color-text-base)] ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
