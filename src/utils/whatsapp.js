import { config } from "../config";

export const createWhatsAppOrderLink = (product, phone) => {
    const baseUrl = window.location.origin;
    const imageUrl = `${baseUrl}${product.image}`;

  const message = `
Hello 👋

${config.orderMessage}

Product: ${product.name}
Price: ${config.currency}${product.price.toLocaleString()}
Product ID: ${product.id}

Product Image:
${imageUrl}

Please confirm availability.
  `;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
