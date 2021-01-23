const Order = require("../models/orderModel");

// @desc Create new order
// @route POST /api/orders
// @access Private

const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      throw error;
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(400).json({ message: "No order items" });
  }
};

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private

const getOrderbyId = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) {
      res.json(order);
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Order not found" });
  }
};

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private

const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = order.save();
      res.json(updatedOrder);
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Payment Failed" });
  }
};

// @desc Update order to delivered
// @route POST /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = order.save();
      res.json(updatedOrder);
    } else {
      throw error;
    }
  } catch (error) {
    res.status(404).json({ message: "Deliver error" });
  }
};

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private

const getMyOrders = async (req, res) => {
  //console.log(req);
  try {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);
  } catch (error) {
    res.status(404).json({ message: "No orders" });
  }
};

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "id name");

    res.json(orders);
  } catch (error) {
    res.status(404).json({ message: "No orders" });
  }
};

module.exports = {
  addOrderItems,
  getOrderbyId,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
