import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import WeatherCard from './components/WeatherCard';
import BackgroundVideo from './components/BackgroundVideo';
/** https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} */

/** 9ed65db5e7e8417cbeb187cf9faa0d2f */

function App() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [city, setCity] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [background, setBackground] = useState();
  const [main, setMain] = useState(null);


  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 3000)

    const success = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    };
    const error = () => {
      setHasError(true);
      setIsLoading(false)
    }
    navigator.geolocation.getCurrentPosition(success, error)
  
  }, [])

  useEffect(() => {
    if(coords) {
      const API_KEY = '9ed65db5e7e8417cbeb187cf9faa0d2f'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const celcius = (res.data.main.temp -273).toFixed(1);
          const farenheit = ((celcius * 9) / 5 + 32).toFixed(1);
          setTemp({celcius, farenheit});
          setMain(parseInt(res.data.weather[0].id.toString()[0]));
          setMessageError(false);
        })
        .catch(err => {
          console.log(err)
          setMessageError(true);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
   
  }, [coords, city]);

  console.log(weather);
  console.log(main);

  const videoSrc = '/img/video-6.mp4'

  return (
    <div /*style={objStyles}*/ className="app flex-container">
    <BackgroundVideo videoSrc={videoSrc} className='background-video'/>
    {isLoading ? (
      <div>
        <h1>Loading...</h1>
        {showMessage && <p>Please activate location</p>}
      </div>
    ) : hasError ? (
      <h1>
        To obtain the weather of your city you must accept the permissions
      </h1>
    ) : (
      <WeatherCard weather={weather} temp={temp} city={city} setCity={setCity} messageError={messageError}/>
    )}
  </div>
);
}

export default App
