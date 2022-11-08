const placaValidator = values => {
    const errors = {};
    if (!values.placa) {
        errors.placa = 'Es necesario ingresar una número de placa'
    } else if (values.placa.length < 6) {
        errors.placa = 'Capture al menos seis carácteres'
    }
    return errors;
}

export { placaValidator };