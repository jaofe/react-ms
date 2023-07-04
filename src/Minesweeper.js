import Board from "./components/Board";
import classes from "./minesweeper.module.css"

function Minesweeper() {
    return <div className={classes.game}>
        <a className={classes.title}>Mine Sweeper</a>
        <Board/></div>;
}

export default Minesweeper;