import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get cart items
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('cart');
    res.json({ cart: user.cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Failed to get cart' });
  }
});

// Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1, title, price, image } = req.body;

    if (!productId || !title || !price) {
      return res.status(400).json({ message: 'Product details are required' });
    }

    const user = await User.findById(req.user._id);
    
    // Check if item already exists in cart
    const existingItemIndex = user.cart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex > -1) {
      // Update quantity
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      user.cart.push({
        productId,
        quantity,
        title,
        price,
        image
      });
    }

    await user.save();
    res.json({ message: 'Item added to cart', cart: user.cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

// Update cart item quantity
router.put('/update/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }

    const user = await User.findById(req.user._id);
    const itemIndex = user.cart.findIndex(item => item.productId === productId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    user.cart[itemIndex].quantity = quantity;
    await user.save();
    
    res.json({ message: 'Cart updated', cart: user.cart });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Failed to update cart' });
  }
});

// Remove item from cart
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);
    
    user.cart = user.cart.filter(item => item.productId !== productId);
    await user.save();
    
    res.json({ message: 'Item removed from cart', cart: user.cart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
});

// Clear cart
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    
    res.json({ message: 'Cart cleared', cart: user.cart });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
});

export default router;
