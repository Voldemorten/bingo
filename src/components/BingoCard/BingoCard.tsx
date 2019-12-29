import React, { Component } from 'react';
import './BingoCard.css';
import seedrandom from 'seedrandom';
import BingoCardNumber from './BingoCardNumber/BingoCardNumber';
import Table from 'react-bootstrap/Table'


type BingoCardState = {
    pickedNumbers: number[],
    cardNumbers: number[][],
    serialNo: number
};

//this is for checing the card as admin. 
type BingoCardProps = {
    existingSeed: boolean
    existingSeedValue?: number
    drawnNumbers?: number[]
    clickable: boolean
}


class BingoCard extends Component<BingoCardProps, BingoCardState> {
    rows: number
    columns: number
    numbersPerRow: number


    constructor(props: any) {
        super(props);
      
        this.rows = 3
        this.columns = 9
        this.numbersPerRow = 5

        //set state based on existing seed. If a seed has been sent, use that seed to generate the numbers. 
        if(this.props.existingSeed) {
            this.state = this.serialState(this.props.existingSeedValue)
        } else {
            this.state = this.serialState()
        }
        // this.printBingoCard(this.state.cardNumbers);
    }

    markAllDrawnNumbers = (cardNumbers:number[][]) => {
        let pickedNumbers:number[] = []
        cardNumbers.forEach((row) => {
            row.forEach((number) => {
                if(this.props.drawnNumbers?.indexOf(number) !== -1) pickedNumbers.push(number)
            })
        })
        return pickedNumbers
        // this.setState((prev, props) => {
        //     return {
        //         pickedNumbers:pickedNumbers
        //     }
        // })
    }

    resetState = () => {
        this.setState((prev, props) => this.serialState())
    }

    // TODO: refactor this shit. It's fucking horrible. But it works. 
    serialState = (serialNo?:number) => {
        let initPickNumbers = true;

        let pickedNumbers:number[] = []
        
        if(!serialNo) {
            serialNo = Math.ceil(Math.random()*9999)
            initPickNumbers = false;
        }
        let cardNumbers = this.addNullNumbers(this.generateCardNumbers(serialNo))
        
        if(initPickNumbers) {
            pickedNumbers = this.markAllDrawnNumbers(cardNumbers)
        }

        return {
            pickedNumbers: pickedNumbers,
            serialNo: serialNo,
            cardNumbers: cardNumbers,
        }
    }

    numberIsPicked = (number:number) => {
        return this.state.pickedNumbers.indexOf(number) !== -1;
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
                column.forEach(() => {
                    while(idxs.length < column.length) {
                        let r = Math.floor(rng()*3);
                        if(rowCounts[r] < 5 && idxs.indexOf(r) === -1) {
                            idxs.push(r)
                            rowCounts[r]++
                        }
                    }
                })
            idxs.sort();    
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

        return rows;
    }

    addNullNumbers = (rows:number[][]) => {
        //note: not using map because it doesn't map over undefined. 
        let newRows:any[][] = [[],[],[]]
        for(let r = 0; r<rows.length; r++) {
            //hack to make sure all arrays are of length 9 even though element are only assigned to first x columns. 
            rows[r].length = 9;
            for(let c = 0; c<rows[r].length; c++) {
                if(!rows[r][c]) newRows[r][c] = null
                else newRows[r][c] = rows[r][c]
            }
        }
        return newRows
    }

    printBingoCard = (rows:number[][]) => {
        let nos = rows.map(row => row.map(no => {
            if (no) return no
            return null
        }))
        console.table(nos);
    }

    clickNumber = (numberFromChild: number) => {
        let objectFound = false;
        this.state.pickedNumbers.forEach((number) => {
            if(number === numberFromChild) objectFound = true;
        })
        //number not found => add
        if(!objectFound) {
            this.setState((prev) => {
                prev.pickedNumbers.push(numberFromChild);
                return {
                    pickedNumbers: prev.pickedNumbers
                }
            })
        } else { //remove
            this.setState((prev) => {
                let newNumbers = prev.pickedNumbers.filter(number => number !== numberFromChild)
                return {
                    pickedNumbers: newNumbers
                }
            })
        }
    }

    render = () => {
        return (
            <div className="bingoCard">
                <Table className="custom-table">
                    <tbody>
                        {this.state.cardNumbers.map((row, ri) => {
                            return (
                                <tr key={ri}>                                    
                                    {row.map((number, ci) => {
                                        //number might be undefined
                                        if(number) {
                                            return (
                                                <BingoCardNumber 
                                                    key={ri*9+ci}
                                                    number={number}
                                                    numberClicked={this.clickNumber}
                                                    initialPickedValue={this.numberIsPicked(number)}
                                                    clickable={this.props.clickable}
                                                />
                                            )
                                        }
                                        return <td key={ri*9+ci}></td>;
                                    })}
                                </tr>
                            ) 
                        })}
                    </tbody>
                </Table>
                <div className="serialNo">
                    Serial no: {this.state.serialNo}
                </div>
            </div>
        )
    }
}

export default BingoCard;

