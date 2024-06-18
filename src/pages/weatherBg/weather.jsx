import { useEffect } from 'react';
import { loadTextures, cleanWeather } from './js/weather-utils';

export default function Weather({ type, textureOverrides = {} }) {
  useEffect(() => {
    loadTextures(textureOverrides);
    return () => {
      cleanWeather();
    };
  }, [textureOverrides]);

  return (
    <>
      <canvas width="1" height="1" id="container-weather"></canvas>
      <div className="slide" id="slide-1" data-weather={type}></div>
      <p className="nosupport">Sorry, but your browser does not support WebGL!</p>
    </>
  );
}
