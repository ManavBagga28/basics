import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')  // This will create a table named 'products'
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal')  // For price, use 'decimal' or 'float' based on your preference
  price!: number;

  @Column()
  stock!: number;

  @Column({ nullable: true })  // Marking the variant column as nullable (if needed)
  variant!: string;
}
