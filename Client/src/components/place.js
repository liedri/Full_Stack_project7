import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/place.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';

const Place = () => {
  const { placeType } = useParams(); // Get the placeType from URL params
  console.log("place-component");
  const [placesList, setPlacesList] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(true); // Initially set to true
  const user = JSON.parse(localStorage.getItem('user'));

  async function importData() {
    try {
      const fetchedPlaces = await fetch(`http://localhost:3000/api/places`);
      const places = await fetchedPlaces.json();
      const place_type = places.filter(place => place.placeCategory === placeType)
      console.log("places[0].url: ", places[0].url);
      setPlacesList(place_type);
      setIsListEmpty(place_type.length === 0); // Update isListEmpty based on data
    } catch (error) {
      console.error('Error fetching ', error);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    importData();
  }, []);

  return (
    <>
      <div className='place_div'>
        <div className='all_div'>
          {placesList.map((place) => (
            <div className='one_place' key={place.id} >
              <img className="photo_img1" src={require(`${place.url}`)}/>
              <div className="place-overlay">
                <h4 className='name'>{place.name}</h4>
                <h4>{place.area}</h4>
              </div>
              <h3>{place.name}</h3>
            </div>
          ))}
          {isListEmpty && <p>Will be added soon</p>}
        </div>
        <button className='return_btn' onClick={() => navigate('/application/places')}>Back to Places</button>
      </div>
    </>
  );
};

export default Place;
