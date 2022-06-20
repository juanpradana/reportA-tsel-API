const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { TeleKey } = require("../config/datas.config")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // FOR OTHER
  app.get(
    '/datas',
    [authJwt.verifyToken],
    controller.getDatas
  )

  app.get(
    '/datas/:SiteID',
    [authJwt.verifyToken],
    controller.getDataBySiteID
  )

  app.get(
    '/SiteID',
    [authJwt.verifyToken],
    controller.getAllSiteID
  )

  app.delete(
    '/datas/:SiteID',
    [authJwt.verifyToken],
    controller.deleteData
  )

  // FOR TELEGRAM
  app.get(
    `/${TeleKey}/datas`,
    controller.getDatas
  )

  app.get(
    `/${TeleKey}/datas/:SiteID`,
    controller.getDataBySiteID
  )

  app.get(
    `/${TeleKey}/SiteID`,
    controller.getAllSiteID
  )

  app.delete(
    `/${TeleKey}/datas/:SiteID`,
    controller.deleteData
  )
};