import { motion } from 'framer-motion';
import './../styles/main.css';

const SuccessNotification = ({ message }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="success-notification"
    >
      <div className="success-content">
        <svg viewBox="0 0 24 24" className="success-icon">
          <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
        </svg>
        <span>{message}</span>
      </div>
    </motion.div>
  );
};

export default SuccessNotification;