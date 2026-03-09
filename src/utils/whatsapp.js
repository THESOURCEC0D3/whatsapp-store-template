export const createWhatsAppOrderLink = (product, phone) => {
    const baseUrl = window.location.origin;
    const imageUrl = `${baseUrl}${product.image}`;

  const message = `
Hello 👋

I would like to order:

Product: ${product.name}
Price: ₦${product.price.toLocaleString()}
Product ID: ${product.id}

Product Image:
${imageUrl}

Please confirm availability.
  `;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
