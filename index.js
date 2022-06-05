const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./queries')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors({
  origin: '*'
}));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/datas', db.getDatas)
app.get('/datas/:SiteID', db.getDataBySiteID)
app.get('/SiteID', db.getAllSiteID)
app.delete('/datas/:SiteID', db.deleteData)

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}.`)
})