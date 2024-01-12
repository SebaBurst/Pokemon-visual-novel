import React, {useState} from 'react'
import '../css/battle.css'
import BG from '../assets/bg.png'
import Music from './Music'
import Battle from './Battle';
import Menu from './Menu';


function Move() {

    const [startGame, setStartGame] = useState(false);

    function start(){
        setStartGame(true)
    }
  return (
    <div>
        {startGame===false? (<div> 
        <div className='menu-bg'>
            <img src={BG}></img>
            <div className='menu-st'>
                <p onClick={start}>Iniciar Partida</p>
            </div>
        </div></div>):(<div><Menu/></div>)}
       
    </div>
  )
}

export default Move