import { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import ItemDetailsModal from '../components/ItemDetailsModal';
import { motion } from 'framer-motion';
import './../styles/main.css';

const ViewItems = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Classic White Shirt',
      type: 'Shirt',
      description: 'Premium quality white shirt made from 100% Egyptian cotton.',
      coverImage: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
      additionalImages: [
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
        'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9',
        'https://images.unsplash.com/photo-1562157873-818bc0726f68'
      ]
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      type: 'Pant',
      description: 'Modern slim fit jeans with stretch technology for maximum comfort.',
      coverImage: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
      additionalImages: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
        'https://images.unsplash.com/photo-1475178626620-a4d074967452'
      ]
    }
  ]);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];
    if (savedItems.length > 0) {
      setItems(savedItems);
    }
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="view-items-page"
    >
      <div className="container">
        <h1 className="page-title">Browse Our Collection</h1>
        
        <div className="items-grid">
          {items.map((item) => (
            <ItemCard 
              key={item.id} 
              item={item} 
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ItemDetailsModal 
          item={selectedItem} 
          onClose={closeModal} 
        />
      )}
    </motion.div>
  );
};

export default ViewItems;