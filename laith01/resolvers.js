// functions
exports.resolvers = {
    Query: {
      books: (parent, args, context) => context.books,
      profit: () => true,
      total: () => 100,
      products: (parent, args, { products }) => products,
      product: (parent, args, context) => {
        const prodID = args.id;
        const foundProduct = context.products.find((item) => item.id === prodID);
        if (!foundProduct) return null;
        return foundProduct;
      },
      categories: (parent, args, { categories }) => categories,
      category: (parent, args, context) => {
        const { id } = args;
        const foundCategory = context.categories.find((item) => item.id === id);
        if (!foundCategory) return null;
        return foundCategory;
      },
    },
    Category: {
      products: (parent, args, { products }) => {
        const { id } = parent;
        return products.filter((item) => item.cat_id === id);
      },
    },
    Product: {
      category: ({ cat_id }, args, context) => {
        //const { cat_id } = parent;
        return context.categories.find((item) => item.id === cat_id);
      }
    }
  };