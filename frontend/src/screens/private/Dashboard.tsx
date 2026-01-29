import { useState, useEffect } from 'react';
import itemService from '../../services/itemService';
import ItemCard from '../../components/ItemCard';
import ItemForm from '../../components/ItemForm';
import { Item, CreateItemData } from '../../types/item';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadItems();
  }, [filter]);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await itemService.getItems(filter);
      setItems(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar items');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (data: CreateItemData) => {
    try {
      await itemService.createItem(data);
      setShowForm(false);
      loadItems();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear item');
    }
  };

  const handleUpdateItem = async (data: CreateItemData) => {
    if (!editingItem) return;

    try {
      await itemService.updateItem(editingItem._id, data);
      setEditingItem(null);
      loadItems();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar item');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('¿Estas seguro de eliminar este item?')) return;

    try {
      await itemService.deleteItem(id);
      loadItems();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar item');
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setShowForm(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Mis Items</h1>
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setEditingItem(null);
          }} 
          className="btn btn-primary"
        >
          {showForm ? 'Cancelar' : 'Nuevo Item'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-filters">
        <label>Filtrar por estado:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Todos</option>
          <option value="pending">Pendiente</option>
          <option value="in-progress">En Progreso</option>
          <option value="completed">Completado</option>
        </select>
      </div>

      {(showForm || editingItem) && (
        <div className="dashboard-form">
          <ItemForm
            onSubmit={editingItem ? handleUpdateItem : handleCreateItem}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            initialData={editingItem || undefined}
            isEditing={!!editingItem}
          />
        </div>
      )}

      {loading ? (
        <div className="loading">Cargando...</div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p>No tienes items aun. ¡Crea uno para comenzar!</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
