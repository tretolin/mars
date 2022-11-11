const express = require('express')
const routes = express.Router();

routes.get('/getAllVehicles', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) { return res.send(err) }
        conn.query('SELECT * FROM Vehicles', (err, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/availableVehicles', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) { return res.send(err) }
        conn.query(`SELECT * FROM vehicles as vh
        LEFT JOIN parking_records as pr 
        ON pr.id_vehicle = vh.idVehicle
        WHERE pr.id_vehicle IS NULL OR pr.check_out IS NOT NULL AND pr.check_in IS NULL`, (err, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.get('/checkoutVehicles', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) { return res.send(err) }
        conn.query(`SELECT * FROM vehicles as vh
        LEFT JOIN parking_records as pr 
        ON pr.id_vehicle = vh.idVehicle
        WHERE pr.check_in IS NOT NULL AND pr.check_out IS NULL`, (err, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.post('/agrega-vehiculo', (req, res) => {
    console.log('BODY', req.body)
    const placa = req.body.placa;
    const type = req.body.type;
    //console.log(req.params)
    req.getConnection((err, conn) => {
        if (err) { return res.send(err) }
        conn.query('INSERT INTO vehicles (placa, type) VALUES(?,?)',[placa, type], (err, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

routes.post('/check-in', (req, res) => {
    console.log('BODY', req.body)
    const idVehicle = req.body.idVehicle;
    const checkIn = req.body.checkIn;
    console.log('PARAMS', idVehicle, checkIn)
    req.getConnection((err, conn) => {
        if (err) { return res.send(err) }
        conn.query(`INSERT INTO parking_records (id_vehicle, check_in, check_out) VALUES(?,?,?)`,[idVehicle, checkIn, null], (err, rows) => {
            if(err) return res.send(err)
            res.json(rows)
        })
    })
})

module.exports = routes