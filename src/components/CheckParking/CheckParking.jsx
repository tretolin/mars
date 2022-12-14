import { Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import PropTypes from 'prop-types'
import { ArrowBack }  from '../../utils.tsx';
import { Link } from "react-router-dom";
import { placaValidator } from '../../utils/validations';
import { useState, useEffect } from 'react';
import { getAvailableVehicles, getCheckoutVehicles, checkIn, checkOut } from '../../api/parking.api'

const CheckParking = ({placa, type}) => {
    const initalValues = { placa:'', id:0 }
    const [formValues, setFormValues] = useState(initalValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false); 
    const [isRegistered, setIsRegistered] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [vehicleSelected] = useState(0);

    const enter = type === 'in';

    const handleChange = (e)=> {
        const { name, value} = e.target;
        setFormValues({ ...formValues, [name]: value})
    }

    async function getVehicles() {
        const allVehicles = enter ? await getAvailableVehicles() : await getCheckoutVehicles();
        setVehicles(allVehicles);
    }

    const validateData = () => {
        validate(formValues)
        setIsSubmit(true)

        enter ? 
            checkIn({
                idVehicle: vehicles[formValues.id].idVehicle,
                checkIn: new Date().toISOString().slice(0, 19).replace('T', ' '),
                checkOut: null
            }) :
            checkOut({
                idVehicle: vehicles[formValues.id].idVehicle,
                checkOut: new Date().toISOString().slice(0, 19).replace('T', ' '),
            }) 

        setIsRegistered(true)
    }
    
    const validate = (values) => {
        let errors = placaValidator(values)
        setFormErrors(errors)
        return errors
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            this.setIsSubmit(false);
        }
    })

    useEffect(() => {
        getVehicles()
    }, [])


    return <div className="parking-frame">
        <div>
            <h2> <Link to="/"><ArrowBack/></Link> Registro { enter ? 'Entrada' : 'Salida'}</h2>
        </div>
        <div className="form-block">
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <InputLabel htmlFor="placa">Selecciona el veh??culo</InputLabel>
                <FormControl fullWidth>

                    <InputLabel id="demo-simple-select-label">Placa</InputLabel>
                    {
                    vehicles ?
                    <Select
                        name="id"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={vehicleSelected}
                        onChange={handleChange}
                        label="Placa"

                    >
                        { vehicles.map( (vehicle, index) => <MenuItem value={index} key={index}>{vehicle.placa}</MenuItem> ) }
                    </Select> :
                    <p>No hay veh??culos disponibles</p>
                }
                </FormControl>

                <br/>
                { !isRegistered ? <Button
                    variant="contained"
                    onClick={validateData}
                    type="submit">Registrar  { enter ? 'Entrada' : 'Salida'}</Button> :
                    <p>{ enter ? 'Entrada' : 'Salida' } registrada</p>
                }
            </form>
        </div>
    </div>
}

CheckParking.propTypes = {
    placa: PropTypes.string
}

export default CheckParking;