import Minesweeper from "./Minesweeper";
import './App.css'
import { BoardContextProvider } from "./board-context";


function App() {
  return (
    <div className="App">
    <BoardContextProvider>
      <Minesweeper />
    </BoardContextProvider>
    </div>
  );
}

export default App;
