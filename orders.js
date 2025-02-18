const cuid = require('cuid')

const db = require('./db')

async function list(options = {}) {

    const order = await Order.findById(_id)
    .populate('products')
    .exec()
  
  return order
}

    async function get (_id) {

    const { offset = 0, limit = 25, productId, status } = options;
  
    const productQuery = productId ? {
      products: productId
    } : {}
  
    const statusQuery = status ? {
      status: status
    } : {}
  
    const query = {
      ...productQuery,
      ...statusQuery
    }
  
    const orders = await Order.find(query)
      .sort({ _id: 1 })
      .skip(offset)
      .limit(limit)
  
    return orders
  }
  
  async function create (fields) {
    const order = await new Order(fields).save()
    await order.populate('products')
    return order
  }
  

const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{
    type: String,
    ref: 'Product',index: true,
    required: true
  }],
  status: {
    type: String,
    index: true,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED']
  }
})