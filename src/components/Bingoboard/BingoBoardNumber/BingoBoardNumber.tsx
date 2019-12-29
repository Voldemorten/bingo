import React, { Component } from 'react';
import './BingoBoardNumber.css';

//type BingoNumberState = { picked: boolean}
type BingoBoardNumberProps = { number: number, picked: boolean }

class BingoBoardNumber extends Component<BingoBoardNumberProps, any> {
    render = () => {
        return <td className={'number ' + (this.props.picked ? 'picked' : '')}>{this.props.number}</td>
    }
}

export default BingoBoardNumber;