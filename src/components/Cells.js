import React, { useContext } from 'react';
import classes from './cells.module.css';
import boardContext from '../board-context';

function Cells({ row, column }) {
  const { mines, states, flags, revealMine, flag, unflag } = useContext(boardContext);
  const isMineRevealed = states[row][column];
  const isFlagged = flags[row][column];
  const mineValue = mines[row][column];

  const handleRightClick = (e) => {
    e.preventDefault();
    if (isMineRevealed) {
      return;
    }
    if(isFlagged) {
      unflag(row, column);
    } else {
      flag(row, column);
    }

  };

  const handleLeftClick = () => {
    if (!isFlagged) {
      revealMine(row, column);
    }
  };

  return (
    <div className={classes.cell} onClick={handleLeftClick} onContextMenu={handleRightClick}>
      {isMineRevealed ? <div className={classes.revealed}>{mineValue}</div> : <div className={classes.not_revealed}>{isFlagged ? 'F' :('')}</div>}
    </div>
  );
}

export default Cells;
