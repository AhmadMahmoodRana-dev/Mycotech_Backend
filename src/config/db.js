import oracledb from "oracledb";
import "dotenv/config";

// Ensure results come as JS objects with field names
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function getConnection() {
  return await oracledb.getConnection({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectionString: process.env.ORACLE_CONNECTION_STRING,
  });
}
