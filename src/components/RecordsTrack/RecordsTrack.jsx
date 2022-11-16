import "./RecordsTrack.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { getAllrecords } from "../../api/parking.api";
import CreateReport from '../CreateReport';

const RecordsTrack = () => {

  const [records, setRecords] = useState([]);
  const [actives, setActives] = useState(0);

  async function getRecords() {
    const allRecords = await getAllrecords();
    const newRecords = formatRecords(allRecords)
    setRecords(newRecords)
  }

  const formatRecords = (records) => {
    const newRecords = [];
    records.map( record => {
      let newFormat = {
        folio: record.id_parking_record,
        description: record.description,
        placa: record.placa,
        idVehicle: record.id_vehicle,
        check_in: formatDate(record.check_in), 
        check_out: formatDate(record.check_out),
        minutes: minutes(record),
        parking_fee: getParkinFee(record.parking_fee, minutes(record))
      }
      newRecords.push(newFormat)
    })
    return newRecords;
  }

  const activeVehicles = () => { records.filter( record => record.check_in && !record.check_out) }

  const minutes = (row) => {
    let start = row.check_in;
    let end = row.check_out;
    if (!start || !end) { return ''}
    let startDate = new Date(start).getTime();
    let endDate = new Date(end).getTime();

    return parseInt((endDate - startDate) / 60000);
  }

  const getParkinFee = (parkingFee, time) => {
    return parseFloat((parkingFee * time).toFixed(2));
  }

  const formatDate = (date) => {
    if (!date) return '';
    let format = new Date(date);
    let minutes = (format.getMinutes() < 10 ? '0' : '') + format.getMinutes();
    return [format.getUTCHours() % 12, minutes].join(':') + (format.getHours() > 12 ? ' PM' : ' AM')
  }

  useEffect(() => {
    getRecords()
  }, [])

  return <div className="records-track">
        <br/>
        <div className="records-header">
          <h2 className="title">Reporte del mes</h2>
          <CreateReport records={records}></CreateReport>
        </div>
        <div className="table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>FOLIO</TableCell>
                  <TableCell>TIPO</TableCell>
                  <TableCell>PLACA</TableCell>
                  <TableCell>ENTRADA</TableCell>
                  <TableCell>SALIDA</TableCell>
                  <TableCell>MINUTOS</TableCell>
                  <TableCell>TARIFA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((row, index) => (
                  <TableRow
                    className={row.check_in && !row.check_out ? 'active': ''}
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <span className="size-16">●</span> { row.id_parking_record }
                    </TableCell>
                    <TableCell > { row.description }</TableCell>
                    <TableCell >{ row.placa }</TableCell>
                    <TableCell >{ row.check_in}</TableCell>
                    <TableCell >{ row.check_out }</TableCell>
                    <TableCell align="center">{ row.minutes }</TableCell>
                    <TableCell align="center">${ row.parking_fee }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <p>Registros: { records.length }</p>

        </div>
    </div>

};

export default RecordsTrack;
