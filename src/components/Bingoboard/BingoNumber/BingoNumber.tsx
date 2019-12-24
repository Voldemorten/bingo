import React, { Component } from 'react';
import './BingoNumber.css';

//type BingoNumberState = { picked: boolean}
type BingoNumberProps = { number: number, picked: boolean }

class BingoNumber extends Component<BingoNumberProps, any> {
    constructor(props: any) {
        super(props)
        // this.state = {
        //     picked: false
        // }
    }

    render = () => {
        return <td className={'number ' + (this.props.picked ? 'picked' : '')}>{this.props.number}</td>
    }
}

export default BingoNumber;