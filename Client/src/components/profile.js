import React, { useEffect, useState } from "react";
import '../styles/profile.css';
import { FaEdit } from 'react-icons/fa';
import RecommendationsByUser from './RecommendationsByUser';

const Profile = (props) => {
  let [postList, setPostList] = useState([]);
  let [placeList, setPlaceList] = useState([]);
  let [editMode, setEditMode] = useState(false);
  let [editedUser, setEditedUser] = useState(JSON.parse(localStorage.getItem('user')));

  async function importData() {
    try {
      const fetchedPlaces = await fetch(`http://localhost:3000/api/places`);
      const fetchedData = await fetch(`http://localhost:3000/api/blog`);
      const places = await fetchedPlaces.json();
      const data = await fetchedData.json();
      setPlaceList(places);
      setPostList(data);
    } catch (error) {
      console.error('Error fetching ', error);
    }
  }

  useEffect(() => {
    importData();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    console.log("save button pressed");
    try {
      const response = await fetch(`http://localhost:3000/api/users/update/${editedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        setEditMode(false);
        localStorage.setItem('user', JSON.stringify(editedUser));
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user: ', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="profile_div">
        <div className="left">
          <div className="user_details">
            <h5>Your details:</h5>
            <div className="details">
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="street"
                    value={editedUser.street}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="city"
                    value={editedUser.city}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <h6>name: {editedUser.name}</h6>
                  <h6>phone: {editedUser.phone}</h6>
                  <h6>email: {editedUser.email}</h6>
                  <h6>address: {editedUser.street} {editedUser.city}</h6>
                  <h6>username: {editedUser.username}</h6>
                </>
              )}
            </div>
            {editMode ? (
              <button id='save_details' onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button id='edit_details' onClick={handleEditClick}>
                <FaEdit className="edit_icon"/>
              </button>
            )}
          </div>
          <div className="user_recommendations">
            <h5>Your Recommendations</h5>
            <RecommendationsByUser />
          </div>
        </div>
        <div className="right">
          <h5>Hello</h5>
        </div>
      </div>
    </>
  );
};

export default Profile;
