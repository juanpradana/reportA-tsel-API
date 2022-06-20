const config = require('../config/datas.config')
const Pool = require('pg').Pool

const {
  user,
  host,
  database,
  password,
  port
} = config.config;

const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: port,
})

exports.getDatas = (request, response) => {
  pool.query('SELECT * FROM rawdata', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

exports.getDataBySiteID = (request, response) => {
  const SiteID = String(request.params.SiteID)

  pool.query('SELECT * FROM rawdata WHERE Site_ID = $1', [SiteID], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

exports.getAllSiteID = (request, response) => {
  pool.query('SELECT Site_ID FROM rawdata', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

exports.deleteData = (request, response) => {
  const SiteID = String(request.params.SiteID)

  pool.query('DELETE FROM rawdata WHERE Site_ID = $1', [SiteID], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Data deleted with SiteID: ${SiteID}`)
  })
}