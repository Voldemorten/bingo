
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

    handleCloseModal = () => this.setState({showModal: false})
    handleOpenModal = () => {
        if(this.serialNumberRef.current.value) {
            this.setState({
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
                            if(this.state.serialNo !== 0) return <BingoCard existingSeed={true} existingSeedValue={this.state.serialNo} drawnNumbers={this.props.drawnNumbers} clickable={false}/>
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