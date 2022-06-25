const { request, response } = require('express');
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

exports.filterData = (request, response) => {
  const makeCond = (item) => {
    return [Object.keys(item), `'${Object.values(item)}'`].join("=");
  }

  const COLL = () => {
    const CLMN = request.body.coll.toString()
    pool.query(`SELECT ${CLMN} FROM rawdata`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const CONDT = () => {
    const CNDT = request.body.condit.map(makeCond).join(" OR ")
    pool.query(`SELECT * FROM rawdata WHERE ${CNDT}`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const COLLwCONDT = () => {
    const CLMN = request.body.coll.toString()
    const CNDT = request.body.condit.map(makeCond).join(" OR ")
    pool.query(`SELECT ${CLMN} FROM rawdata WHERE ${CNDT}`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  request.body.coll.length && request.body.condit.length ?
    COLLwCONDT() : request.body.coll.length ?
    COLL() : request.body.condit.length ?
    CONDT() : response.status(400).json({"message": "bad request"})

  return
}

// exports.addDatas = (request, response) => {
//   const makeHead = (item) => {
//     return [Object.keys(item)]
//   }

//   const makeRow = (item) => {
//     return [`'${Object.values(item)}'`]
//   }

//   const HEAD = request.body.map(makeHead).toString()
//   const ROW = request.body.map(makeRow).toString()
//   // console.log(request.body[0].Site_ID)
//   pool.query(`INSERT INTO rawdata (${HEAD}) SELECT TOP 1 (${ROW}) FROM rawdata WHERE NOT EXISTS (SELECT * FROM rawdata WHERE site_id='${request.body[0].Site_ID}')`, (error, results) => {
//     if (error) {
//       response.status(400).json({"message": "bad request"})
//       return error
//     }
//     response.status(200).send('Data added')
//   })
// }

exports.deleteData = (request, response) => {
  const SiteID = String(request.params.SiteID)

  pool.query('DELETE FROM rawdata WHERE Site_ID = $1', [SiteID], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Data deleted with SiteID: ${SiteID}`)
  })
}