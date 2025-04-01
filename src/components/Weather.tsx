import { useEffect, useState } from "react";
import "./Weather.css";
import { firstLetterUpperCase, getBackgroundImage, timeFormater } from "./config";
import { DEFAULT_CITY } from "./config";

const Weather = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [weatherType, setWeatherType] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState();
    const [wind, setWind] = useState(0);
    const [clouds, setClouds] = useState(0);
    const [city, setCity] = useState('');
    const [cityName, setCityName] = useState(DEFAULT_CITY);
    const [icon, setIcon] = useState();
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let newCity = firstLetterUpperCase(event.target.value);
      setCity(newCity);
    }

    const handleSearch = () => {
      if(city.length !== 0) setCityName(city);
      else setCityName(DEFAULT_CITY);
      setCity("")
    };

    useEffect(() =>{
      let URL = `https://api.weatherapi.com/v1/current.json?key=c09063b4308e43149ec193447253103&q=${cityName}`;
      const fetchWeather = async () => {
        try {
          const response = await fetch(URL);
          if(!response.ok) throw new Error(`Error! Status: ${response.status}`)
          
          const data = await response.json();
          
          setCurrentTime(timeFormater(new Date(data.location.localtime)))          
          setTemperature(Math.floor(Number(data.current.temp_c)) + '°')
          setHumidity(data.current.humidity);
          setWind(data.current.wind_kph);
          setClouds(data.current.cloud);
          setWeatherType(data.current.condition.text)
          setIcon(data.current.condition.icon)
          document.body.style.backgroundImage = getBackgroundImage(data.current.condition.code, data.current.is_day);
          
        } catch (error) {
          setCityName(DEFAULT_CITY);
          alert("No city found!")
        }
 
    }
    fetchWeather();
  }, [cityName]); 

  return (
    <div className="main-inner">
      <div id="search-header">
        <input
          type="text"
          value={city}
          id="search-input-field"
          placeholder="Search Location.."
          onChange={handleChange}
        />
        <button id="search-btn" onClick={handleSearch}>Search</button>
      </div>
      <span id="current-time">{currentTime}</span>
      <h1>{cityName}</h1>
      <h3>{weatherType}</h3>
      <img src={icon} alt="" />
      <h2 id="temperature">{temperature}</h2>
      <div id="weather-information">
        <div id="inner-information"><h4>Cloudy</h4><span> {clouds}% </span></div>
        <div id="inner-information"><h4>Humidity</h4><span>{humidity}% </span></div>
        <div id="inner-information"><h4>Wind</h4><span>{wind}km/h </span></div>
      </div>
    </div>
  );
};

export default Weather;
