const RelationNames = {
  User: {
    customer: 'customer'
  },
  Customer: {
    user: 'user',
    order: 'orders'
  },
  Category: {
    product: 'products'
  },
  Product: {
    category: 'category'
  },
  Order: {
    customer: 'customer',
    product: 'items'
  }
}

module.exports = RelationNames
