import { client } from '../cassandra-db';

class DbModel {

    /////////////////
    //seed function//
    /////////////////
    public keyspace(keyspace: string): Promise<any> {
        return client.execute(keyspace);
    }

    public seed(table: string, truncate: string, queries: Array<{ query: string, params: Array<any> }>, queryOptions: object): Promise<any> {
        return client.execute(table).then(result => {
            return client.execute(truncate).then(result => {
                return this.batch(queries, queryOptions).then(() => console.log('Batching succesful!')).catch(err => console.error(err));
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }

    public batch(queries: Array<{ query: string, params: Array<any> }>, queryOptions: object) {
        return client.batch(queries, queryOptions);
    }

}



export default new DbModel;