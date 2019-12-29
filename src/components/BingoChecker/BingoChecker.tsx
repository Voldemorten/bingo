
import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './BingoChecker.css';

type BingoCheckerState = {serialNo:number}
type BingoCheckerProps = {drawnNumbers: number[]}

class BingoChecker extends Component<BingoCheckerProps, BingoCheckerState> {
    serialNumberRef:any

    constructor(props: any) {
        super(props)
        this.serialNumberRef = React.createRef();
        this.state = {
            serialNo: 0,
        } 
    }

    handleClick = () => {
        if(this.serialNumberRef.current.value) {
            console.log(this.serialNumberRef.current.value)
            console.log(this.props.drawnNumbers)
        }
    }

    render = () => {
        return (
            <div className="bingoChecker">
                <InputGroup>
                    <FormControl
                    placeholder="Serial number"
                    aria-label="Serial number"
                    ref={this.serialNumberRef}
                    />
                    <InputGroup.Append>
                    <Button variant="primary" onClick={this.handleClick}>Check bingo card!</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            
        )
    }
}

export default BingoChecker;