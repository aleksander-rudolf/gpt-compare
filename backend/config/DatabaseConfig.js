import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
const { Pool } = pg;

console.log(process.env.POSTGRES_USER);
console.log(process.env.POSTGRES_HOST);
console.log(process.env.POSTGRES_DB);
console.log(process.env.POSTGRES_PASSWORD);
console.log(process.env.POSTGRES_PORT);

const pgDatabase = new Pool({
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST, // This matches the service name in the docker-compose file
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT,
});

export default pgDatabase;
