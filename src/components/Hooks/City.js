import {useState, useEffect} from 'react';
import usePosition from "../Hooks/GetCoords";
import {API_KEY_CITY} from  '../constant/constant'

function useCity() {
    const [city, setCity] = useState(null);
    const {latitude, longitude} = usePosition();
    useEffect(() => {
        if(!city && latitude && longitude) {
            fetch(`http://api.positionstack.com/v1/reverse?access_key=${API_KEY_CITY}&query=${latitude},${longitude}`)
                .then((response) => response.json())
                .then(({data}) => {
                     if (data[0].locality) {
                         setCity(data[0].locality)
                     }
                })
        }
    },[city,latitude,longitude])

    return city
}

export default useCity