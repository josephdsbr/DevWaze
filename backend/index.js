const express = require('express');

const app = express();

app.get('/users', (request, response) => {
  response.json({ message: 'oie' })
});

app.listen(3333);