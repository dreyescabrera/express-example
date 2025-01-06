const RelationNames = {
  User: {
    customer: 'customer'
  },
  Customer: {
    user: 'user'
  },
  Category: {
    product: 'products'
  },
  Product: {
    category: 'category'
  }
}

module.exports = RelationNames
