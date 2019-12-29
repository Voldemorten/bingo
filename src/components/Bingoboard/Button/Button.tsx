
import React from 'react';
import './Button.css';


type buttonProps = {
    handleClick: () => void,
    buttonText: string
  }
  

const Button: React.FC<buttonProps> = ({handleClick, buttonText}) => {
    return <button onClick={handleClick} type="button" className="btn btn-primary">{buttonText}</button>
}

export default Button;
