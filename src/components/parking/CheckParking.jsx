import { Button, OutlinedInput, InputLabel } from '@mui/material';
import PropTypes from 'prop-types'
import { ArrowBack }  from '../../utils.tsx';
import { Link, useParams } from "react-router-dom";
import { placaValidator } from './validations';
import { useState, useEffect } from 'react';

const CheckParking = ({placa, type}) => {
    const initalValues = { placa:'' }
    const [formValues, setFormValues] = useState(initalValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false); 
    const [isRegistered, setIsRegistered] = useState(false);

    const enter = type === 'in';

    const handleChange = (e)=> {
        const { name, value} = e.target;
        setFormValues({ ...formValues, [name]: value})
    }

    // const changeValue = (event) => {
    //     console.log('%c'+event.target.value, 'color:yellow')  
    // }

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
            setIsRegistered(true)
        }
    })

    return <div className="parking-frame">
        <div>
            
            {/* <ArrowBackIcon fontSize="medium" className='align-icon' /> */}
            <h2> <Link to="/"><ArrowBack/></Link> Registro { enter ? 'Entrada' : 'Salida'}</h2>
        </div>
        <div className="form-block">
            <form onSubmit={(e) => {
                e.preventDefault();
                console.log('%cEnviado', 'color:green')
            }}>
                <InputLabel htmlFor="placa">Captura la placa</InputLabel>
                <p className="input-error">{ formErrors.placa }</p>
                <OutlinedInput type="text" name="placa" defaultValue={placa} onKeyUp={handleChange}></OutlinedInput>
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