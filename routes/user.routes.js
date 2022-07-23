const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');
const { TeleKey } = require('../config/datas.config');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });

  // FOR OTHER
  app.get(
    '/datas',
    [authJwt.verifyToken],
    controller.getDatas,
  );

  app.get(
    '/datas/:SiteID',
    [authJwt.verifyToken],
    controller.getDataBySiteID,
  );

  app.get(
    '/SiteID',
    [authJwt.verifyToken],
    controller.getAllSiteID,
  );

  app.post(
    '/datas/filter',
    [authJwt.verifyToken],
    controller.filterData,
  );

  app.post(
    '/addDatas',
    [authJwt.verifyToken],
    controller.addDatas,
  );

  app.put(
    '/changeData/:SiteID',
    [authJwt.verifyToken],
    controller.changeDatas,
  );

  app.delete(
    '/datas/:SiteID',
    [authJwt.verifyToken],
    controller.deleteData,
  );

  // FOR TELEGRAM
  app.get(
    `/${TeleKey}/datas`,
    controller.getDatas,
  );

  app.get(
    `/${TeleKey}/datas/:SiteID`,
    controller.getDataBySiteID,
  );

  app.get(
    `/${TeleKey}/SiteID`,
    controller.getAllSiteID,
  );

  app.post(
    `/${TeleKey}/datas/filter`,
    controller.filterData,
  );

  app.post(
    `/${TeleKey}/addDatas`,
    controller.addDatas,
  );

  app.put(
    `/${TeleKey}/changeData/:SiteID`,
    controller.changeDatas,
  );

  app.delete(
    `/${TeleKey}/datas/:SiteID`,
    controller.deleteData,
  );
};
