import React    from "react";
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function CreateReport() {
  const records = this.props.records;

  const compact = [];

  records.map( record => {
    let parkinFee = record.parking_fee;
    compact[record.idVehicle] ?
      compact[record.idVehicle].parking_fee += parkinFee :
      compact[record.idVehicle] = record;
  })

  const groups = compact.filter( record => record )
  
  const total = parseFloat(compact.reduce( (acc, record) => { return acc + record.parking_fee} , 0)).toFixed(2)
  
  const footer = [["Total", "", "$ "+total]]
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Reporte de esatacionamiento";
    const headers = [["Núm. placa", "Tiempo estacionado", "Tarifa"]];

    const data = groups.map(elt=> [elt.placa, elt.minutes, '$ '+elt.parking_fee] );

    let content = {
      startY: 50,
      head: headers,
      body: data,
      foot: footer
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  return <>
    <Button variant="contained" color="warning" onClick={exportPDF}>Create report</Button>
  </>
  
}

