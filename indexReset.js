const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const app = express();
const Role = db.role;
let corsOptions = {
  origin: "*"
};

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// if you run again and don't wanna lost your data
// db.sequelize.sync();
// if you run at first time
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// simple route
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
app.get("/", (req, res) => {
  res.json({ message: "ZAN API!" });
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}.`);
});