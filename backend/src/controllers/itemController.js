const { validationResult } = require('express-validator');
const itemService = require('../services/itemService');

class ItemController {
  // Crear nuevo item
  async createItem(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const item = await itemService.createItem(req.body, req.user.id);
      
      res.status(201).json({
        success: true,
        message: 'Item creado exitosamente',
        data: item
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener todos los items del usuario
  async getUserItems(req, res, next) {
    try {
      const { status } = req.query;
      const items = await itemService.getUserItems(req.user.id, { status });
      
      res.status(200).json({
        success: true,
        count: items.length,
        data: items
      });
    } catch (error) {
      next(error);
    }
  }

  // Obtener item por ID
  async getItem(req, res, next) {
    try {
      const item = await itemService.getItemById(req.params.id, req.user.id);
      
      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Item no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        data: item
      });
    } catch (error) {
      next(error);
    }
  }

  // Actualizar item
  async updateItem(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false,
          errors: errors.array() 
        });
      }

      const item = await itemService.updateItem(req.params.id, req.user.id, req.body);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Item no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Item actualizado exitosamente',
        data: item
      });
    } catch (error) {
      next(error);
    }
  }

  // Eliminar item
  async deleteItem(req, res, next) {
    try {
      const item = await itemService.deleteItem(req.params.id, req.user.id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Item no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Item eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItemController();
