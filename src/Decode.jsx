import React, { useState } from 'react';
import axios from 'axios';
import { combologo, imagelogo, upload_icon } from './Assets/Assets';
import './Decode.css'; // Import the CSS file for styling

const Decode = () => {
  const [imagePath, setImagePath] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const handleImageChange = (e) => {
    setImagePath(e.target.files[0]);
  };

  const handleDecode = () => {
    const formData = new FormData();
    formData.append('image', imagePath);

    axios.post('http://localhost:8000/api/decode/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setDecodedText(response.data.decodedtext);
      })
      .catch((error) => {
        console.error('Error decoding image:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDecode();
  };

  return (
    <div className="bodycontainer">
      <div className="encode_container">
        <form onSubmit={handleSubmit}>
          <div className="upload_container">
            <div className="upload_image_container">
              <input type="file" accept="image/*" onChange={handleImageChange} className="image_field" />
              <div className="upload_image" onClick={() => { document.querySelector('.image_field').click(); }}>
                <div className="image_logo">
                  <img src={imagelogo} alt="" />
                </div>
                <div className="upload_logo">
                  <div className="upload_text">
                    Upload image
                  </div>
                  <div className="upload_icon">
                    <img src={upload_icon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="action_buttons">
            <button type="submit" className="textenc">Decode</button>
          </div>
        </form>

        <div className="decoded_message_box">
          <h3>Decoded Message:</h3>
          <p>{decodedText}</p>
        </div>
      </div>
    </div>
  );
};

export default Decode;
