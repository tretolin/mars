import { Button, OutlinedInput, InputLabel } from '@mui/material';
import PropTypes from 'prop-types'
import { ArrowBack }  from '../../utils.tsx';
import { Link } from "react-router-dom";
import NativeSelect from '@mui/material/NativeSelect';
import { useState, useEffect } from 'react';
import { placaValidator } from './validations';
import { getAllVehicles, addVehicle } from '../../api/parking.api'
// import { ConstructionOutlined } from '@mui/icons-material';
const AddVehicle = () => {

    const initalValues = { type:1, placa:'' }
    const [formValues, setFormValues] = useState(initalValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false); 
    const [isCreated, setIsCreated] = useState(false);
    const [vehicles, setVehicles] = useState();

    const handleChange = (e)=> {
        const { name, value} = e.target;
        setFormValues({ ...formValues, [name]: value})
    }

    async function getVehicles() {
        const allVehicles = await getAllVehicles();
        setVehicles(allVehicles);
    }

    const validateData = () => {
        validate(formValues)
        setIsSubmit(true)
        saveNewVehicle(formValues);
    }

    const checkDuplicated = (placa) => {
        console.log('Placa revisada', placa)
        const duplicated = vehicles.find( vehicle => vehicle.placa === placa) !== undefined;
        console.log(duplicated)
        return duplicated 
    }

    const validate = (values) => {
        let errors = placaValidator(values)
        if (checkDuplicated(values.placa)) {
            errors.placa = 'Esta placa ya está registrada'
        }
        setFormErrors(errors)
        return errors
    }

    const saveNewVehicle = (values) => {
        // console.log('values', values);
        addVehicle(values);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setIsSubmit(false);
            setIsCreated(true);
        }
    })

    useEffect(() => {
        getVehicles()
    }, [])

    return <div className="parking-frame">
        <div>Vehículos: { vehicles ? vehicles.length : 0 }</div>
        <pre>{ formErrors ?  formErrors.length : "--" }</pre>
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