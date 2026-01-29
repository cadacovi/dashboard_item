export interface Item {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemData {
  title: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed';
}

export interface UpdateItemData {
  title?: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed';
}

export interface ItemResponse {
  success: boolean;
  message?: string;
  data?: Item;
  count?: number;
}
