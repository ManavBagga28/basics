import { DataSource } from "typeorm";
import { Products } from "../entities/products";

require('Dotenv').config()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_URL,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  ssl: false,
  entities: [Products],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});