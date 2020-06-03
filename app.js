const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const PORT = config.get('port') || 3000;

const app = express();

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log(`started on ${PORT}...`);
    });
  } catch (e) {
    console.log(`ERROR!!! ${e}`);
    process.exit(1);
  }
};

start();