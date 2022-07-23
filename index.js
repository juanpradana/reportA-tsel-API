const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// if you run again and don't wanna lost your data
db.sequelize.sync();

// simple route
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.get('/', (req, res) => {
  res.json({ message: 'ZAN API!' });
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}.`);
});
