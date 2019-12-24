
import React from 'react';
import './DrawNumberButton.css';


type buttonProps = {
    handleClick: () => void,
    buttonText: string
  }
  

const DrawNumberButton: React.FC<buttonProps> = ({handleClick, buttonText}) => {
    return <button onClick={handleClick} type="button" className="btn btn-primary">{buttonText}</button>
}

export default DrawNumberButton;
