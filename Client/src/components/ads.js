import React, { useState, useEffect } from 'react';
import '../styles/ads.css';
import { FaArrowLeft } from 'react-icons/fa';
import RegisterForm from './registerForm';


const Ads = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const carouselImages = ['1.jpg', '2.jpg', '3.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

    return (
        <div className='right'>
            <div className="ad">
            <img className="ad_img" src={require(`../img/ad/${carouselImages[currentImageIndex]}`)} alt={`Ad ${currentImageIndex + 1}`} />
            </div>

        </div>
    )
}
export default Ads;