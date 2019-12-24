import React, { Component } from 'react';
import './BingoCard.css';
import seedrandom from 'seedrandom';

class bNo {
    number: number
    picked: boolean

    constructor(number: number) {
        this.number = number
        this.picked = false;
    }
}

type BingoCardState = {
    drawnNumbers: number[],
    boardNumbers: bNo[][],
    serialNo: number
};


class BingoCard extends Component<{}, BingoCardState> {
    rows: number
    columns: number
    numbersPerRow: number


    constructor(props: any) {
        super(props);
      
        this.rows = 3
        this.columns = 9
        this.numbersPerRow = 5

        this.state = this.emptyState()

        this.generateBoardNumbers(42);
    }

    resetState = () => {
        this.setState((prev, props) => this.emptyState())
    }

    emptyState = () => {
        return {
            boardNumbers: [],
            drawnNumbers: [],
            serialNo: Math.ceil(Math.random()*10_000_000)
        }
    }

    generateBoardNumbers = (seed:number) => {
        var rng = seedrandom(seed+'');
        let numbers:number[] = []
        let columns:bNo[][] = [] //we can maximum have three numbers of each 10
        
        for (let i = 0; i < this.columns; i++) {
            columns[i] = new Array()
        }

        //generate 15 numbers
        while(numbers.length<15) {
            let t = Math.floor(rng()*90)+1;
            let tens = Math.floor((t/10)%10)
            //let ones = t%10
            let column = columns[tens]
            if(numbers.indexOf(t) === -1 && column.length < 3) {
                column.push(new bNo(t))
                numbers.push(t)
            }
        }
        //sorting
        numbers.sort()
        columns.forEach((c, i) => {
            c.sort((a, b) => {
                return a.number - b.number
            })
        })

        //TODO transpose columns! DO ROWS INSTEAD!
        console.log(columns)
    

        
 
    }

    render = () => {
        return (
            <p>{this.state.serialNo}</p>
        )
    }
}

export default BingoCard;

