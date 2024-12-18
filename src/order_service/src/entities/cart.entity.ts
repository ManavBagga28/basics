import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartLineItem } from './cart-line-item.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customerId!: number;

  @OneToMany(() => CartLineItem, (lineItem) => lineItem.cart)
  lineItems!: CartLineItem[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
