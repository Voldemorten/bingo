
import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './BingoChecker.css';
import BingoCard from '../BingoCard/BingoCard';

type BingoCheckerState = {serialNo:number, filteredNumbers:number[][], showModal:boolean}
type BingoCheckerProps = {drawnNumbers: number[]}

class BingoChecker extends Component<BingoCheckerProps, BingoCheckerState> {
    serialNumberRef:any
    
    constructor(props: any) {
        super(props)
        this.serialNumberRef = React.createRef();
        this.state = {
            serialNo: 0,
            filteredNumbers: [[],[],[]],
            showModal: false,
        } 
    }
    
    // handleClick = () => {
    //     if(this.serialNumberRef.current.value) {
    //         console.log(this.serialNumberRef.current.value)
    //         let bingoCard = this.generateCardNumbers(this.serialNumberRef.current.value)
    //         bingoCard = bingoCard.map((row, ri) => {
    //             return row.filter(number => {
    //                 return this.props.drawnNumbers.indexOf(number) !== -1
    //             })
    //         })
    //         this.setState({filteredNumbers: bingoCard, serialNo: this.serialNumberRef.current.value})
    //     }
    // }
    
    // //This function is straight up copied from BingoCard
    // //TODO: find a different solution.
    // generateCardNumbers = (seed:number) => {
    //     var rng = seedrandom(seed+'');
    //     let numbers:number[] = []
    //     let columns:number[][] = [[],[],[],[],[],[],[],[],[]] //we can maximum have three numbers of each 10
    //     let rows:number[][] = [[],[],[]]
    //     let rowCounts: number[] = [0,0,0];
        
    //     //generate 15 distict numbers and sort them into columns
    //     while(numbers.length<15) {
    //         let t = Math.floor(rng()*90)+1;
    //         let tens = Math.floor((t/10)%10) //get 10's i.e. 10 = 1, 24 = 2, 68 = 6
    //         if(tens === 9) tens = 8 //special 90 case.
    //         let column = columns[tens] // get the column based on the 10-value.
    //         if(numbers.indexOf(t) === -1 && column.length < 3) {
    //             column.push(t)
    //             numbers.push(t)
    //         }
    //     }
    //     //sorting
    //     numbers.sort((a,b) => a-b) //needed for whatever reason.
    //     columns.forEach((c, i) => {
    //         c.sort((a, b) => a - b)
    //     })
        
    //     //insert three-value-columns first
    //     let threeC = columns.map((column) => {
    //         if(column.length === 3) return column
    //         return []
    //     })
        
    //     threeC.forEach((column, cIndex) => {
    //         column.forEach((no, rIndex) => {
    //             rows[rIndex][cIndex] = no;
    //             rowCounts[rIndex]++;
    //         })
    //     })
        
        
    //     let twoC = columns.map((column) => {
    //         if(column.length === 2) return column
    //         return []
    //     })
        
    //     //TWOS
    //     twoC.forEach((column, cIndex) => {
    //         var idxs:number[] = [];
    //         column.forEach((no, idx) => {
    //             let b = 0;
    //             while(idxs.length < column.length) {
    //                 let r = Math.floor(rng()*3);
    //                 if(rowCounts[r] < 5 && idxs.indexOf(r) === -1) {
    //                     idxs.push(r)
    //                     rowCounts[r]++
    //                 }
    //                 if(b++ === 100) {
    //                     console.log(numbers)
    //                     console.log(columns)
    //                     console.log("BROKEN");
    //                     break;
    //                 }
    //             }
    //         })
    //         idxs.sort();    
    //         idxs.forEach((idx, i) => {
    //             rows[idx][cIndex] = column[i]
    //         })
    //     })
        
        
    //     //ONES
    //     let oneC = columns.map((column) => {
    //         if(column.length === 1) return column
    //         return []
    //     })
        
    //     oneC.forEach((column, cIndex) => {
    //         if(column.length === 1) {
    //             let r = Math.floor(rng()*3);
    //             while(rowCounts[r] === 5) {
    //                 r = Math.floor(rng()*3)
    //             }
    //             rowCounts[r]++
    //             rows[r][cIndex] = column[0]
    //         }
    //     })
        
    //     return rows;
    // }
    
    // //TODO : LAV TIL MODAL!
    // formatFilteredNumbers = () => {
    //     let fullRows = this.state.filteredNumbers.map((row) => {
    //         return row.reduce((acc, current) => {
    //             return acc+1
    //         },0)
    //     });
    //     return (
    //         <div>
    //         <p>In the first row, bingo card {this.state.serialNo} has {fullRows[0]}, with the numbers {this.state.filteredNumbers[0]} </p>
    //         <p>In the second row, bingo card {this.state.serialNo} has {fullRows[1]}, with the numbers {this.state.filteredNumbers[1]} </p>
    //         <p>In the third row, bingo card {this.state.serialNo} has {fullRows[2]}, with the numbers {this.state.filteredNumbers[2]} </p>
    //         </div>
    //     )
    //}

    handleCloseModal = () => this.setState({showModal: false})
    handleOpenModal = () => {
        if(this.serialNumberRef.current.value) {
            // console.log(this.serialNumberRef.current.value)
            // //generates the card numbers, usind the serial number as a reference, which creates an identical copy. 
            // let bingoCard = this.generateCardNumbers(this.serialNumberRef.current.value)
            // bingoCard = bingoCard.map((row, ri) => {
            //     return row.filter(number => {
            //         return this.props.drawnNumbers.indexOf(number) !== -1
            //     })
            // })
            this.setState({
                //filteredNumbers: bingoCard, 
                serialNo: this.serialNumberRef.current.value,
                showModal: true
            })
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
                        {/* TODO: Disable this button when the field is empty. Can't do that with ref right now. Maybe look into componentDidMount */}
                        <Button variant="primary" onClick={this.handleOpenModal}>Check bingo card!</Button>
                    </InputGroup.Append>
                </InputGroup>

                <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Check bingo card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Immediately invoked function for conditional rendering */}
                        {(() => {
                            if(this.state.serialNo !== 0) return <BingoCard existingSeed={true} existingSeedValue={this.state.serialNo}/>
                        })()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        )
    }
}
            
export default BingoChecker;