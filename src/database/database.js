import {Pool} from "pg"

const url = "postgresql://neondb_owner:npg_Rdt2g5nSQFLX@ep-little-cloud-acpurmki-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require";

const database = new Pool ({
    connectionString:url, 
    ssl: {
     rejectUnauthorized: false //pois é obrigatório para conectar no NeonDB.
  }

})

export default database;