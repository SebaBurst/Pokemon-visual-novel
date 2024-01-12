import React, { useState, useEffect } from 'react'
import prota1 from '../assets/prota1.png'
import prota2 from '../assets/prota2.png'
import prota2vs from '../assets/prota2_vs.png'
import prota1vs from '../assets/prota1_vs.png'
import '../css/battle.css'

function Customizer({ setProtaImage, setProtaName, setPokenumber, setMenu, setPoke }) {
    const [q1, setQ1] = useState(false)
    const [q2, setQ2] = useState(false)

    const [pq1, setPQ1] = useState(false)
    const [pq2, setPQ2] = useState(false)
    const [pq3, setPQ3] = useState(false)

    function selectQuestion(e, number) {
        if (number == 1) {
            setQ1(true)
            setQ2(false)
            setProtaImage(prota1vs)
            setProtaName('Hiro')
        }
        else {
            setQ1(false)
            setQ2(true)
            setProtaImage(prota2vs)
            setProtaName('Light')

        }
    }


    function selectPartner(e, number) {
        if (number == 1) {
            setPQ1(true)
            setPQ2(false)
            setPQ3(false)
            setPokenumber(1)
            setPoke('https://images.wikidexcdn.net/mwuploads/wikidex/4/43/latest/20200104184041/Riolu_EpEc.gif')
            //setProtaArt('../assets/prota1_vs.png')
            //setProtaName('Hiro')
        }
        else if (number == 2) {
            setPQ1(false)
            setPQ2(true)
            setPQ3(false)
            setPokenumber(2)
            setPoke('https://images.wikidexcdn.net/mwuploads/wikidex/c/cc/latest/20200308143606/Litten_EpEc.gif')


            //setProtaArt('../assets/prota1_vs.png')
            //setProtaName('Light')

        }
        else {
            setPQ2(false)
            setPQ3(true)
            setPQ1(false)
            setPokenumber(3)         
               setPoke('https://images.wikidexcdn.net/mwuploads/wikidex/b/b0/latest/20191201051400/Grookey_EpEc.gif')



        }
    }


    function startPoke() {
        if (q1 == true || q2 == true) {
            if (pq1 == true || pq2 == true || pq3 == true) {
                setMenu(false)
            }
        }
    }
    return (
        <div>
            <div className='title-protas'>
                <h1>Selecciona un protagonista</h1>
            </div>
            <div className='protas'>
                <div className='select-prota' onClick={(e) => selectQuestion(e, 1)} > {q1 === true ? (<div className='prota' style={{ backgroundColor: '#03009cb9' }} >
                    <img src={prota1}></img>  <p>Hiro</p>
                </div>) : (<div className='prota' >
                    <img src={prota1}></img>
                    <p>Hiro</p>
                </div>)}</div>

                <div className='select-prota' onClick={(e) => selectQuestion(e, 2)} >  {q2 === true ? (<div className='prota' style={{ backgroundColor: '#03009cb9' }} >
                    <img src={prota2}></img>
                    <p>Light</p>
                </div>) : (<div className='prota' >
                    <img src={prota2}></img>
                    <p>Light</p>
                </div>)}
                </div>
            </div>

            <div className='title-protas'>
                <h1>Selecciona un Compañero</h1>
            </div>
            <div className='pokemon-starter'>
                <div className='poke-choice' onClick={(e) => selectPartner(e, 1)}>

                    {pq1 === true ? (<div className='poke-item' style={{ backgroundColor: '#e74616b9' }}>
                        <img src='https://img.pokemondb.net/artwork/vector/large/riolu.png' />
                        <p>Riolu obtiene la capacidad de Megaevolucionar en batalla al convertirse en Lucario</p>
                    </div>) : (<div className='poke-item'>
                        <img src='https://img.pokemondb.net/artwork/vector/large/riolu.png' />
                        <p>Riolu obtiene la capacidad de Megaevolucionar en batalla al convertirse en Lucario</p>
                    </div>
                    )}


                </div>
                <div className='poke-choice' onClick={(e) => selectPartner(e, 2)}>
                    {pq2 === true ? (<div className='poke-item' style={{ backgroundColor: '#e74616b9' }}>
                        <img src='https://pokestop.io/img/pokemon/litten-256x256.png' />
                        <p>Litten es capaz de realizar movimientos Z durante la batalla</p>
                    </div>) : (<div className='poke-item' >
                        <img src='https://pokestop.io/img/pokemon/litten-256x256.png' />
                        <p>Litten es capaz de realizar movimientos Z durante la batalla</p> </div>)}



                </div>
                <div className='poke-choice' onClick={(e) => selectPartner(e, 3)}>
                    {pq3 === true ? (<div className='poke-item' style={{ backgroundColor: '#e74616b9' }}>
                        <img src='https://www.pngplay.com/wp-content/uploads/11/Grookey-Pokemon-PNG-Clipart-Background.png' />
                        <p>Grookey obtiene la capacidad de hacer Gigamax en batalla al convertirse en Rillabom</p>
                    </div>) : (<div className='poke-item'>
                        <img src='https://www.pngplay.com/wp-content/uploads/11/Grookey-Pokemon-PNG-Clipart-Background.png' />
                        <p>Grookey obtiene la capacidad de hacer Gigamax en batalla al convertirse en Rillabom</p>
                    </div>)}
                </div>
            </div>

            <div className='startGame'>
                <button onClick={startPoke}>Iniciar Juego</button>
            </div>
        </div>
    )
}

export default Customizer