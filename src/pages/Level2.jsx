import React, { useState, useEffect } from "react";

const Puzzle = ({ gridSize = 4, imageUrl = "/images/puzzle.png" }) => {
    const totalTiles = gridSize * gridSize;
    const initialBoard = Array.from(
        { length: totalTiles },
        (_, i) => (i + 1) % totalTiles
    );

    const isSolvable = (arr) => {
        let inversions = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] !== 0 && arr[j] !== 0 && arr[i] > arr[j]) {
                    inversions++;
                }
            }
        }
        if (gridSize % 2 !== 0) {
            return inversions % 2 === 0;
        } else {
            const blankIndex = arr.indexOf(0);
            const rowFromTop = Math.floor(blankIndex / gridSize);
            const rowFromBottom = gridSize - rowFromTop;
            return (
                (rowFromBottom % 2 === 1 && inversions % 2 === 0) ||
                (rowFromBottom % 2 === 0 && inversions % 2 === 1)
            );
        }
    };

    const isSolved = (arr) => {
        return arr.every((val, i) => val === initialBoard[i]);
    };

    const getShuffledBoard = () => {
        let arr = [...initialBoard];
        do {
            arr = arr.sort(() => Math.random() - 0.5);
        } while (!isSolvable(arr) || isSolved(arr));
        return arr;
    };

    const [board, setBoard] = useState(() => {
        const savedBoard = localStorage.getItem("puzzleBoard");
        if (savedBoard) {
            const parsed = JSON.parse(savedBoard);
            if (
                parsed.length === totalTiles &&
                isSolvable(parsed) &&
                !isSolved(parsed)
            ) {
                return parsed;
            }
        }
        return getShuffledBoard();
    });

    const [moveCount, setMoveCount] = useState(() => {
        const savedMoveCount = localStorage.getItem("puzzleMoveCount");
        return savedMoveCount ? JSON.parse(savedMoveCount) : 0;
    });

    useEffect(() => {
        localStorage.setItem("puzzleBoard", JSON.stringify(board));
        localStorage.setItem("puzzleMoveCount", JSON.stringify(moveCount));
    }, [board, moveCount]);

    useEffect(() => {
        const savedBoard = localStorage.getItem("puzzleBoard");
        let shouldReset = false;
        if (savedBoard) {
            const parsed = JSON.parse(savedBoard);
            if (parsed.length !== totalTiles) {
                shouldReset = true;
            }
        } else {
            shouldReset = true;
        }
        if (shouldReset) {
            setBoard(getShuffledBoard());
            setMoveCount(0);
        }
    }, [gridSize, totalTiles]);

    const moveTile = (index) => {
        const blankIndex = board.indexOf(0);
        if (isAdjacent(index, blankIndex)) {
            const newBoard = [...board];
            [newBoard[index], newBoard[blankIndex]] = [
                newBoard[blankIndex],
                newBoard[index],
            ];
            setBoard(newBoard);
            setMoveCount((prev) => prev + 1);
            if (isSolved(newBoard)) {
                setTimeout(() => alert("Puzzle solved!"), 100);
            }
        }
    };

    const isAdjacent = (index1, index2) => {
        const row1 = Math.floor(index1 / gridSize);
        const col1 = index1 % gridSize;
        const row2 = Math.floor(index2 / gridSize);
        const col2 = index2 % gridSize;
        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: 'url("images/level2image1.jpeg")' }}
        >
            {/* Frame container with its own background image */}
            <div
                className="relative"
                // style={{
                //     width: "650px",
                //     height: "650px",
                //     backgroundImage: 'url("images/level2image.jpg")',
                //     backgroundSize: "contain",
                //     backgroundRepeat: "no-repeat",
                //     backgroundPosition: "center",
                // }}
            >
                {/* Puzzle grid centered inside the frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[600px]">
                        <div className="mb-4 text-center">
                            <span className="text-xl font-bold text-white">
                                Moves: {moveCount}
                            </span>
                        </div>
                        <div
                            className="grid gap-1 p-12 rounded-[100px]"
                            style={{
                                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                                width: "650px",
                                height: "650px",
                                backgroundImage:
                                    'url("images/level2image.jpg")',
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                            }}
                        >
                            {board.map((value, index) => {
                                const tileStyle =
                                    value !== 0
                                        ? {
                                              backgroundImage: `url(${imageUrl})`,
                                              backgroundSize: `${
                                                  gridSize * 100
                                              }% ${gridSize * 100}%`,
                                              backgroundPosition: (() => {
                                                  const tileIndex = value - 1;
                                                  const row = Math.floor(
                                                      tileIndex / gridSize
                                                  );
                                                  const col =
                                                      tileIndex % gridSize;
                                                  return `-${col * 100}% -${
                                                      row * 100
                                                  }%`;
                                              })(),
                                          }
                                        : {};
                                return (
                                    <div
                                        key={index}
                                        onClick={() => moveTile(index)}
                                        className={`border ${
                                            value !== 0
                                                ? "cursor-pointer"
                                                : "bg-gray-200"
                                        }`}
                                        style={{
                                            paddingTop: "100%",
                                            position: "relative",
                                        }}
                                    >
                                        {value !== 0 && (
                                            <div
                                                className="absolute inset-0"
                                                style={tileStyle}
                                            ></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Puzzle;
