import { Item } from '../types/item';
import '../styles/ItemCard.css';

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const ItemCard = ({ item, onEdit, onDelete }: ItemCardProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      default:
        return 'status-pending';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in-progress':
        return 'En Progreso';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className="item-card">
      <div className="item-card-header">
        <h3>{item.title}</h3>
        <span className={`item-status ${getStatusClass(item.status)}`}>
          {getStatusText(item.status)}
        </span>
      </div>
      <p className="item-description">{item.description}</p>
      <div className="item-card-footer">
        <button onClick={() => onEdit(item)} className="btn btn-edit">
          Editar
        </button>
        <button onClick={() => onDelete(item._id)} className="btn btn-delete">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
