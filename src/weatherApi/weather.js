import {API_KEY_WEATHER_INFO} from "../components/constant/constant";

export default {
    weatherInfoApi:(city)=>fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER_INFO}&units=metric`)
}