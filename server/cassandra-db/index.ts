import { connect } from 'cassmask';

import config from '../../config';
import seed from './seed';

// Initialize Express-Cassandra
export function cassandraConnect() {
  
  connect(config.cassandra, function (err, result) {
    // seed cassandra
    if (config.seedDB) {
      seed(process.env.NODE_ENV);
    }
  });

};
export function cassandraDisconnect() {
  // client.disconnect(function (err) {
  //   console.log(chalk.bold.yellow('Disconnected from CassandraDB.'));
  //   return;
  // });
};
