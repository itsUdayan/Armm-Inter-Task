import { motion, AnimatePresence } from 'framer-motion';
import ImageCarousel from './ImageCarousel';
import './../styles/main.css';

const ItemDetailsModal = ({ item, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-modal-btn" onClick={onClose}>
            &times;
          </button>
          
          <div className="modal-body">
            <div className="modal-images">
              <ImageCarousel images={[item.coverImage, ...item.additionalImages]} />
            </div>
            
            <div className="modal-details">
              <h2>{item.name}</h2>
              <span className="item-type">{item.type}</span>
              <p className="item-description">{item.description}</p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="enquire-btn"
              >
                Enquire
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ItemDetailsModal;