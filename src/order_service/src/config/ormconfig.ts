import { DataSource } from "typeorm";
import { Cart } from "~src/entities/cart.entity";
import { CartLineItem } from "~src/entities/cart-line-item.entity";
import { OrderLineItem } from "~src/entities/order-line-item.entity";
import { Order } from "~src/entities/order.entity";
import { Product } from "~src/entities/product.entity";
import { User } from "~src/entities/user.entity";

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
  entities: [Cart,CartLineItem,OrderLineItem,Order,Product,User],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});