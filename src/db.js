import pg from 'pg';

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();
client.query(`
	create table if not exists account (
	  id int primary key generated always as identity,
	  user_id text unique not null,
	  email text unique not null,
	 	password_hash text 
	);
`);

export default client;
