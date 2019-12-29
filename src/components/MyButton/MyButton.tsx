
import React from 'react';
import './MyButton.css';


type buttonProps = {
    handleClick: () => void,
    buttonText: string
  }
  

const MyButton: React.FC<buttonProps> = ({handleClick, buttonText}) => {
    return <button onClick={handleClick} type="button" className="btn btn-primary my-btn">{buttonText}</button>
}

export default MyButton;
