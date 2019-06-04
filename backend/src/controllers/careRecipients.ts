import * as express from 'express';
import * as mysql from 'mysql';
// import { connectToDB } from './../db';

export const careRecipients = express.Router();

const connectionMSQL: mysql.Pool = mysql.createPool({
  connectionLimit: 10,
  database: 'birdietest',
  host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
  password: 'xnxPp6QfZbCYkY8',
  port: 3306,
  user: 'test-read'
});

careRecipients.get('/careRecipients/mood', (_, res) => {
  connectionMSQL.query(
    "SELECT * FROM events WHERE event_type = 'mood_observation' AND timestamp <= '2019-05-01' ORDER BY timestamp ASC LIMIT 100",
    function(error, results) {
      if (error) {
        //Do something with the error
        console.error('error with query: ' + error);
        res.status(500).send(error);
      } else {
        // connected!
        const listCareRecipients = results.map((recipient: any) => {
          return recipient;
        });
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(200).json(listCareRecipients);
      }
    }
  );
});
