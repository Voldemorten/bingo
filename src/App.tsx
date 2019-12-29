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
                            <BingoCard existingSeed={false}/>
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
        