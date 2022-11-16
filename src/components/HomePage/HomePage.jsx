import React from 'react';
import { Button } from '@mui/material';
// import styles from "./parking.scss";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Link } from 'react-router-dom'
import paths from '../../routes';
import RecordsTrack from '../RecordsTrack';

const HomePage = () => {

    return <div className="parking-frame">
        <h2>Registro de estacionamiento</h2>
        <div className="form-block menu">

            <Link to={paths.REGISTER_ENTER}>
            <Button variant="contained">
                <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                Registrar entrada</Button> <br/>
            </Link>

            <Link to={paths.REGISTER_LEAVE}>
                <Button variant="contained" color="error">
                    <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
                    Registrar Salida</Button> <br/>
            </Link>

            <Link to={paths.NEW_VEHICLE}>
                <Button variant="contained" color="success">Registrar Vehículo</Button> <br/>
            </Link>

            <Link to={paths.RESTART_MONTH}>
                <Button variant="contained" color="secondary">Comenzar Mes</Button> <br/>
            </Link>
            
        </div>

        <div>
          <RecordsTrack></RecordsTrack>
        </div>


    </div>
}

export default HomePage;