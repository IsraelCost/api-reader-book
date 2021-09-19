import { createConnection } from "typeorm";

createConnection().then(() => console.log("Connected with database!")).catch(err => console.error(err));