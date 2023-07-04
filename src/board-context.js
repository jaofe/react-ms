import { createContext, useState } from "react";

const boardContext = createContext({
    mines: [],
    states: [],
    flags: [],
    revealMine: () => { },
    flag: () => { },
    unflag: () => { },
});

export function BoardContextProvider(props) {
    const [mineState, setMineState] = useState({
        mines: [
            [" ", " ", " ", " ", " ", " ", " ", "2", "*", "2", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", "3", "*", "3", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", "3", "*", "3", " ", " ", " ", " ", " ", " ", " ", " "],
            ["1", "1", "1", " ", " ", "1", "2", "4", "*", "2", " ", " ", " ", " ", " ", " ", " ", " "],
            ["2", "*", "1", " ", " ", "1", "*", "*", "2", "1", " ", " ", " ", " ", " ", " ", " ", " "],
            ["*", "3", "2", " ", " ", "1", "2", "2", "1", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            ["2", "*", "1", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            ["1", "1", "1", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", "1", "1", "1", " ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " ", " ", "1", "*", "1", " ", " ", " ", " ", " ", " ", " "]
        ],
        states: [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        ],
        flags: [
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
        ]
    });

    function revealMineHandler(row, column) {
        setMineState((prevMineState) => {
            const newUnflagged = [prevMineState.unflagged];
            const newStates = [...prevMineState.states];
            const newFlags = [...prevMineState.flags];
            newStates[row][column] = true;

            if (prevMineState.mines[row][column] === " ") {
                const rows = prevMineState.mines.length;
                const columns = prevMineState.mines[0].length;
                const directions = [
                    [1, 1],
                    [-1, 1],
                    [1, -1],
                    [-1, -1],
                    [0, 1],
                    [0, -1],
                    [1, 0],
                    [-1, 0],];
                const revealCell = (r, c) => {
                    if (r >= 0 && r < rows && c >= 0 && c < columns && !newStates[r][c] && !newFlags[r][c]) {
                        newStates[r][c] = true;
                        if (prevMineState.mines[r][c] === " ") {
                            directions.forEach(([dx, dy]) => {
                                revealCell(r + dx, c + dy);
                            });
                        }
                    }
                };

                directions.forEach(([dx, dy]) => {
                    revealCell(row + dx, column + dy);
                });
            }
            return {
                ...prevMineState,
                states: newStates,
            };
        });
    }

    function flagHandler(row, column) {
        setMineState((prevMineState) => {
            const newFlags = [...prevMineState.flags];
            newFlags[row][column] = true;
            return {
                ...prevMineState,
                flags: newFlags
            };
        });
    }

    function unflagHandler(row, column) {
        setMineState((prevMineState) => {
            const newFlags = [...prevMineState.flags];
            newFlags[row][column] = false;
            return {
                ...prevMineState,
                flags: newFlags
            };
        });
    }


    const context = {
        mines: mineState.mines,
        states: mineState.states,
        flags: mineState.flags,
        revealMine: revealMineHandler,
        flag: flagHandler,
        unflag: unflagHandler,
    };

    return (
        <boardContext.Provider value={context}>
            {props.children}
        </boardContext.Provider>
    );
}

export default boardContext;