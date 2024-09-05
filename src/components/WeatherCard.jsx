import React, { useRef } from 'react'
import { useState } from 'react'
import '../styles/WeatherCard.css'

const WeatherCard = ({weather, temp, city, setCity, messageError}) => {
  const [isCelcius, setIsCelcius] = useState(true)
  const changeDegrees = () => {
    setIsCelcius(!isCelcius)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(inputSearch.current.value);
  }

  const inputSearch = useRef();
  
  return (
    <section className='card flex-container'>
      <h1 className='card__title'>Wheather card</h1>
      <h2 className='card__country'>{weather?.name}, {weather?.sys.country}</h2>
      <form onSubmit={handleSubmit}>
    <input ref={inputSearch} type="search" placeholder='Search by city'/>
    <button>Search</button>
      </form>
      {messageError && <p>{city} doesn't exist</p>}
      <article className='card__body grid-container'>
        <div className='card__image-container'>
          <img className='card__image' src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt={weather?.weather[0].main} />
        </div>
        <article className='info grid-container'>
          <h3 className='info__title'>{weather?.weather[0].description}</h3>
          <ul className='info__list grid-container'>
            <li className='info__item grid-container'><span className='info__label'>Wind speed: </span><span className='info__value'>{weather?.wind.speed}</span></li>
            <li className='info__item grid-container'><span className='info__label'>Clouds: </span><span className='info__value'>{weather?.clouds.all}</span></li>
            <li className='info__item grid-container'><span className='info__label'>Pressure: </span><span className='info__value'>{weather?.main.pressure}</span></li>
          </ul>
        </article>
      </article>
      <h2 className='card__temp'>{isCelcius ? `${temp?.celcius} ºC` : `${temp?.farenheit} F`}</h2>
    <button className="card__btn" onClick={changeDegrees}>Change to {isCelcius ? 'F' : 'ºC'}</button>
    </section>
  )
}

export default WeatherCard
