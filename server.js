require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3010;

const { MONGO_USER, MONGO_PASSWORD, MONGO_DEFAULT_DATABASE } = process.env;
const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-h74u6.mongodb.net/${MONGO_DEFAULT_DATABASE}`;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection: database } = mongoose;

database.on('error', (error) => console.error(error));

database.once('open', () => console.info('Connected to Database'));

app.use(express.json());

const phoneRoute = require('./routes/phonebook');

app.get('/', (_, res) => {
  res.json({ message: 'REST API' });
});

app.use('/phonebook', phoneRoute);

app.listen(PORT, () => console.info(`Server Started On : ${PORT}`));
