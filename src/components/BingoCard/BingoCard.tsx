import React, { Component } from 'react';
import './Bingoboard.css';

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
    boardNumbers: bNo[][]
    lastDrawnNumber: number
};


class Bingoboard extends Component<{}, BingoCardState> {
    rows: number
    columns: number


    constructor(props: any) {
        super(props);
      
        this.rows = 3
        this.columns = 9

        this.state = this.emptyState()
    }

    resetState = () => {
        this.setState((prev, props) => this.emptyState())
    }

    emptyState = () => {
        return {
            boardNumbers: this.generateBoardNumbers(seed),
            drawnNumbers: [],
            lastDrawnNumber: 0
        }
    }
}

