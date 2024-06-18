import { useState, useEffect, useMemo } from 'react';
import Weather from './weatherBg/weather';


export const WeatherBg = () => {
  const [weatherState, setWeatherState] = useState('sunny');
  const [showTime, setShowTime] = useState(true);

  useEffect(() => {
    setWeatherState('rain ');
  }, []);

  const navItems = useMemo(() => [
    { condition: 'sunny', icon: 'icon--sun', text: '맑음' },
    { condition: 'drizzle', icon: 'icon--drizzle', text: '이슬비' },
    { condition: 'rain', icon: 'icon--rainy', text: '비' },
    { condition: 'storm', icon: 'icon--storm', text: '폭우' },
  ], []);

  return (
    <>
      <Weather type={weatherState} />
    </>
  )
}