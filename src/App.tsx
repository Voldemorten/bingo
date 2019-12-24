import React from 'react';
import './App.css';
import Bingoboard from './components/Bingoboard/Bingoboard';
import 'bootstrap/dist/css/bootstrap.min.css';



const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        Velkommen til Mortens bingo!
      </header>
      <Bingoboard></Bingoboard>
    </div>
  );
}

export default App;
