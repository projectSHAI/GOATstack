"use strict";
import config from "../../config";
import Sequelize from "sequelize";

import * as Rx from 'rxjs';

//initilize the database
let sequelize = new Sequelize(config.sql.database, config.sql.username, config.sql.password, config.sql.options);

export default sequelize;

// Initialize sequelize
export function sequelizeConnect() {
	return Rx.Observable.create(observer => {
		sequelize.sync().then(function() {

		    observer.next();
		    observer.complete();

		}).catch(err => observer.error(err));
	});
};

export function sequelizeDisconnect() {

};
