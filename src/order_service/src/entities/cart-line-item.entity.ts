import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_line_items')
export class CartLineItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productId!: number;

  @Column()
  itemName!: string;

  @Column()
  price!: string;

  @Column()
  qty!: number;

  @Column({ nullable: true })
  variant!: string | null;

  @ManyToOne(() => Cart, (cart) => cart.lineItems)
  cart!: Cart;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;

  @Column({ nullable: true })
  availability?: number;
}
