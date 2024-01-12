import React, { useState, useEffect } from 'react';
import '../css/story.css';
import db from '../stories.json';
import db2 from '../battles.json';

import blip from '../assets/music/blip.mp3';
import Music from './Music';




function Story({ setUrlAudio,
    setContinues, setStory, nivel,
    stopMusic, setRivalDamage, setRivalName,
    setRivalPokemon, setRivalLife, setRivalImage,
    setLose, setCount, battleCount, setImageSize,
    setBattleBG, startLevel }) {

    const [characterName, setCharacterName] = useState('')

    const [audio] = useState(new Audio(blip));
    const [audio2] = useState(new Audio());

    const [chapterTitle, setChapter] = useState('');
    const [dialog, setDialog] = useState('');
    const [countDialog, setCountDialog] = useState(1);
    const [mugSprite, setMugSprite] = useState('');
    const [countDialogMax, setCountDialogMax] = useState(1);
    const [typingEffect, setTypingEffect] = useState('');
    const [goBattle, setGoBattle] = useState(false);
    const [stop, setStop] = useState(true)
    const [backgroundMusic, setBackgroundMusic] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [musicKey, setMusicKey] = useState(0); // Nuevo estado para forzar la actualización del componente Music

    useEffect(() => {
        audio.addEventListener('ended', () => {
            // Cuando el audio haya terminado, inicia el nuevo diálogo
            nextDialog();
        });

        return () => {
            audio.pause(); // Pausa el audio cuando el componente se desmonta
        };
    }, [audio]);

    useEffect(() => {
        console.log("NVamos a colocar nueva musica")

        const fetchData = async () => {
            const questionData = db['story'][nivel];
            setChapter(questionData.title);
            const dialog3 = db['story'][nivel][1];
            setCountDialogMax(dialog3.cantidad);

            let d = "dialogo" + countDialog;
            let d2 = "mug" + countDialog;
            let d3 = "back" + countDialog;
            const dialog = db['story'][nivel][1][d];
            let music = "music" + countDialog
            const mu = db['story'][nivel][1][music];

            if (mu != "") {
                changeBackgroundMusic(mu)
                setUrlAudio(mu)

            }

            const dialog2 = db['story'][nivel][1][d2];
            const dialog5 = db['story'][nivel][1][d3];
            setBgState(dialog5)

            
            const dialogo = dialog
            const dialogoSinNombre = dialogo.substring(dialogo.indexOf(':') + 1).trim();

            const nombrePersonaje = dialogo.match(/^[^:]+/)[0].trim();
            setDialog(dialogoSinNombre);
            if(nombrePersonaje === dialogoSinNombre){
                setCharacterName("Narrador")
            }
            else{
                setCharacterName(nombrePersonaje);
            }
            setDialog(dialogoSinNombre);
            setMugSprite(dialog2);
        };

        fetchData();
    }, [countDialog]);

    const [bgState, setBgState] = useState('');
    const divStyle = {
        backgroundImage: `url(${bgState})`,
    };

    function playAudio() {
        audio.loop = true; // Configurar el bucle infinito
        audio.currentTime = 0; // Reinicia el audio al principio
        audio.play();
    }

    useEffect(() => {
        if (dialog !== '') {
            const speed = 40; // Velocidad de escritura en milisegundos
            let index = 0;
            const interval = setInterval(() => {
                if (index < dialog.length) {
                    setTypingEffect(dialog.substring(0, index + 1));
                    index++;
                } else {
                    audio.pause()
                    clearInterval(interval);
                }
            }, speed);
        }
    }, [dialog]);


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
    function nextDialog() {
        //Agregar condiciones para no tener que poner los mugshots mas de una vez al igual que los fondos de la historia
        let dia = countDialog + 1;
        if (dia <= countDialogMax) {
            let d = "dialogo" + dia;
            let d2 = "mug" + dia;
            let d3 = "back" + dia;
            const dialog5 = db['story'][nivel][1][d3];
            setBgState(dialog5)
            const dialog = db['story'][nivel][1][d];
            const dialog2 = db['story'][nivel][1][d2];
            playAudio(); // Reproduce el audio cada vez que cambie el diálogo
            setBgState(dialog5)
            setBattleBG(dialog5)



        
            let music = "music" + dia
            const mu = db['story'][nivel][1][music];

            if (mu != "") {
                changeBackgroundMusic(mu)
                setUrlAudio(mu)

            }
            const dialogo = dialog
            const dialogoSinNombre = dialogo.substring(dialogo.indexOf(':') + 1).trim();

            const nombrePersonaje = dialogo.match(/^[^:]+/)[0].trim();
            setDialog(dialogoSinNombre);
            if(nombrePersonaje === dialogoSinNombre){
                setCharacterName("Narrador")
            }
            else{
                setCharacterName(nombrePersonaje);
            }
            setCountDialog(countDialog + 1);
            setMugSprite(dialog2);
            setTypingEffect(''); // Resetea el efecto de escritura para el nuevo diálogo
        }
        else {
            setGoBattle(true)
        }
    }


    function battleStart() {
        setStory(false);
        audio2.pause()
        setImageSize('40%')
        setContinues(false)


    }


    function battleStartNext() {
        setImageSize('80%')
        setContinues(false)
        const questionData2 = db2['ocho_maestros'][battleCount+1];
        console.log("battle: " + battleCount)
        console.log(questionData2)
        setRivalName(questionData2.name)
        setRivalImage(questionData2.art)
        setRivalPokemon(questionData2.pokemon)
        // Actualizar el estado con la primera pregunta
        setRivalLife(questionData2.hp);
        setRivalDamage(0)
        setLose(false)
        setCount(battleCount + 1)
        setStory(false);
        audio2.pause()
    }
    return (
        <div>
            {backgroundMusic != "" ? (<div></div>) : (<div></div>)}

            <div className='chapter-bg' style={{ backgroundImage: `url(${bgState})` }}>
                <div className='story-bg'>
                    <div className='mugshots'>
                        <div className='mug'>
                            <img src={mugSprite} />
                        </div>
                    </div>
                    <div className='textbox-name'>
                        <h1>{characterName}</h1>
                    </div>
                    <div className='textbox' onClick={nextDialog}>

                        <p>{typingEffect}</p>
                    </div>
                    {goBattle ? (
                        <div>
                            {nivel >= (startLevel + 1) ? (<div><button  className =  "startButton" onClick={battleStartNext}>Comenzar Batalla</button>
                            </div>) : (<div><button  className = "startButton" onClick={battleStart}>Comenzar Batalla</button></div>)}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default Story;
