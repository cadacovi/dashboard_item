import api from '../lib/axios';
import { Item, CreateItemData, UpdateItemData } from '../types/item';

class ItemService {
  async createItem(data: CreateItemData): Promise<Item> {
    const response = await api.post<{ success: boolean; data: Item }>('/items', data);
    return response.data.data;
  }

  async getItems(status?: string): Promise<Item[]> {
    const url = status ? `/items?status=${status}` : '/items';
    const response = await api.get<{ success: boolean; data: Item[] }>(url);
    return response.data.data;
  }

  async getItem(id: string): Promise<Item> {
    const response = await api.get<{ success: boolean; data: Item }>(`/items/${id}`);
    return response.data.data;
  }

  async updateItem(id: string, data: UpdateItemData): Promise<Item> {
    const response = await api.patch<{ success: boolean; data: Item }>(`/items/${id}`, data);
    return response.data.data;
  }

  async deleteItem(id: string): Promise<void> {
    await api.delete(`/items/${id}`);
  }
}

export default new ItemService();
