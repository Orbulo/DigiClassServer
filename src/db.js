import pg from 'pg';

const client = pg.Client();

client.connect();
client.query(`
	create table if not exists account (
	  id int primary key generated always as identity,
	  email text unique not null,
	 	password_hash text 
	);
`);

export default client;
