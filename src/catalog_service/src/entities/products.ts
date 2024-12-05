import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'products'}) 
export class Product {
  @PrimaryGeneratedColumn({type: "int"})
  id?: number;

  @Column({type: "varchar"})
  name!: string;

  @Column({type: "varchar"})
  description!: string;

  @Column({type: "int"})
  price!: number;

  @Column({type: "int"})
  stock!: number;

}
