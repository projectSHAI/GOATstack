import { client } from '../cassandra-db';

class DbModel {

    // delete tables
    truncateUsers: string = `TRUNCATE users`;

    query(query: string, params?: Array<string>, prepared?: object): Promise<any> {
        if (query && params && prepared)
            return client.execute(query, params, prepared);
        else if (query && params && !prepared)
            return client.execute(query, params);
        else if (query && !params && !prepared)
            return client.execute(query);
        else
            throw 'Cassandra query function. incorrect arguments provided';
    }

    batch (queries: Array<{query:string,params:Array<any>}>) {
        return client.batch(queries, { prepare: true });
    }
}



export default new DbModel;