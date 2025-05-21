const fs = require('fs');
const { Client } = require('pg');
require('dotenv').config();

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.SSLCERT,
  },
};

const client = new Client(config);

client.connect()
  .then(() => console.log('Connected to PostgreSQL with SSL'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;
