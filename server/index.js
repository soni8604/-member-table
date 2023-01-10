const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT
const app = express()
const data = require('./routes/data');
app.use(cors())
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Database connected')
    }
})
app.use('/', data)
app.get('*', (req, res) => {
    res.status(404).send("404 Page Not Found")
})

app.listen(process.env.PORT || port, () => { console.log(`server started on port : http://localhost:${port}/`) })