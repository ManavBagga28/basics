import { EntityRepository, Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';
import { CartLineItem } from '../entities/cart-line-item.entity';
import { NotFoundError } from '~src/utils/error/errors';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  async createCart(customerId: number, lineItem: CartLineItem): Promise<number> {
    // Create a new Cart entity and link it to the customerId
    const cart = this.create({ customerId });

    // Save the cart to the database
    const savedCart = await this.save(cart);

    if (savedCart) {
      // Create a CartLineItem entity and link it to the saved cart
      const cartLineItemRepository = this.manager.getRepository(CartLineItem);

      // Link the saved cart to the line item before saving
      const lineItemWithCart = cartLineItemRepository.create({
        ...lineItem, // spread the line item data
        cart: savedCart, // assign the saved cart to the line item
      });

      // Save the line item
      await cartLineItemRepository.save(lineItemWithCart);

      return savedCart.id;
    }

    throw new Error('Failed to create cart');
  }

  async findCart(customerId: number): Promise<Cart> {
    // Find a cart by customerId and include its line items
    const cart = await this.findOne({
      where: { customerId },
      relations: ['lineItems'], // Ensure lineItems are loaded
    });

    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    return cart;
  }

  async updateCartLineItem(cartLineItemId: number, qty: number): Promise<CartLineItem> {
    // Get the CartLineItem repository to fetch and update the line item
    const cartLineItemRepository = this.manager.getRepository(CartLineItem);
    const cartLineItem = await cartLineItemRepository.findOne({where:{id: cartLineItemId}});

    if (!cartLineItem) {
      throw new NotFoundError('Cart line item not found');
    }

    // Update the quantity and save the line item
    cartLineItem.qty = qty;
    await cartLineItemRepository.save(cartLineItem);

    return cartLineItem;
  }

  async deleteCartLineItem(cartLineItemId: number): Promise<boolean> {
    // Get the CartLineItem repository to delete the line item
    const cartLineItemRepository = this.manager.getRepository(CartLineItem);
    const result = await cartLineItemRepository.delete(cartLineItemId);

    return result.affected !== 0; // Return true if deletion was successful
  }

  async clearCartData(customerId: number): Promise<boolean> {
    // Find the cart by customerId
    const cart = await this.findCart(customerId);

    // Remove the cart and its associated line items (cascade delete should be in place)
    await this.remove(cart);
    return true;
  }

  async findCartByProductId(customerId: number, productId: number): Promise<CartLineItem> {
    // Find the cart by customerId
    const cart = await this.findCart(customerId);

    // Find the line item with the specified productId
    const lineItem = cart.lineItems.find((item) => item.productId === productId);

    if (!lineItem) {
      throw new NotFoundError('Line item not found');
    }

    return lineItem;
  }
}