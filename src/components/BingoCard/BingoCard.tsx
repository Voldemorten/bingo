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

    generateCardNumbers = (seed:number) => {
        var rng = seedrandom(seed+'');
        let numbers:number[] = []
        let columns:number[][] = [[],[],[],[],[],[],[],[],[]] //we can maximum have three numbers of each 10
        let rows:number[][] = [[],[],[]]
        let rowCounts: number[] = [0,0,0];

        //generate 15 distict numbers and sort them into columns
        while(numbers.length<15) {
            let t = Math.floor(rng()*90)+1;
            let tens = Math.floor((t/10)%10) //get 10's i.e. 10 = 1, 24 = 2, 68 = 6
            if(tens === 9) tens = 8 //special 90 case.
            let column = columns[tens] // get the column based on the 10-value.
            if(numbers.indexOf(t) === -1 && column.length < 3) {
                column.push(t)
                numbers.push(t)
            }
        }
        //sorting
        numbers.sort((a,b) => a-b) //needed for whatever reason.
        columns.forEach((c, i) => {
            c.sort((a, b) => a - b)
        })

        //insert three-value-columns first
        let threeC = columns.map((column) => {
            if(column.length === 3) return column
            return []
        })

        threeC.forEach((column, cIndex) => {
            column.forEach((no, rIndex) => {
                rows[rIndex][cIndex] = no;
                rowCounts[rIndex]++;
            })
        })


        let twoC = columns.map((column) => {
            if(column.length === 2) return column
            return []
        })

        //TWOS
        twoC.forEach((column, cIndex) => {
            var idxs:number[] = [];
                column.forEach((no, idx) => {
                    let b = 0;
                    while(idxs.length < column.length) {
                        let r = Math.floor(rng()*3);
                        if(rowCounts[r] < 5 && idxs.indexOf(r) === -1) {
                            idxs.push(r)
                            rowCounts[r]++
                        }
                        if(b++ === 100) {
                            console.log(numbers)
                            console.log(columns)
                            console.log("BROKEN");
                            break;
                        }
                    }
                })
            idxs.forEach((idx, i) => {
                rows[idx][cIndex] = column[i]
            })
        })


        //ONES
        let oneC = columns.map((column) => {
            if(column.length === 1) return column
            return []
        })

        oneC.forEach((column, cIndex) => {
            if(column.length === 1) {
                let r = Math.floor(rng()*3);
                while(rowCounts[r] === 5) {
                    r = Math.floor(rng()*3)
                }
                rowCounts[r]++
                rows[r][cIndex] = column[0]
            }
        })
    }

    render = () => {
        return (
            <p>{this.state.serialNo}</p>
        )
    }
}

export default BingoCard;

