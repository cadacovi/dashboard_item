import { useState, FormEvent } from 'react';
import { CreateItemData, Item } from '../types/item';
import '../styles/ItemForm.css';

interface ItemFormProps {
  onSubmit: (data: CreateItemData) => void;
  onCancel?: () => void;
  initialData?: Item;
  isEditing?: boolean;
}

const ItemForm = ({ onSubmit, onCancel, initialData, isEditing }: ItemFormProps) => {
  const [formData, setFormData] = useState<CreateItemData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'pending',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <h2>{isEditing ? 'Editar Item' : 'Crear Nuevo Item'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Titulo</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripcion</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
        >
          <option value="pending">Pendiente</option>
          <option value="in-progress">En Progreso</option>
          <option value="completed">Completado</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Actualizar' : 'Crear'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ItemForm;
