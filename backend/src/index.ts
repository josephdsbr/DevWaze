const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
import routes from './routes';

const app = express();

mongoose.connect('mongodb+srv://josephds:maisvc10@cluster0-y33pg.mongodb.net/devwaze?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333);