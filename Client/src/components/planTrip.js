import React, { useEffect, useState } from 'react';
import '../styles/planTrip.css';
import { FaUserCircle } from 'react-icons/fa';

const PlanTrip = () => {
  const [placesList, setPlacesList] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({ area: '', placeCategory: '' });
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  async function importData() {
    try {
      const fetchedPlaces = await fetch(`http://localhost:3000/api/places`);
      const places = await fetchedPlaces.json();
      setPlacesList(places);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    importData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const handleFindTrip = (e) => {
    e.preventDefault();
    // Filter the places based on the criteria
    const filtered = placesList.filter((place) => {
      console.log(place.area.toLowerCase());
      console.log(place.placeCategory.toLowerCase());

      const areaMatch = place.area.toLowerCase().includes(filterCriteria.area.toLowerCase());
      const categoryMatch = place.placeCategory.toLowerCase().includes(filterCriteria.placeCategory.toLowerCase());
      return areaMatch && categoryMatch;
    });
    setFilteredPlaces(filtered);
  };

  return (
    <>
      <div className='plan'>
        <h3>Plan Your Next Trip</h3>
        <h4>Let us help you find the most suitable route for you</h4>
        <div className='details'>
          <form className='findTripForm' onSubmit={handleFindTrip}>
            <input
              type='text'
              name='area'
              placeholder='Area- north/ center/ south'
              value={filterCriteria.area}
              onChange={handleInputChange}
              required
            />
            <input
              type='text'
              name='placeCategory'
              placeholder='Category- sea/ nature'
              value={filterCriteria.placeCategory}
              onChange={handleInputChange}
              required
            />
            <button className='find_btn' type='submit'>Find</button>
          </form>
        </div>

        {/* Display filtered places */}
        <div className='filtered-places'>
          {filteredPlaces.map((place) => (
            <div className='one_place' key={place.id}>
              <div className='place-overlay'>
                <h4>{place.name}</h4>
                <h4>{place.area}</h4>
              </div>
              <h3>{place.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlanTrip;
