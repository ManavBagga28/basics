import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderLineItem } from '../entities/order-line-item.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(order: Order): Promise<number> {
    // Ensure that the order has orderItems properly populated.
    const savedOrder = await this.save(order);  // Order is saved first

    // After the order is saved, orderItems are saved (if not done by cascade).
    if (order.orderItems && order.orderItems.length > 0) {
      const orderLineItemRepository = this.manager.getRepository(OrderLineItem);
      await orderLineItemRepository.save(
        order.orderItems.map((item) => ({
          ...item,
          order: savedOrder,  // Assign savedOrder to the line items
        }))
      );
    }

    return savedOrder.id;
  }

  async findOrder(id: number): Promise<Order> {
    const order = await this.findOne({
      where: { id },
      relations: ['orderItems'],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const order = await this.findOrder(id);
    order.status = status;
    await this.save(order);
    return order;
  }

  async deleteOrder(id: number): Promise<boolean> {
    const result = await this.delete(id);
    return result.affected !== 0;
  }

  async findOrdersByCustomerId(customerId: number): Promise<Order[]> {
    return this.find({
      where: { customerId },
      relations: ['orderItems'],
    });
  }
}