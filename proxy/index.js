
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const API_BASE_URL = 'http://localhost:8080/api'

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/', async (req, res) => {
    // console.log(req.query)
    // console.log(req.body)
    const url = `${API_BASE_URL}${req.query.q}`
    const res = fetch(url, {
        method: req.body.method,
        headers: req.body.headers,
        body: req.body.body
    })
    return res.json({ message: 'Hello World!' })
})

app.listen(port)