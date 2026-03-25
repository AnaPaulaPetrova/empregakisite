// import "server-only";

import pkg from "pg"
 const{Pool} = pkg
// const connectionString = "postgresql://neondb_owner:npg_Rdt2g5nSQFLX@ep-little-cloud-acpurmki-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require";

const connectionString = process.env.DATABASE_URL;

if(!connectionString) {
  throw new Error("DATABASE_URL não configurada")
}

export const database = new Pool({
  connectionString,
  ssl:{
    rejectUnauthorized:false
  }
});

// const database = new Pool ({
//     connectionString:url, 
//     ssl: {
//      rejectUnauthorized: false //pois é obrigatório para conectar no NeonDB.
//   },
// });

// export default database;