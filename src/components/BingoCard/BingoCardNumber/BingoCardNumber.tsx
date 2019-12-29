import React, { Component } from 'react';
import './BingoCardNumber.css';

type BingoNumberState = { picked: boolean}
type BingoNumberProps = { number: number, numberClicked: (element: any) => void, row: number }

class BingoNumber extends Component<BingoNumberProps, BingoNumberState> {
    constructor(props: any) {
        super(props)
        this.state = {
            picked: false,
        }
    }

    render = () => {
        return <td className={'number ' + (this.state.picked ? 'picked' : '')} onClick={this.handleClick}>{this.props.number}</td>
    }

    

    handleClick = () => {
        
        this.setState((prev, props) => {
            return {
                picked: !prev.picked
            }
        })
        this.props.numberClicked({
            row: this.props.row,
            number: this.props.number
        })
    }
}

export default BingoNumber;