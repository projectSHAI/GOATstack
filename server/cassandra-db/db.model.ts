import { client } from '../cassandra-db';

class DbModel {

    /////////////////
    //seed function//
    /////////////////
    public seed(keyspace: string, table: string, truncate: string, queries: Array<{ query: string, params: Array<any> }>): Promise<any> {
        return client.execute(keyspace).then(result => {
            client.execute(table).then(result => {
                client.execute(truncate).then(result => {
                    client.batch(queries).then(result => console.log('seed batching succesful!')).catch(err => console.error(err));
                }).catch(err => console.error(err));
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }

}



export default new DbModel;