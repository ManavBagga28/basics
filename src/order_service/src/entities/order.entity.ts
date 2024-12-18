import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderLineItem } from './order-line-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({type:"number"})
  id!: number;

  @Column()
  customerId!: number;

  @Column()
  orderNumber!: number;

  @Column()
  status!: string;

  @Column()
  txnId!: string | null;

  @Column()
  amount!: string;

  @OneToMany(() => OrderLineItem, (lineItem) => lineItem.order, { cascade: true })
  orderItems!: OrderLineItem[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
