import { motion } from 'framer-motion';
import './../styles/main.css';

const ItemCard = ({ item, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className="item-card"
      onClick={onClick}
    >
      <div className="card-image-container">
        <img 
          src={item.coverImage} 
          alt={item.name} 
          className="card-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Available';
          }}
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.name}</h3>
        <span className="card-type">{item.type}</span>
      </div>
    </motion.div>
  );
};

export default ItemCard;