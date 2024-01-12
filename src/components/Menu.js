import React, { useState, useEffect } from 'react'
import '../css/menu.css'
import prota from '../assets/prota1_vs.png'
import villan from '../assets/mugshots/red_vs.png'
import rival from '../assets/mugshots/nate_vs.png'
import Battle from './Battle'
function Menu() {
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(4);
  const [startStory, setStartStory] = useState(true);

  function selectChapter(start, end) {
    setStartChapter(start);
    setEndChapter(end);
    setStartStory(false);
  }


  return (

    <div>
      {startStory ? (<div className='menu'>
        <div className='menu-item' onClick={() => selectChapter(1,5)}> <img src={prota} /> Capitulo 1 - Los Recuerdos del Héroe</div>
        <div className='menu-item' onClick={() => selectChapter(6,9)}> <img src={villan} />Capitulo 2 - La Busqueda de los Maestros Celestiales</div>
        <div className='menu-item'> <img src={rival} /> Capitulo 3 - Rivales Confrontados</div>
      </div>) : (<div><Battle startChapter = {startChapter} endChapter ={endChapter} /></div>)}

    </div>
  )
}

export default Menu