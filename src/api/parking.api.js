import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api';

const errorLog = (error) => { console.log(error) }

// GET all vehicles - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function getAllVehicles(checkin) {
    let vehicles = [];
    await axios.get(`/getAllVehicles`).then( res => { vehicles = res.data }, (error) => errorLog(error))

    return vehicles;
}

// GET available vehicles - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function getAvailableVehicles() {
    let vehicles = [];
    await axios.get('/availableVehicles').then( res => { vehicles = res.data }, (error) => errorLog(error))

    return vehicles;
}

// GET checkout vehicles - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function getCheckoutVehicles() {
    let vehicles = [];
    await axios.get('/checkoutVehicles').then( res => { vehicles = res.data }, (error) => errorLog(error))

    return vehicles;
}
// POST create vehicle - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function addVehicle(vehicleData) {
    let newVehicle;
    await axios.post('/agrega-vehiculo', vehicleData).then( res => { newVehicle = res.data }, (error) => errorLog(error))
    return newVehicle;
}

// POST Register checkin - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function checkIn(register) {
    console.log(register);
    let checInRegister;
    await axios.post('/check-in', register).then( res => { checInRegister = res.data }, (error) => errorLog(error))
    return checInRegister;
}

