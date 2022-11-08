import './App.scss';
import { Routes, Route } from 'react-router-dom';

import HomePage from "./components/parking/HomePage"
// import ParkingAccess from './components/ParkingAccess'
import CheckParking from "./components/parking/CheckParking"
import AddVehicle from "./components/parking/AddVehicle"
import paths from './routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={ paths.HOME } element={<HomePage />} />
          <Route path={ paths.REGISTER_ENTER } element={<CheckParking type='in'/>} />
          <Route path={ paths.REGISTER_LEAVE } element={<CheckParking type='out'/>} />
          <Route path={ paths.NEW_VEHICLE} element={<AddVehicle />} />
          {/* <Route path={ paths.RESTART_MONTH} element={<RestartMonth />} /> */}
      </Routes>

          {/* <ParkingAccess /> */}


      </header>
    </div>
  );
}

export default App;
