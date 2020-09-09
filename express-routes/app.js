var birds = require('./birds')

const express = require('express')
const app = express();

// ...

app.use('/birds', birds)

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
  });