import React, { useState, useEffect } from 'react'
import '../css/battle.css'
import Board from './Board'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import Music from './Music';
import db from '../battles.json'
import prota from '../assets/prota1_vs.png'
import Customizer from './Customizer';
import { number } from 'mathjs';
import Story from './Story';

function Battle({startChapter, endChapter}) {


    const [override, setOverride] = useState(false);
    const [max, setMax] = useState(3)
    const [rivalname, setRivalName] = useState('')
    const [lose, setLose] = useState(false)
    const [rivalLife, setRivalLife] = useState(150000)
    const [rivalDamage, setRivalDamage] = useState(0)
    const [rivalPokemon, setRivalPokemon] = useState('');
    const [count, setCount] = useState(startChapter)
    const [rivalImage, setRivalImage] = useState('');
    const [continues, setContinues] = useState(false)
    const [protaName, setProtaName] = useState('');
    const [menu, setMenu] = useState(true);
    const [pokenumber, setPokenumber] = useState(startChapter)
    const [protaImage, setProtaImage] = useState('')
    const [poke, setPoke] = useState('')
    const [urlAudio, setUrlAudio] = useState('')

    const [story, setStory] = useState(true);
    const [battleBG, setBattleBG] = useState('')

    const [imageSize, setImageSize] = useState('40%')


    const divStyle = {
        backgroundImage: `url(${rivalImage})`,
    };

    const divProta = {
        backgroundImage: `url(${protaImage})`,
    };
    useEffect(() => {
        // Simulando una carga asíncrona desde el archivo JSON
        const fetchData = async () => {
            // Aquí podrías realizar una petición a una API o procesar los datos del archivo
            // En este ejemplo, se utiliza directamente el JSON importado
            const questionData = db['ocho_maestros'][count];
            setRivalName(questionData.name)
            setRivalImage(questionData.art)
            setImageSize('40%')
            setRivalPokemon(questionData.pokemon)
            console.log(questionData.pokemon)
            // Actualizar el estado con la primera pregunta
            setRivalLife(questionData.hp);
        };

        // Llamar a la función para obtener los datos
        fetchData();
    }, []);
    function getNextRival(next) {

        if (next >= 12) {
        }

        else {
            setImageSize('80%')
            // Aquí podrías realizar una petición a una API o procesar los datos del archivo
            // En este ejemplo, se utiliza directamente el JSON importado
            const questionData = db['ocho_maestros'][next];
            setRivalName(questionData.name)
            setRivalImage(questionData.art)
            setRivalPokemon(questionData.pokemon)
            // Actualizar el estado con la primera pregunta
            setRivalLife(questionData.hp);
            setRivalDamage(0)
            setLose(false)
            setCount(next)
        }


    }


    function megaShinka() {
        setPoke('https://media.tenor.com/zIZTssjPilUAAAAi/mega-lucario.gif');
        setRivalDamage(rivalDamage + rivalDamage * 0.5)
    }

    function Gigamax() {
        setPoke('https://www.pkparaiso.com/imagenes/espada_escudo/sprites/animados-gigante/rillaboom-gigantamax.gif');
        setRivalDamage(rivalDamage + rivalDamage * 1.5)
    }

    return (
        <>
            <div className='background-mega'>

                {lose == false ? (

                    <div>
                        {story == false ? (
                            <div>
                                {continues == false ? (
                                    <div className='battle-bg' style={{ backgroundImage: `url(${battleBG})` }}>
                                        <div className='board-bg'>
                                            <Board urlAudio={urlAudio} setContinues={setContinues} max={max} setRivalDamage={setRivalDamage} setRivalLife={setRivalLife} rivalLife={rivalLife} rivalDamage={rivalDamage} setLose={setLose} level={count} />
                                        </div>
                                        <div className='rival-bg'>

                                            <div className='battleHP'>
                                                <div className='progress-container'>
                                                    <Progress type="circle" percent={((rivalLife - rivalDamage) / rivalLife) * 100} status="success" theme={{ success: { color: '#96ff83', symbol: " " } }} />
                                                    <img className='character-image' src={rivalImage} alt={rivalname} />
                                                </div>
                                                <h1>{rivalname}</h1>
                                            </div>
                                            <div className='pokemon-sprite'>
                                                <img style={{ width: imageSize }} src={rivalPokemon}></img>
                                            </div>

                                        </div>
                                    </div>
                                ) : (<div>
                                    <Story setStory={setStory} nivel={count+1} stopMusic={false} setRivalName={setRivalName} battleCount={count} setContinues={setContinues}
                                        setRivalImage={setRivalImage}
                                        setCount={setCount}
                                        setBattleBG={setBattleBG}
                                        startLevel={startChapter}

                                        setUrlAudio={setUrlAudio}
                                        setImageSize={setImageSize}
                                        setRivalPokemon={setRivalPokemon}
                                        setRivalDamage={setRivalDamage} setRivalLife={setRivalLife} rivalDamage={rivalDamage} setLose={setLose} />
                                </div>)}

                            </div>) : (<div>
                                <Story setStory={setStory} nivel={count} stopMusic={false} setRivalName={setRivalName} battleCount={(count)}
                                    setRivalImage={setRivalDamage}
                                    setCount={setCount}
                                    setUrlAudio={setUrlAudio}
                                    setImageSize={setImageSize}
                                    startLevel={startChapter}
                                    setContinues={setContinues}
                                    setBattleBG={setBattleBG}
                                    setRivalPokemon={setRivalPokemon}
                                    setRivalDamage={setRivalDamage} setRivalLife={setRivalLife} rivalDamage={rivalDamage} setLose={setLose} />







                            </div>)}

                    </div>













                ) : (<div></div>)}
            </div>
        </>
    )
}

export default Battle