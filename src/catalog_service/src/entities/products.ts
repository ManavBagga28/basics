import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'products'}) 
export class Products {
  @PrimaryGeneratedColumn({type: "int"})
  id?: number;

  @Column({type: "varchar2"})
  name!: string;

  @Column({type: "varchar2"})
  description!: string;

  @Column({type: "int"})
  price!: number;

  @Column({type: "int"})
  stock!: number;

}
