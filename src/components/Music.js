import React, { useState, useEffect } from 'react';

function Music({ url, stop }) {
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audio, setAudio] = useState(new Audio(url));

  console.log(url)
  useEffect(() => {
    if (stop === false) {
      audio.pause();
    } else {
      audio.src = url;
      audio.volume = 0.1;
      audio.loop = true;

      // Cargar y reproducir el audio cuando la URL cambie
      audio.load();
      audio.play();
      setAudioLoaded(true);
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [url, stop]);

  useEffect(() => {
    setAudio(new Audio(url)); // Actualizar el audio si la URL cambia
  }, [url]);

  return <div></div>;
}

export default Music;
