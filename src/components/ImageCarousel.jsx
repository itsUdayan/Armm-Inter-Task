import { useState } from 'react';
import { motion } from 'framer-motion';
import './../styles/main.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-carousel">
      <div className="main-image-container">
        <img 
          src={images[currentIndex]} 
          alt={`Item view ${currentIndex + 1}`} 
          className="main-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
          }}
        />
        
        <button className="carousel-btn prev" onClick={prevImage}>
          &lt;
        </button>
        <button className="carousel-btn next" onClick={nextImage}>
          &gt;
        </button>
      </div>
      
      <div className="thumbnail-container">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.05 }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/100x100?text=Image+Not+Available';
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;