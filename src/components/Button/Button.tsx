import React from 'react'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant: `contained` | `outlined` | `text`
  shape?: boolean,
  icon?: string
}
export const Button: React.FC<ButtonProps> = ({
  variant,
  shape,
  icon,
  children,
  ...props
}) => {
  return (
      <button className={`
          btn 
          overide
          ${ variant ? `btn-${variant}` : `` } 
          ${ shape ? "btn-rounded" : `` }
        `} 
        {...props}>
        {icon && <img src={icon} alt="logo" />}
        {children}
      </button>
  )
}
