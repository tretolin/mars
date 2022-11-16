import { Button, OutlinedInput, InputLabel } from '@mui/material';
import { ArrowBack }  from '../../utils.tsx';
import { Link, useNavigate } from "react-router-dom";
import { restartMonth, resetVehicles } from '../../api/parking.api';
import { useState, useEffect } from 'react';
const RestartMonth = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function startMonth() {
    try {
      setLoading(true)
      const restarMonthData = await restartMonth();
      if (restarMonthData) {
        await resetVehicles();
          setTimeout( function () {
            navigate('/')
          }, 2000)
      }

    } catch(e) { console.error(e) }
  }

    return <div className="parking-frame">
        <div>
            <h2> <Link to="/"><ArrowBack/></Link> Comenzar mes</h2>
            <p>Confirma inicio de nuevo mes</p>
        </div>
        {
          !loading ? 
          <div className="form-block">
            <Button variant="contained" color="error" type="submit" onClick={startMonth} >Comenzar Mes</Button>
          </div> :
          <p>Poocesando...</p>
        }
    </div>
}

export default RestartMonth