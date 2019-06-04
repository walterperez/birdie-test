// import * as mysql from 'mysql';

//   ● Host: birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com
//   ● Port: 3306
//   ● User: test-read
//   ● Password: xnxPp6QfZbCYkY8
//   ● Name: birdietest
//   ● T able: census_learn_sql

// const connectionMSQL: mysql.Connection = mysql.createConnection({
//   database: 'birdietest',
//   host: 'birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com',
//   password: 'xnxPp6QfZbCYkY8',
//   port: 3306,
//   user: 'test-read'
// });

// export function connectToDB() {
//   return new Promise<mysql.Connection>((resolve, reject) => {
//     connectionMSQL.connect(function(err: mysql.MysqlError): void {
//       if (err) {
//         //No connected with DB
//         console.error('error connecting: ' + err.stack);
//         reject(err);
//       } else {
//         //Connected with DB
//         resolve(connectionMSQL);
//       }
//     });
//   });
// }
