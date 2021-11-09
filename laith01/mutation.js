const { v4: uuidv4 } = require("uuid");

exports.Mutation = {
  addC: (parent, { input }, { categories }) => {
    const newCat = {
      id: uuidv4(),
      name: input.name,
    };
    categories.push(newCat);
    return newCat;
  },
  addP: (parent, { input }, { products }) => {
    const { name, description, quantity, price, onSale, image, cat_id } = input;
    const newP = {
      id: uuidv4(),
      name,
      description,
      quantity,
      price,
      onSale,
      image,
      cat_id,
    };
    products.push(newP);
    return newP;
  },
  addR: (parent, { input }, { reviews }) => {
    const { date, title, comment, rating, productId } = input;
    const newR = {
      id: uuidv4(),
      date,
      title,
      comment,
      rating,
      productId,
    };
    reviews.push(newR);
    return newR;
  },
  updateC: (parent, { id, input }, { categories }) => {
    const idx = categories.findIndex((cat) => cat.id === id);
    categories[idx] = {
      ...categories[idx],
      ...input
    }
    return categories[idx];
  }
};
