const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getMyOrders,
  getOrderbyId,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderbyId);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

module.exports = router;
