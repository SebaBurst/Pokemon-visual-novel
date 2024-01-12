import React, { useState, useEffect } from 'react';
import Hada from '../assets/Hada.png'
import Fuego from '../assets/Fuego.png'
import Electrico from '../assets/Electrico.png'
import blip from '../assets/music/attack.mp3';

import Agua from '../assets/Agua.png'
import Planta from '../assets/Planta.png'
import Blanco from '../assets/t.png'



function Board({ setRivalDamage, setRivalLife, rivalDamage, setLose, max, level, rivalLife, setContinues, urlAudio }) {
    const [audio2] = useState(new Audio());

    const [audio] = useState(new Audio(blip));
    function playAudio() {
        audio.currentTime = 0; // Reinicia el audio al principio
        audio.volume = 0.1;
        audio.play();
    }

    const changeBackgroundMusic = (newUrl) => {
        if (newUrl !== '') {
            audio2.pause(); // Pausar la música actual, si se está reproduciendo
            audio2.src = newUrl;

            // Evento para cargar completamente la nueva música antes de reproducirla
            audio2.addEventListener('canplaythrough', () => {
                audio2.volume = 0.1;
                audio2.loop = true;
                audio2.play(); // Reproducir la nueva música una vez cargada
            });

            // Evento para manejar casos donde la carga de la nueva música falla
            audio2.addEventListener('error', () => {
                console.error('Error al cargar la música.');
            });
        }
    };
    const [score, setScore] = useState(0)
    const x = [0, 0, -1, 1]; // Movimientos en filas (arriba, abajo, izquierda, derecha)
    const y = [-1, 1, 0, 0]; //
    const generateRandomRow = () => {
        const newRow = [];
        for (let i = 0; i < 8; i++) {
            newRow.push(Math.floor(Math.random() * max) + 1);
        }
        return newRow;
    };

    const [matrix, setMatrix] = useState(() => {
        const initialRows = [
            Array(8).fill(0), // Cinco filas con ceros
            Array(8).fill(0),
            Array(8).fill(0),
            Array(8).fill(0),
            Array(8).fill(0),
        ];
        const randomRow = generateRandomRow(); // Generar una fila aleatoria inicial
        const randomRow2 = generateRandomRow(); // Generar una fila aleatoria inicial
        const randomRow3 = generateRandomRow(); // Generar una fila aleatoria inicial

        return [...initialRows, randomRow, randomRow2, randomRow3];
    });


    const checkRow = (matrix) => {
        const pruieba = matrix[0].some((value) => value !== 0)
        console.log("COmprobando final" + pruieba)
        return matrix[0].some((value) => value !== 0);
    };


    useEffect(() => {
        changeBackgroundMusic(urlAudio)
        if (rivalLife > rivalDamage) {
            const interval = setInterval(() => {
                console.log(matrix)
                const hasNonZero = tieneElementoNoCeroEnFila0(matrix);
                if (hasNonZero) {
                    console.log("El final")
                } else {
                    setMatrix((prevMatrix) => {
                        const updatedMatrix = [...prevMatrix];

                        const hasNonZero = tieneElementoNoCeroEnFila0(updatedMatrix);
                        if (hasNonZero) {
                            console.log("Final Game")
                            //setLose(true)
                            return updatedMatrix;

                        }
                        else {

                            let newRow = generateRandomRow();
                            updatedMatrix.shift();
                            updatedMatrix.push(newRow);

                            // Llamar funciones de ajuste aquí
                            let aux = [];
                            aux = copy(aux, updatedMatrix);

                            // Aquí podrías hacer otras acciones según sea necesario con las funciones

                            return updatedMatrix;
                        }


                    });
                }

            }, 2000);

            return () => clearInterval(interval);
        }
    }, []);

    const countAdjacent = (i, j, aux, poder, valor) => {
        const x = [-1, 0, 0, 1];
        const y = [0, -1, 1, 0];

        if (aux[i][j] !== 0 && aux[i][j] !== -1) {
            let k = 0;
            aux[i][j] = 0;
            while (k < 4) {
                const nextI = i + x[k];
                const nextJ = j + y[k];

                if (
                    nextI >= 0 &&
                    nextI < aux.length &&
                    nextJ >= 0 &&
                    nextJ < aux[0].length &&
                    aux[nextI][nextJ] === valor
                ) {
                    poder = countAdjacent(nextI, nextJ, aux, poder + 1, valor);
                }
                k += 1;
            }
        }
        return poder;
    };


    const handleBlockClick = (rowIndex, colIndex) => {
        const number = matrix[rowIndex][colIndex];
        const adjacentCount = countAdjacent(rowIndex, colIndex, matrix, 0, number);
        if (adjacentCount > 1) {
            setScore(score + adjacentCount * 10 + 100 * level)
            setRivalDamage(rivalDamage + adjacentCount * 10 + 100 * level)
            playAudio()
            const newMatrix = [...matrix];
            replaceBlocks(rowIndex, colIndex, newMatrix, number);
            adjustUp(matrix);
            if (checkLastLine(matrix)) {
                if (checkDirection(matrix)) {
                    adjustToLeftBorder(matrix);
                } else {
                    adjustToRightBorder(matrix);
                }
            }
            setMatrix(newMatrix);
        }
    };
    const replaceBlocks = (i, j, matrix, number) => {
        const directions = [
            [0, 1],  // derecha
            [0, -1], // izquierda
            [1, 0],  // abajo
            [-1, 0], // arriba
        ];

        matrix[i][j] = 0; // Eliminamos el bloque actual

        for (const [dx, dy] of directions) {
            let newRow = i + dx;
            let newCol = j + dy;

            if (
                newRow >= 0 &&
                newRow < matrix.length &&
                newCol >= 0 &&
                newCol < matrix[0].length &&
                matrix[newRow][newCol] === number
            ) {
                replaceBlocks(newRow, newCol, matrix, number);
            }
        }
    };


    function tieneElementoNoCeroEnFila0(matriz) {
        for (let i = 0; i < matriz[0].length; i++) {
            if (matriz[0][i] !== 0) {

                return true; // Hay un elemento distinto de cero en la fila 0
            }
        }
        return false; // No hay elementos distintos de cero en la fila 0
    }

    function copy(aux, matrix) {
    }

    function adjustUp(matrix) {
        for (let k = 0; k < matrix.length / 2; k++) {
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 1; j < matrix.length - 1; j++) {
                    if (matrix[j][i] !== 0 && matrix[j + 1][i] === 0) {
                        let temp = matrix[j][i];
                        matrix[j][i] = matrix[j + 1][i];
                        matrix[j + 1][i] = temp;
                    }
                    if (matrix[j][i] === 0 && matrix[j - 1][i] !== 0) {
                        let temp = matrix[j - 1][i];
                        matrix[j - 1][i] = matrix[j][i];
                        matrix[j][i] = temp;
                    }
                }
            }
        }
    }

    function checkLastLine(matrix) {
        for (let i = 0; i < 8; i++) {
            if (matrix[7][i] === 0) {
                return true;
            }
        }
        return false;
    }

    function checkDirection(matrix) {
        let left = 0;
        let right = 0;

        for (let aux = 0; aux <= 3; aux++) {
            if (matrix[7][aux] !== 0) {
                left++;
            }
        }

        for (let aux = 4; aux < matrix.length; aux++) {
            if (matrix[7][aux] !== 0) {
                right++;
            }
        }

        return left < right ? true : false;
    }

    function adjustToLeftBorder(matrix) {
        for (let k = 1; k <= 2; k++) {
            for (let i = matrix.length - 1; i >= 0; i--) {
                for (let j = 3; j > 0; j--) {
                    if (matrix[i][j] === 0 && matrix[i][j - 1] !== 0) {
                        let temp = matrix[i][j - 1];
                        matrix[i][j - 1] = matrix[i][j];
                        matrix[i][j] = temp;
                    }
                }
            }
        }
    }

    function adjustToRightBorder(matrix) {
        for (let k = 1; k <= 2; k++) {
            for (let i = matrix.length - 1; i < matrix.length; i++) {
                for (let j = 4; j < matrix.length - 1; j++) {
                    if (matrix[i][j] === 0 && matrix[i][j + 1] !== 0) {
                        let temp = matrix[i][j + 1];
                        matrix[i][j + 1] = matrix[i][j];
                        matrix[i][j] = temp;
                    }
                }
            }
        }
    }

    function goStory() {
        setContinues(true)
        audio2.pause()
    }
    return (
        <div >
            {rivalDamage < rivalLife ? (<div> <table >
                <tbody>
                    {matrix.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={`${rowIndex}-${cellIndex}`} onClick={() => handleBlockClick(rowIndex, cellIndex)}>
                                    {/* Aquí debes usar las imágenes según el valor de la celda */}
                                    {cell === 0 ? (
                                        <img src={Blanco} alt={cell} style={{ width: '90%' }} />
                                    ) : cell === 1 ? (
                                        <img src={Fuego} alt={cell} style={{ width: '90%' }} />
                                    ) : cell === 2 ? (
                                        <img src={Agua} alt={cell} style={{ width: '90%' }} />
                                    ) : cell === 3 ? (
                                        <img src={Planta} alt={cell} style={{ width: '90%' }} />
                                    ) : cell === 4 ? (
                                        <img src={Hada} alt={cell} style={{ width: '90%' }} />
                                    ) : (
                                        <img src={Electrico} alt={cell} style={{ width: '90%' }} />
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table></div>) : (<div><button onClick={goStory}>Continuar</button></div>)}

        </div>



    );
}

export default Board;