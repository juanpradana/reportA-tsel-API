const { Pool } = require('pg');
const config = require('../config/datas.config');

const {
  user,
  host,
  database,
  password,
  port,
} = config.config;

const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
});

exports.getDatas = (request, response) => {
  pool.query('SELECT * FROM rawdata', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

exports.getDataBySiteID = (request, response) => {
  const SiteID = String(request.params.SiteID);

  pool.query('SELECT * FROM rawdata WHERE Site_ID = $1', [SiteID], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

exports.getAllSiteID = (request, response) => {
  pool.query('SELECT Site_ID FROM rawdata', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

exports.filterData = (request, response) => {
  const makeCond = (item) => [Object.keys(item), `'${Object.values(item)}'`].join('=');

  const COLL = () => {
    const CLMN = request.body.colls.toString();
    pool.query(`SELECT ${CLMN} FROM rawdata`, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  const CONDT = () => {
    const CNDT = request.body.condit.map(makeCond).join(' AND ');
    pool.query(`SELECT * FROM rawdata WHERE ${CNDT}`, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  const COLLwCONDT = () => {
    const CLMN = request.body.colls.toString();
    const CNDT = request.body.condit.map(makeCond).join(' AND ');
    pool.query(`SELECT ${CLMN} FROM rawdata WHERE ${CNDT}`, (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  request.body.colls.length && request.body.condit.length
    ? COLLwCONDT() : request.body.colls.length
      ? COLL() : request.body.condit.length
        ? CONDT() : response.status(400).json({ message: 'bad request' });
};

exports.addDatas = (request, response) => {
  const makeHead = (item) => [Object.keys(item)];

  const makeRow = (item) => [`'${Object.values(item)}'`];

  const HEAD = request.body.map(makeHead).toString();
  const ROW = request.body.map(makeRow).toString();
  if (request.body[0].Site_ID) {
    pool.query(`INSERT INTO transitdata (${HEAD}) VALUES (${ROW})`, (error) => {
      if (error) {
        response.status(400).json({ message: 'error table transit' });
        return error;
      }
    });
    pool.query(`INSERT INTO rawdata (${HEAD}) SELECT ${HEAD} FROM transitdata WHERE NOT EXISTS (SELECT * FROM rawdata WHERE Site_ID='${request.body[0].Site_ID}')`, (error) => {
      if (error) {
        response.status(400).json({ message: 'data was duplicate or any' });
        return error;
      }
    });
    pool.query(`DELETE FROM transitdata WHERE Site_ID='${request.body[0].Site_ID}'`, (error) => {
      if (error) {
        response.status(400).json({ message: 'failed to detele transit data' });
        return error;
      }
    });
    response.status(200).send('Data added');
  } else {
    response.status(400).json({ message: 'bad request' });
  }
};

exports.changeDatas = (request, response) => {
  const makeCond = (item) => [Object.keys(item), `'${Object.values(item)}'`].join('=');

  const CNDT = request.body.map(makeCond).toString();
  const SiteID = String(request.params.SiteID);

  // console.log(CNDT)
  pool.query(`UPDATE rawdata SET ${CNDT} WHERE Site_ID='${SiteID}'`, (error) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Data change with SiteID: ${SiteID}`);
  });
};

exports.deleteData = (request, response) => {
  const SiteID = String(request.params.SiteID);

  pool.query('DELETE FROM rawdata WHERE Site_ID = $1', [SiteID], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Data deleted with SiteID: ${SiteID}`);
  });
};
