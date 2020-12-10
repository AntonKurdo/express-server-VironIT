const express = require('express');
const chalk = require('chalk');
const router = require('./routers/users.routes');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', router);

app.listen(PORT, () => {
  console.log(chalk.yellow(`Server was created at ${PORT} port`));
});

