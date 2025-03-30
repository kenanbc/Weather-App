import { useEffect, useState } from "react";
import "./Weather.css";
import { convertMStoKPH, firstLetterUpperCase, icons, timeFormater } from "./config";
import { days, months } from "./config";
import { DEFAULT_CITY } from "./config";

const Weather = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [weatherType, setWeatherType] = useState('');
    const [weatherDescription, setWeatherDescription] = useState();
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState();
    const [wind, setWind] = useState(0);
    const [clouds, setClouds] = useState(0);
    const [city, setCity] = useState('');
    const [cityName, setCityName] = useState(DEFAULT_CITY);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let newCity = firstLetterUpperCase(event.target.value);
      setCity(newCity);
    }

    const handleSearch = () => {
      if(city.length !== 0) setCityName(city);
      else setCityName(DEFAULT_CITY);
      setCity("")
    };

    const updateCurrentTime = (today: Date) => {
      setCurrentTime(timeFormater(today));
    }

    useEffect(() => {
      const getBackgroundImage = () => {
      switch(weatherType){
        case 'Rain':
          return "url(/Weather-App/rain.jpg)";
        case 'Clear':
          return "url(/Weather-App/clear.jpg)";
        case 'Clouds':
          return "url(/Weather-App/cloudy.jpg)";
        case 'Mist':
          return "url(/Weather-App/mist.jpg)";
        case 'Fog':
          return "url(/Weather-App/mist.jpg)";
        case 'Snow':
          return "url(/Weather-App/snow.jpg)";
        default:
          return "url()";
      }
    }
    document.body.style.backgroundImage = getBackgroundImage();

    }, [weatherType]);

    useEffect(() =>{
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=200ecfbe9fd891d4a45f60a8062f581b&units=metric`;
      const fetchWeather = async () => {
        const today = new Date();
        try {
          const response = await fetch(URL);
          if(!response.ok) throw new Error(`Error! Status: ${response.status}`)
          const data = await response.json();

          setWeatherType(data.weather[0].main);
          setWeatherDescription(data.weather[0].description);
          setTemperature(Math.floor(Number(data.main.temp)) + '°')
          setHumidity(data.main.humidity);
          let windSpeed = convertMStoKPH(Number(data.wind.speed));
          setWind(windSpeed);
          setClouds(data.clouds.all);
          
        } catch (error) {
          setCityName(DEFAULT_CITY);
          alert("No city found!")
        }
        updateCurrentTime(today);   
    }
    fetchWeather();
  }, [cityName]); 

  const setIcon = () => {
    switch(weatherType){
      case 'Rain':
        return icons[0];
      case 'Clear':
        return icons[1];
      case 'Clouds':
        return icons[2];
      case 'Snow':
        return icons[5];
      case 'Fog':
        return icons[6];
    }
  }

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
      <h5>{weatherDescription}</h5>
      {setIcon()}
      <h2 id="temperature">{temperature}</h2>
      <div id="weather-information">
        <h5>Cloudy <br/> <span> {clouds}% </span></h5>
        <h5>Humidity <br/><span>{humidity}% </span></h5>
        <h5>Wind <br/><span>{wind}km/h </span></h5>
      </div>
    </div>
  );
};

export default Weather;
