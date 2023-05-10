import React, { Children } from 'react'

import styles from './Button.module.css'

interface ButtonProps {
    type?: "button" | "submit";
    onClick?: () => void;
    red?:boolean;
    children: React.ReactNode;
}

const Button:React.FC <ButtonProps> = ({ type="button",onClick, red = false, children}) => {
  return (
    <button type={type} 
    className={`${styles.button} ${red && styles.redButton}`}
    onClick={onClick}   
    >
        {children}
    </button>
  )
}

export default Button