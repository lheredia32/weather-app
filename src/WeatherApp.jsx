import { useState } from "react"

export const WeatherApp = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'c1c21ac332843fde19af1fe8c6731c0f'
  const difKelvin = 273.15
  
  const [city, setCity] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [alerta, setAlerta] = useState('')

  const handleChangeCity = (e) => {
    console.log(e)
    setCity(e.target.value)
  }

  const handleSubmit =(e) => {
    e.preventDefault()
    if(city.length > 0) fetchWeather()
  }

  const fetchWeather = async () => {
    try{
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
      const dataJson = await response.json()
      if(dataJson.cod == 200) {
        setData(dataJson)
        setError(false)
        setAlerta('')
      }
      else{
        setAlerta(dataJson.message)
        setData(null)
        setError(true)
      }
      
    }catch(error){
      console.error('ERROR: ', error)
    }
  }

  return (
    <div className="container">
      <h1>Weather Forecast</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Write a city..."
          value={city}
          onChange={handleChangeCity}
        />
        <button type="submit">Search</button>
      </form>

      {
        error && (<div><strong>Something went wrong: {alerta}</strong></div>)
      }

      {
        data && (
          <div>
            <h2>{data.name}, {data?.sys?.country}</h2>
            <p><strong>Temp: </strong>{parseInt(data?.main?.temp - difKelvin)}°C</p>
            <p><strong>Main: </strong>{data.weather[0].main}</p>
            <p><strong>Description: </strong>{data.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
          </div>
        )
      }

    </div>
  )
}
