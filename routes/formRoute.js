const express = require('express');
const router = express.Router();
const Inventory = require('../models/InventoryModel');
const bodyParser = require('body-parser');

// Configure body-parser middleware
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json({ items });
  } catch (error) {
    res.status(404).json({ message: 'No products found: ' + error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    await Inventory.create(req.body);
    res.json({ message: 'Item added successfully' });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const duplicateFields = Object.keys(error.keyPattern).join(', ');
      res.status(400).json({ error: `Duplicate fields: ${duplicateFields}` });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Item edited successfully' });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern) {
      const duplicateFields = Object.keys(error.keyPattern).join(', ');
      res.status(400).json({ error: `Duplicate fields: ${duplicateFields}` });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.json({ message: 'Error: ' + error });
  }
});

module.exports = router;
