import { Button, OutlinedInput, InputLabel } from '@mui/material';
import PropTypes from 'prop-types'
import { ArrowBack }  from '../../utils.tsx';
import { Link } from "react-router-dom";
import NativeSelect from '@mui/material/NativeSelect';
import { useState, useEffect } from 'react';
import { placaValidator } from './validations';

// import { ConstructionOutlined } from '@mui/icons-material';
const AddVehicle = () => {

    const initalValues = { type:1, placa:'' }
    const [formValues, setFormValues] = useState(initalValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false); 
    const [isCreated, setIsCreated] = useState(false); 

    const handleChange = (e)=> {
        // console.log(e.target)
        const { name, value} = e.target;
        setFormValues({ ...formValues, [name]: value})
        // console.log(formValues);
    }

    const validateData = () => {
        validate(formValues)
        setIsSubmit(true)
    }

    const validate = (values) => {
        let errors = placaValidator(values)
        setFormErrors(errors)
        return errors
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log('%cEnviado', 'color:green')
            setIsSubmit(false);
            setIsCreated(true);
        }
    })

    return <div className="parking-frame">
        <div>
            {/* <ArrowBackIcon fontSize="medium" className='align-icon' /> */}
            <h2> <Link to="/"><ArrowBack/></Link> Nuevo vehículo</h2>
            <p>Ingresa los datos del nuevo vehículo</p>
        </div>
        <div className="form-block">
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Tipo de usario
                </InputLabel>
                <NativeSelect
                    name="type"
                    onChange={handleChange}
                    className="native-select"
                    defaultValue={'1'}
                    inputProps={{
                        name: 'type',
                        id: 'vehicle-type',
                    }}
                >
                    <option value={1}>Residente</option>
                    <option value={2}>Oficial</option>
                    <option value={3}>No residente</option>
                </NativeSelect>

                <InputLabel htmlFor="placa">Captura la placa</InputLabel>
                <p className="input-error">{ formErrors.placa }</p>
                <OutlinedInput
                    onKeyUp={handleChange}
                    type="text"
                    name="placa">
                </OutlinedInput>
                <br/>

                { !isCreated ? 
                    <Button variant="contained" type="submit" onClick={validateData} >Registrar Veículo</Button> :
                    <p>Vehículo agregado exitosamente</p>
                }
            </form>
        </div>
    </div>
}

AddVehicle.propTypes = {
    placa: PropTypes.string
}

export default AddVehicle;