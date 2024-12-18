import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity('order_line_items')
export class OrderLineItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  itemName!: string;

  @Column()
  price!: string;

  @Column()
  qty!: number;

  @Column()
  productId!: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order!: Order;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
