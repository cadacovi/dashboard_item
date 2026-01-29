const Item = require('../models/Item');

class ItemService {
  // Crear nuevo item
  async createItem(itemData, userId) {
    const item = await Item.create({ ...itemData, user: userId });
    return item;
  }

  // Obtener todos los items del usuario
  async getUserItems(userId, filters = {}) {
    const query = { user: userId };
    
    if (filters.status) {
      query.status = filters.status;
    }

    const items = await Item.find(query).sort({ createdAt: -1 });
    return items;
  }

  // Obtener item por ID
  async getItemById(itemId, userId) {
    const item = await Item.findOne({ _id: itemId, user: userId });
    if (!item) {
      throw new Error('Item no encontrado');
    }
    return item;
  }

  // Actualizar item
  async updateItem(itemId, userId, updateData) {
    const item = await Item.findOneAndUpdate(
      { _id: itemId, user: userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!item) {
      throw new Error('Item no encontrado');
    }

    return item;
  }

  // Eliminar item
  async deleteItem(itemId, userId) {
    const item = await Item.findOneAndDelete({ _id: itemId, user: userId });
    if (!item) {
      throw new Error('Item no encontrado');
    }
    return item;
  }
}

module.exports = new ItemService();
