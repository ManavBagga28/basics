import { OrderRepository } from "~src/repositories/order.repository";
import { CartRepository } from "~src/repositories/cart.repository";
import { OrderLineItem } from "~src/entities/order-line-item.entity";
import { OrderStatus } from "~src/types/order.type";
import { MessageType } from "~src/types/subscription.type";

// Create a new order
export const CreateOrder = async (
  userId: number,
  repo: OrderRepository,
  cartRepo: CartRepository
) => {
  // Find cart by customer id
  const cart = await cartRepo.findCart(userId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  // Calculate total order amount and prepare order line items
  let cartTotal = 0;
  let orderLineItems: OrderLineItem[] = [];

  // Loop through cart line items and prepare order line items
  cart.lineItems.forEach((item) => {
    cartTotal += item.qty * Number(item.price);

    // Create a new OrderLineItem instance and set properties
    const orderLineItem = new OrderLineItem();
    orderLineItem.productId = item.productId;
    orderLineItem.itemName = item.itemName;
    orderLineItem.qty = item.qty;
    orderLineItem.price = item.price;

    // Add the line item to the order line items array
    orderLineItems.push(orderLineItem);
  });

  const orderNumber = Math.floor(Math.random() * 1000000);

  // Create order with line items (exclude 'id', 'createdAt', 'updatedAt' fields)
  const orderInput = {
    customerId: userId,
    orderNumber,
    txnId: null,
    amount: cartTotal.toString(),
    status: OrderStatus.PENDING,
    orderItems: orderLineItems
  };

  // Call the repository method to create the order
  const order = await repo.createOrder(orderInput);

  // Clear cart data after order creation
  await cartRepo.clearCartData(userId);

  console.log("Order created", order);
};


// Update order status
export const UpdateOrder = async (
  orderId: number,
  status: OrderStatus,
  repo: OrderRepository
) => {
  const order = await repo.updateOrderStatus(orderId, status);

  // Optional: Fire a message to subscription service [catalog service] to update stock
  // if (status === OrderStatus.CANCELLED) {
  //   await repo.publishOrderEvent(order, "ORDER_CANCELLED");
  // }

  return { message: "Order updated successfully", status };
};

// Get order by ID
export const GetOrder = async (orderId: number, repo: OrderRepository) => {
  const order = await repo.findOrder(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

// Get all orders for a user
export const GetOrders = async (userId: number, repo: OrderRepository) => {
  const orders = await repo.findOrdersByCustomerId(userId);
  if (!Array.isArray(orders)) {
    throw new Error("Orders not found");
  }
  return orders;
};

// Delete order by ID
export const DeleteOrder = async (
  orderId: number,
  repo: OrderRepository
) => {
  await repo.deleteOrder(orderId);
  return { message: "Order deleted successfully" };
};

// Handle subscription messages (e.g., order updates)
export const HandleSubscription = async (message: MessageType) => {
  console.log("Message received by order Kafka consumer", message);

  // Handle specific events based on the message
  // if (message.event === OrderEvent.ORDER_UPDATED) {
  //   // Handle the order update event
  // }
};