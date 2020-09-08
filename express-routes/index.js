const express = require('express')
const app = express();

// Source
// http://expressjs.com/en/starter/basic-routing.html
// http://expressjs.com/en/guide/routing.html

//  Check the responses via Postman

app.get('/', (req, res) => {
  res.send('Hello World! jhbjhgjhgvjhvjhvbjhvjh')
});

app.post('/', function (req, res) {
  res.send('Got a POST request')
});

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
});

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
});

app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  }
);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});