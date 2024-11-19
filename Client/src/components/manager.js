

import React, { useEffect, useState } from 'react';
import '../styles/manager.css';
import { FaUserCircle } from 'react-icons/fa';

const Manager = () => {
  const [placesList, setPlacesList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [addingPlace, setAddingPlace] = useState(false);
  const [newPlace, setNewPlace] = useState({ name: '', area: '', placeCategory: '', url: ''});
  const user = JSON.parse(localStorage.getItem('user'));

  async function importData() {
    try {
      const fetchedPlaces = await fetch(`http://localhost:3000/api/places`);
      const fetchedUsers = await fetch(`http://localhost:3000/api/users/all`);
      const places = await fetchedPlaces.json();
      const users = await fetchedUsers.json();
      setPlacesList(places);
      setUsersList(users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    importData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlace({ ...newPlace, [name]: value });
  };

  const handleAddPlace = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/places/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlace),
      });

      if (response.ok) {
        setNewPlace({ name: '', area: '', placeCategory: '', url:'' });
        setAddingPlace(false);
        importData();
      } else {
        console.error('Failed to add place');
      }
    } catch (error) {
      console.error('Error adding place', error);
    }
  };

  function formatDateToDdMmYy(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
  
    return `${day}/${month}/${year}`;
  }

  
  return (
    <>
      <div className='manage_div'>
        <div className='users_manage'>
          <h4>User List</h4>
          <table className='user-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.street} {user.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='places_manage'>
          <div className='title'>
            <h4>Place List</h4>
            <button className='add_place' onClick={() => setAddingPlace(!addingPlace)}>+</button>
          </div>
          {addingPlace && (
            <form className='add-place-form' onSubmit={handleAddPlace}>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={newPlace.name}
                onChange={handleInputChange}
                required
              />
              <input
                type='text'
                name='area'
                placeholder='Area'
                value={newPlace.area}
                onChange={handleInputChange}
                required
              />
              <input
                type='text'
                name='placeCategory'
                placeholder='Category'
                value={newPlace.placeCategory}
                onChange={handleInputChange}
                required
              />
              <input
                type='text'
                name='url'
                placeholder='photo url'
                value={newPlace.url}
                onChange={handleInputChange}
                required
              />
              <div className='add-place-buttons'>
                <button className='save_btn' type='submit'>Save</button>
                <button className='close_btn' onClick={() => setAddingPlace(false)}>Close</button>
              </div>
            </form>
          )}
          <table className='user-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Area</th>
                <th>Category</th>
                <th>Create At</th>
              </tr>
            </thead>
            <tbody>
              {placesList.map((place) => (
                <tr key={place.id}>
                  <td>{place.name}</td>
                  <td>{place.area}</td>
                  <td>{place.placeCategory}</td>
                  <td>{formatDateToDdMmYy(place.createdAt)}</td>                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Manager;
