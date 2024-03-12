import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loader from './components/Loader'

function App() {
  
  const [coords, setcoords] = useState()
 const [weather, setweather] = useState()
 const [temp, settemp] = useState()
 const [isLoading, setisLoading] = useState(true) 
 
 const success = info => {
setcoords({
  lat: info.coords.latitude,
  lon: info.coords.longitude
})
 }
 

 useEffect( () => {
  navigator.geolocation.getCurrentPosition(success)
 }, [])
 
  useEffect(() => {
  if (coords) {
    const APIKEY = '866e645548d266ea6007feb99435101e'
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
  axios.get(url)
  .then(res => {
    setweather(res.data)
  const celsius = (res.data.main.temp - 273.15).toFixed(0)
  const fahrenheit = ((9/5 * celsius) + 32).toFixed(0)
  settemp({
    celsius,
    fahrenheit
  })
  })
  .catch(err => console.log(err))  
  .finally( () => setisLoading(false))
  }
  
 }, [coords])

 return (
   <div className='app' > 
    {
      isLoading
      ? <Loader />
      :  (
<WeatherCard
    weather={weather}
    temp={temp}
    />
      )
    
    }
   </div>
  )
}

export default App
