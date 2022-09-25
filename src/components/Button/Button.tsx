import React from 'react'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant: `contained` | `outlined` | `text`
  shape?: boolean
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  shape,
  ...props
}) => {
  return (
      <button className={`
          btn 
          ${ variant ? `btn-${variant}` : `` } 
          ${ shape ? "btn-rounded" : `` }
        `} 
        {...props}>
        {children}
      </button>
  )
}
