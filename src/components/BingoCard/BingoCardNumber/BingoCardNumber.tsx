import React, { Component } from 'react';
import './BingoCardNumber.css';

type BingoNumberState = { picked: boolean}
type BingoNumberProps = { 
    number: number,
    numberClicked: (element: any) => void,
    initialPickedValue:boolean
    clickable:boolean
}

class BingoNumber extends Component<BingoNumberProps, BingoNumberState> {
    constructor(props: any) {
        super(props)
        this.state = {
            picked: this.props.initialPickedValue,
        }
    }


    render = () => {
        return <td className={'number ' + (this.state.picked ? 'picked' : '')} onClick={this.handleClick}>{this.props.number}</td>
    }

    

    handleClick = () => {
        if(this.props.clickable) {
            this.setState((prev, props) => {
                return {
                    picked: !prev.picked
                }
            })
            this.props.numberClicked(this.props.number)
        }
    }
}

export default BingoNumber;