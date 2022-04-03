const express = require('express');
const { listen } = require('express/lib/application');
const { dirname } = require('path');
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');

const pool = new pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(_dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true}))
  .set('views', path.join(_dirname, 'views'))
  .get('/', async(req, res) => {
    try {
      const client = await pool.connect();

      client.release();
      res.send("Works");
    }
    catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  listen(PORT, () => console.log(`Listening on ${ PORT }`));
