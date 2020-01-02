import React, { Component } from 'react';
import './App.css';
import BingoBoard from './components/BingoBoard/BingoBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
import BingoCard from './components/BingoCard/BingoCard';
import BingoChecker from './components/BingoChecker/BingoChecker';
import MyButton from './components/MyButton/MyButton';

type AppState = {view:number, drawnNumbers:number[]}

class App extends Component<any, AppState> {
    constructor(props:any) {
        super(props)
        this.state = {
            view: 0,
            drawnNumbers: []
        }
    }

    callbackNumbers = (numbersFromBoard: number[], prevState: any) => {
        //to prevent infinity loop in component did update. Because this is called in the child component component did update 
        // check this : https://reactjs.org/docs/react-component.html#componentdidupdate
        if(this.state.drawnNumbers !== prevState.drawnNumbers) {
            this.setState({drawnNumbers: numbersFromBoard})
        }
    }
    
    render = () => {
        switch(this.state.view) {
            case 0: {
                return (
                    <div className="App">
                        <header className="App-header">
                        Velkommen til Mortens bingo!
                        </header>
                        <div className="buttons">
                            <MyButton handleClick={() => this.setState((prev, props) => {
                                return {
                                    view: 1
                                }
                            })} buttonText="Bingo board"/>
                            <MyButton handleClick={() => this.setState((prev, props) => {
                                return {
                                    view: 2
                                }
                            })} buttonText="Bingo card"/>
                        </div>
                        <div className="introDiv">
                            <p>
                            This is a small project built with react, typescript and bootstrap. 
                            <br/><br/>
                            When opening the project, you have two choices, bingo board and bingo card.
                            <br/><br/>
                            When you view the bingo board, this view is supposed to be put on a large screen for everyone to see. This is the facilitator's (bingo master's) screen. From here the bingo master is able to draw a random number between 1 and 90, like in a traditional bingo game. Furthermore the bingo master's screen has the opportunity to check a bingo plate given a serial number.
                            <br/><br/>
                            Everyone besides the bingo master (the players) choose the bingo card option. This generates a random bingo card with 3 rows each containing 5 numbers and a random serial number. This random serial number is used as the seed value to generate the bingo card, and thus when a player yells bingo, they can give the bingo master the serial number for the card, and the card can be checked. 
                            </p>
                        </div>
                    </div>
                    )
                }
                case 1: {
                    return (
                        <div className="App">
                            <BingoBoard getDrawnNumbers={this.callbackNumbers}/>
                            <BingoChecker drawnNumbers={this.state.drawnNumbers} />
                            <MyButton handleClick={() => this.setState((prev, props) => {
                                return {
                                    view: 0
                                }
                            })} buttonText="Go to front page"/>
                        </div>
                    )
                }
                case 2: {
                    return (
                        <div className="App">
                            <BingoCard existingSeed={false} clickable={true}/>
                            <BingoCard existingSeed={false} clickable={true}/>
                            <BingoCard existingSeed={false} clickable={true}/>
                            <MyButton handleClick={() => this.setState((prev, props) => {
                                return {
                                    view: 0
                                }
                            })} buttonText="Go to front page"/>
                        </div>
                    )
                        
                    }
                }
            }
        }
        
        export default App;
        