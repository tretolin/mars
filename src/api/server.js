const express = require('express');
const mysql = require('mysql2')
const myconn = require('express-myconnection')
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extends: false}))
app.use(bodyParser.json())

app.set('port', process.env.PORT || 4000);

const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Almendra1',
    database: 'nostromo'
}

app.use(myconn(mysql, dbOptions, 'single'))

app.use('/api', routes)

// SERVER
app.listen(app.get('port'), () => {
    //console.log('Server running nodemon s')
})