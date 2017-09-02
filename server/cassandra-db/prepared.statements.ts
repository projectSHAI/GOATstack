class DbStmts {

  //keyspaces
  public devKeyspace: string = `CREATE KEYSPACE IF NOT EXISTS dev WITH REPLICATION = { 
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };`;
  public testKeyspace: string = `CREATE KEYSPACE IF NOT EXISTS dev WITH REPLICATION = { 
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };`;

}

export default new DbStmts;