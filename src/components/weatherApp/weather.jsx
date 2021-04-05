import React,{useState,useEffect} from 'react';
import useCity from "../Hooks/City";
import {weatherApi} from "../../weatherApi/index";
import './weather.css'


const Weather = () => {
    const [check, setCheck] = useState(false);
    const [tempStatus, setTempStatus] = useState(false);
    const  [temp , setTemp] = useState()
    const [infoDay, setInfoDay] = useState(null);
    const [loading,setLoading] = useState(true)
    const city = useCity();

    useEffect(()=>{
        if(city && !infoDay){
           weatherApi.weatherInfoApi(city)
                .then((response) =>response.json())
                .then((dataDay) => {
                    setInfoDay({
                        name:dataDay.name,
                        description:dataDay.weather[0].description,
                        icon:dataDay.weather[0].icon

                    })
                    setTemp(dataDay.main.temp)
                    setLoading(false)
                })
        }
    },[city,infoDay])


    useEffect(() => {
          const  interval  = setInterval(() => {
               setLoading(true)
               weatherApi.weatherInfoApi(city)
                   .then((response) =>response.json())
                   .then((dataDay) => {
                       setInfoDay({
                           name:dataDay.name,
                           description:dataDay.weather[0].description,
                           icon:dataDay.weather[0].icon

                       })
                       if(tempStatus){
                           setTemp((dataDay.main.temp  * 9) / 5 + 32)

                       }
                       setLoading(false)
                   })
            }, 6000);

        if(!check){
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    }, [check]);

    const handleChange = () => {
        if (!tempStatus) {
            setTemp(temp=>(temp * 9) / 5 + 32)
        } else {
            setTemp(temp=>((temp - 32) * 5) / 9)
        }
        return setTempStatus(!tempStatus)
    }

    return (
        <div className={'container'}>
            {!loading ?
                <div className={'weather'}>

                    <div className={'content'}>
                        <p>City:{infoDay.name }</p>
                        <p>Temperature:{Math.floor(temp) } {tempStatus?'F':'C'}</p>
                        <p>Description:{infoDay.description}</p>
                        <p><span>Icon:</span><span><img className='weather-icon' src={`${process.env.PUBLIC_URL}/Images-icon/${infoDay.icon}.png`}/></span></p>
                    </div>
                    <label>
                        <input className={'checkboxStatus'} checked={tempStatus}  type="checkbox" onChange={handleChange}/>
                        Fahrenheit to Celsius
                    </label>
                   <p> <input className={'checkbox'} checked={check}  type="checkbox" onChange={()=>setCheck(!check)}/>Forecast for 24 hours</p>
                </div>
                :
                <div>...Loading</div>
            }
        </div>
    );
};

export default  Weather;