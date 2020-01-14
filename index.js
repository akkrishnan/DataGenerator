/*jshint esversion: 6 */
// content of index.js

const express = require('express');
const app = express();
const port = 3000;
// const port = process.env.PORT || 3000;
// var router = express.Router();

var routes = require('./services/generate'); //importing route
// routes(app); //register the route


// testDataRoutes Routes
// router.get('/generateData', function (req, res) {
// routes.generateData();
// });

// app.use(express.static('.'));

// module.exports = router;


app.get('/', (req, res) => res.send('Welcome to Test Data Generator!'));

app.get('/services/generate/csv', (req, res) => {
  routes.generateData(); res.send('Generating CSV file using input data successfully completed.')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

console.log('RESTful API server started on: ' + port);