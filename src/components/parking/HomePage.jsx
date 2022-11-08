import React from 'react';
import { Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link } from 'react-router-dom'
import paths from '../../routes';

const HomePage = () => {
    console.log('Home Page')

    return <div className="parking-frame">
        <h2>Home</h2>
        <div className="form-block">

            <Link to={paths.REGISTER_ENTER}>
            <Button variant="contained">
                <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                Registrar entrada</Button> <br/>
            </Link>

            <Link to={paths.REGISTER_LEAVE}>
                <Button variant="contained"color="secondary">
                    <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
                    Registrar Salida</Button> <br/>
            </Link>

            <Link to={paths.NEW_VEHICLE}>
                <Button variant="contained" color="success">Registrar Vehículo</Button> <br/>
            </Link>

            <Link to={paths.RESTART_MONTH}>
                <Button variant="contained" color="primary">Comenzar Mes</Button> <br/>
            </Link>

            
            
        </div>
    </div>
}

// CheckParking.propTypes = {
//     placa: PropTypes.string
// }

export default HomePage;