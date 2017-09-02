import { client } from '../cassandra-db';

class DbModel {

    /////////////////
    //seed function//
    /////////////////
    public keyspace(keyspace: string): Promise<any> {
        return client.execute(keyspace);
    }

    public seed(table: string, truncate: string, queries: Array<{ query: string, params: Array<any> }>): Promise<any> {
        return client.execute(table).then(result => {
            client.execute(truncate).then(result => {
                client.batch(queries).then(result => console.log('seed batching succesful!')).catch(err => console.error(err));
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }

    public batch(queries: Array<{ query: string, params: Array<any> }>, queryOptions: object) {
        return client.batch(queries, queryOptions).then(result => console.log('Batching succesful!')).catch(err => console.error(err));
    }

}



export default new DbModel;