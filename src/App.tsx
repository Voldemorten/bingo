import React from 'react';
import './App.css';
import BingoBoard from './components/BingoBoard/BingoBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
import BingoCard from './components/BingoCard/BingoCard';



const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        Velkommen til Mortens bingo!
      </header>
      <BingoBoard></BingoBoard>
      <BingoCard></BingoCard>
    </div>
  );
}

export default App;
