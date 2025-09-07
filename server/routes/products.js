import express from 'express';
import axios from 'axios';

const router = express.Router();

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, limit = 20, skip = 0, search } = req.query;
    
    let url = 'https://dummyjson.com/products';
    const params = new URLSearchParams();
    
    if (limit) params.append('limit', limit);
    if (skip) params.append('skip', skip);
    if (search) params.append('search', search);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await axios.get(url);
    let products = response.data.products;

    // Apply filters
    if (category) {
      products = products.filter(product => 
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (minPrice || maxPrice) {
      products = products.filter(product => {
        if (minPrice && product.price < parseFloat(minPrice)) return false;
        if (maxPrice && product.price > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    res.json({
      products,
      total: products.length,
      skip: parseInt(skip),
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

// Get categories
router.get('/categories/list', async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products/categories');
    res.json(response.data);
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

export default router;
