
import React, { Component } from 'react';
import './BingoBoard.css';
import Button from './Button/Button';
import BingoBoardNumber from './BingoBoardNumber/BingoBoardNumber'
import Table from 'react-bootstrap/Table';


class bNo {
    number: number
    picked: boolean

    constructor(number: number) {
        this.number = number
        this.picked = false;
    }
}


type BingoBoardState = {
    drawnNumbers: number[],
    boardNumbers: bNo[][]
    lastDrawnNumber: number
};

class BingoBoard extends Component<{}, BingoBoardState> {
    rows: number
    columns: number
    amountOfNumbers: number


    constructor(props: any) {
        super(props);
      
        this.rows = 10
        this.columns = 9
        this.amountOfNumbers = this.rows * this.columns

        this.state = this.emptyState()
    }

    generateBoardNumbers = (rows: number, columns: number) => {
        var numbers = []
        for (let r = 0; r<rows; r++) {
            numbers[r] = new Array(columns);
            for(let c = 0; c<this.columns; c++) {
                numbers[r][c] = new bNo(r+10*c+1)
            }
        }
        return numbers;
    }

    drawNumber = () => {
        do {
            var r = Math.floor(Math.random()*this.rows);
            var c = Math.floor(Math.random()*this.columns);
        } 
        while (this.state.boardNumbers[r][c].picked && this.state.drawnNumbers.length !== this.amountOfNumbers)

        if(this.state.drawnNumbers.length === this.amountOfNumbers) {
            alert("All numbers drawn. Resetting...")
            this.resetState();
        } else {
            this.setState((prev, props) => {
                prev.boardNumbers[r][c].picked = true
                prev.drawnNumbers.push(prev.boardNumbers[r][c].number)
                return {
                    boardNumbers: prev.boardNumbers,
                    drawnNumbers: prev.drawnNumbers,
                    lastDrawnNumber: prev.boardNumbers[r][c].number
                }
            })
        }
    }

    resetState = () => {
        this.setState((prev, props) => this.emptyState())
    }

    emptyState = () => {
        return {
            boardNumbers: this.generateBoardNumbers(this.rows, this.columns),
            drawnNumbers: [],
            lastDrawnNumber: 0
        }
    }

    
    render = () => {
        return (
            <div className="bingoBoard">
                <Table className="custom-table">
                    <tbody>
                        {this.state.boardNumbers.map((row, ri) => {
                            return (
                                <tr key= {ri}>
                                    {row.map((number, ci) => {
                                        return <BingoBoardNumber key={number.number} number={number.number} picked={number.picked}/>
                                    })}
                                </tr>
                            )
                            
                        })}
                    </tbody>
                </Table>
                <div className="buttons">
                    <Button
                        handleClick ={this.drawNumber}
                        buttonText = "Draw number"
                    ></Button>
                    <Button
                        handleClick = {this.resetState}
                        buttonText = "Reset"
                    ></Button>
                </div>
               
                <div className={this.state.lastDrawnNumber === 0 ? 'invisible' : ''}>
                    Last drawn number: {this.state.lastDrawnNumber}
                </div>
                
            </div>
        )

    }
}

export default BingoBoard;
