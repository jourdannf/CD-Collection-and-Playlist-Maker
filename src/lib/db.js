import pg from 'pg';
import 'dotenv/config'

const {Pool} = pg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.PGHOST,
    database: process.env.DB_NAME,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

export default pool;