import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'Lunexa',
  // TiDB Cloud public endpoints require TLS. Node.js uses its built-in CA
  // store, which is trusted by TiDB Cloud Starter.
  ssl: process.env.DB_SSL === 'true' ? { minVersion: 'TLSv1.2' } : undefined,
  timezone: '+07:00',        // Múi giờ Việt Nam – đảm bảo DATE() trong query đúng với giờ VN
});
