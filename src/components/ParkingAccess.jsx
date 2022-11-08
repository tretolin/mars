import React from "react";
// import CheckParking from './parking/CheckParking';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// Parking access container
const ParkingAccess = () => {

    const message = 'Parking Access'
    console.log('%cHome', 'color:yellow')
    return (
        <>
            <h1><DirectionsCarIcon fontSize="large"></DirectionsCarIcon>  { message}</h1>
            {/* <CheckParking placa={ `5` }/> */}
            {/* <HomePage/> */}
        </>
        )
}
export default ParkingAccess;