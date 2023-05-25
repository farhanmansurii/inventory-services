const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    unique: [true, 'Item name should be unique.'],
    required: [true, 'Item name is required.']
  },
  category: {
    type: String,
    required: [true, 'Category is required.']
  },
  itemCode: {
    type: String,
    unique: [true, 'Item code should be unique.'],
    required: [true, 'Item code is required.']
  },
  itemDescription: {
    type: String,
    required: false
  },
  unit: {
    type: String,
    required: [true, 'Unit is required.']
  },
  openingStock: {
    type: Number,
    required: [true, 'Opening stock is required.']
  },
  asOfDate: {
    type: String,
    required: [true, 'As of date is required.']
  },
  lowStockWarning: {
    type: Boolean,
    default: false,
    required: false
  },
  holdedStock:{ type: Number,
    required:false,default:0},
  lowStockUnits: {
    type: Number,
    required: [true, 'Low stock units is required.']
  },
  purchasePrice: {
    type: Number,
    required: [true, 'Purchase price is required.']
  },
  inclusiveOfTax: {
    type: Boolean,
    default: false,
    required: [true, 'Inclusive of tax is required.']
  },
  gstTaxRate: {
    type: Number,
    required: [true, 'GST tax rate is required.']
  },
  images: {
    type: [String],
    required: false
  }
});

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);
