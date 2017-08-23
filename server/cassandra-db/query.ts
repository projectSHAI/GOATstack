import { client } from '../cassandra-db';

export function query(query: string, params?: Array<string>, prepared?: object): Promise<any> {
    if(query && params && prepared)
        return client.execute(query, params, prepared);
    else if(query && params && !prepared)
        return client.execute(query, params);
    else if(query && !params && !prepared)
        return client.execute(query);
    else
        throw 'Cassandra query function. incorrect arguments provided';
}