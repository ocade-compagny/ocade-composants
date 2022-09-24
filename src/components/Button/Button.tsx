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
  const classNames = `
    btn 
    ${ variant ? `btn-${variant}` : `` } 
    ${ shape ? "btn-rounded" : `` }
  `;
  return (
      <button className={classNames} {...props}>
        {children}
      </button>
  )
}
