"use strict";
import config from "../../config";
import Sequelize from "sequelize";
import seed from "./seed";

//initilize the database
let sequelize = new Sequelize(config.sql.database, config.sql.username, config.sql.password, config.sql.options);

export default sequelize;

// Initialize sequelize
export function sequelizeConnect() {
  sequelize.sync().then(function() {

      // seed sequelize
      if (config.seedDB) {
        seed(process.env.NODE_ENV);
      }

  });
};

export function sequelizeDisconnect() {

};
