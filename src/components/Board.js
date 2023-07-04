import React, { useContext } from "react";
import boardContext from "../board-context";
import Cells from "./Cells";
import styles from "./board.module.css";

function Board() {
  const { states } = useContext(boardContext);

  return (
    <div className={styles.board}>
      {states.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, columnIndex) => (
            <Cells
              key={columnIndex}
              row={rowIndex}
              column={columnIndex}
              mine={cell}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;