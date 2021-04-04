import {useState, useEffect} from 'react';

 const usePosition = (watch = false) => {
     // const KEY = "1ab169792d0060c67103adb8adfbfd98";
    const [position, setPosition] = useState();
    const [error, setError] = useState(null);
    // const [city, setCity] = useState(null);


     useEffect(() => {
         if (!navigator || !navigator.geolocation) {
             setError('Geolocation is not supported');
             return;
         }
         navigator.geolocation.getCurrentPosition(onChange, onError);

     },[] );

    const onChange = ({coords}) => {
        setPosition({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    };

    const onError = (error) => {
        setError(error.message);
    };





    return {...position, error};
};

export default usePosition