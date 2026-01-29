const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El titulo es requerido'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripcion es requerida'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El usuario es requerido']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);
