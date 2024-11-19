import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/places.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';
import Place from './place';

const Places = () => {
  const [placesList, setPlacesList] = useState([]);
  const [selectedPlaceType, setSelectedPlaceType] = useState(null); // State for selected place type
  const navigate = useNavigate();

  async function importData() {
    try {
        const fetchedPlaces = await fetch(`http://localhost:3000/api/places`);
        const places = await fetchedPlaces.json();
        setPlacesList(places);
    } catch (error) {
        console.error('Error fetching ', error);
    }
  }

const handlePlaceClick = (placeType) => {
    // Use navigate to go to the Place component with the placeType parameter
    navigate(`/application/place/${placeType}`);
  };


  useEffect(() => {
    importData();
}, []);

  return (
    <>
    <div className='places_div'>
        <div className='types'>
            <div className='sea_div' onClick={() => handlePlaceClick('sea')}>
                <img className="photo_img1" src={require('../img/places/sea.jpg')}/>
                <h3>BEACH</h3>
            </div>
            <div className='nature_div' onClick={() => handlePlaceClick('nature')}>
                <img className="photo_img1" src={require('../img/places/nature.jpg')}/>
                <h3>NATURE</h3>
            </div>
            <div className='hotel_div' onClick={() => handlePlaceClick('hotel')}>
                <img className="photo_img1" src={require('../img/places/hotel.jpg')}/>
                <h3>HOTEL</h3>
            </div>
        </div>
        <div className='explaination'>
            <h3>Start your experience</h3>
            <p>Here you can find a breakdown<br/>
             of each of the things that will make your trip perfect</p>
        </div>
    </div>
    {/* Conditional rendering of Place component */}
    {selectedPlaceType && <Place placeType={selectedPlaceType} />}
    </>
  );
};

export default Places;