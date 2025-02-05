import {addOrder, addOrderItems} from './orders.service.js';

export const createOrder = async (req, res, next) => {
  const {newOrder, cart } = req.body;
  const {first_name, last_name, email, address, total, user_id} = newOrder;

  if (!first_name || !last_name || !email || !address || !total || !user_id) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (isNaN(total)) {
    return res.status(400).json({ error: "Total must be a valid number" });
  }

    try {
      // create order
      const orderData = await addOrder(newOrder);
      // insert ordered items to DB with ID
      const orderItems = await addOrderItems(orderData.id, cart)
      res.status(201).json("orderData", orderData, "orderItems", orderItems);
    } catch (error) {
      res.status(500).json({ error: error.message || 'Failed to create order' });
    }
  };
  