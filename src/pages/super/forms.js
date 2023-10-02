// ProductListingForm.js
import React, { useState } from 'react';
import './super.css';
import { uploadImage } from '../../dbservice/api/apiservice';
import { storage } from '../../dbservice/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/listing/listingManagers';

function ProductListingForm() {
  

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ' ',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const dispatch = useDispatch();
  
  const handleImageUpload = (e) => {
      console.log('called');
      e.preventDefault()
      const file = e.target.files[0]
      if (!file) return;
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on("state_changed",
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setProduct({
              ...product,
              image: downloadURL,
            });
          });
        },
        (error) => {
          alert(error);
        },
      );
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send product data to your backend or perform other actions here
    console.log('Product Data:', product);
    dispatch(addItem(product));
    setProduct({
      name: '',
      description: '',
      price: '',
      image: null,
    });
  };

  return (
    <div className="product-listing-form">
      <h2>Product Listing Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Product Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageUpload}
            accept="image/*"
            required
          />
        </div>
        <button  className="btn" type="submit">List Product</button>
      </form>
    </div>
  );
}

export default ProductListingForm;
