import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SuccessNotification from '../components/SuccessNotification';
import './../styles/main.css';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: null,
    additionalImages: []
  });
  
  const [currentAdditionalImage, setCurrentAdditionalImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewImages, setPreviewImages] = useState({
    coverImage: null,
    additionalImages: []
  });
  
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const additionalFileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImages(prev => ({
          ...prev,
          coverImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImageAdd = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = [...formData.additionalImages, ...files];
      setFormData(prev => ({
        ...prev,
        additionalImages: newImages
      }));
      
      // Create preview URLs
      const readers = files.map(file => {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImages(prev => ({
            ...prev,
            additionalImages: [...prev.additionalImages, reader.result]
          }));
        };
        reader.readAsDataURL(file);
        return reader;
      });
    }
  };

  const removeAdditionalImage = (index) => {
    const newImages = [...formData.additionalImages];
    newImages.splice(index, 1);
    
    const newPreviews = [...previewImages.additionalImages];
    newPreviews.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      additionalImages: newImages
    }));
    
    setPreviewImages(prev => ({
      ...prev,
      additionalImages: newPreviews
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const newItem = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      description: formData.description,
      coverImage: previewImages.coverImage,
      additionalImages: previewImages.additionalImages
    };
    
    const existingItems = JSON.parse(localStorage.getItem('items')) || [];
    const updatedItems = [...existingItems, newItem];
    
    localStorage.setItem('items', JSON.stringify(updatedItems));
    
    setShowSuccess(true);
    
    setFormData({
      name: '',
      type: '',
      description: '',
      coverImage: null,
      additionalImages: []
    });
    
    setPreviewImages({
      coverImage: null,
      additionalImages: []
    });
    
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="add-item-page"
    >
      <div className="container">
        <h1 className="page-title">Add New Item</h1>
        
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="add-item-form"
        >
          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Item Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select a type</option>
              <option value="Shirt">Shirt</option>
              <option value="Pant">Pant</option>
              <option value="Shoes">Shoes</option>
              <option value="Sports Gear">Sports Gear</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-input"
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label>Cover Image</label>
            <div className="image-upload-container">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleCoverImageChange}
                accept="image/*"
                style={{ display: 'none' }}
                required={!previewImages.coverImage}
              />
              
              {previewImages.coverImage ? (
                <div className="image-preview-container">
                  <img 
                    src={previewImages.coverImage} 
                    alt="Cover preview" 
                    className="image-preview"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, coverImage: null }));
                      setPreviewImages(prev => ({ ...prev, coverImage: null }));
                      fileInputRef.current.value = '';
                    }}
                    className="remove-image-btn"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="upload-btn"
                >
                  Choose Cover Image
                </button>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label>Additional Images</label>
            <div className="image-upload-container">
              <input
                type="file"
                ref={additionalFileInputRef}
                onChange={handleAdditionalImageAdd}
                accept="image/*"
                style={{ display: 'none' }}
                multiple
              />
              
              <button
                type="button"
                onClick={() => additionalFileInputRef.current.click()}
                className="upload-btn"
              >
                Add Additional Images
              </button>
              
              {previewImages.additionalImages.length > 0 && (
                <div className="additional-images-preview">
                  {previewImages.additionalImages.map((img, index) => (
                    <div key={index} className="image-preview-container">
                      <img 
                        src={img} 
                        alt={`Additional ${index + 1}`} 
                        className="image-preview"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="remove-image-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="submit-btn"
          >
            Add Item
          </motion.button>
        </motion.form>
      </div>
      
      {showSuccess && (
        <SuccessNotification message="Item successfully added" />
      )}
    </motion.div>
  );
};

export default AddItem;