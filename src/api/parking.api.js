import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api';

const errorLog = (error) => { console.log(error) }

// GET all profiles - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function getAllProfiles() {
    let profiles = [];
    await axios.get(`/getAllProfiles`).then( res => { profiles = res.data }, (error) => errorLog(error))

    return profiles;
}

// GET all vehicles - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function getAllVehicles() {
    let vehicles = [];
    await axios.get(`/getAllVehicles`).then( res => { vehicles = res.data }, (error) => errorLog(error))

    return vehicles;
}

// GET all records - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function getAllrecords() {
    let records = [];
    await axios.get(`/get-records`).then( res => { records = res.data }, (error) => errorLog(error))

    return records;
}

// GET available vehicles - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function getAvailableVehicles() {
    let vehicles = [];
    try {
        await axios.get('/availableVehicles').then( res => { vehicles = res.data }, (error) => errorLog(error))
    return vehicles;
    } catch (e) { console.error(e) }
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
    let checInRegister;
    await axios.post('/check-in', register).then( res => { checInRegister = res.data }, (error) => errorLog(error))
    return checInRegister;
}

// PUT update checkout - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function checkOut(register) {
    let checInRegister;
    await axios.put('/check-out', register).then( res => { checInRegister = res.data }, (error) => errorLog(error))
    return checInRegister;
}

// GET restart month - - - - - - - - - - - - - - - - - - - - - - - - - 
export async function restartMonth() {
    let residentVehicles;
    await axios.get('/restart-month').then( res => { residentVehicles = res.data }, (error) => errorLog(error))
    return residentVehicles;
}

