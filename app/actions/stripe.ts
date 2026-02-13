"use server";

import { stripe } from "../../lib/stripe";
import { products } from "../../lib/data";

export interface CartLineItem {
  productId: string;
  quantity: number;
}

export async function startCheckoutSession(cartItems: CartLineItem[]) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("El carrito esta vacio");
  }

  // Validate all products exist and build line items server-side
  const lineItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Producto con id "${item.productId}" no encontrado`);
    }

    return {
      price_data: {
        currency: "mxn",
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.price * 100, // Stripe expects amount in centavos
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: lineItems,
    mode: "payment",
  });

  return session.client_secret;
}
