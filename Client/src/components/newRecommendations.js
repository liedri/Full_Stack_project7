import React, { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';
import '../styles/newReq.css';

const NewRecommendations = ({ onClose }) => {
  console.log("new req---------------");
  let [placeList, setPlaceList] = useState([]);
  console.log(typeof placeList);
  const user_id = JSON.parse(localStorage.getItem('user')).id;
  console.log("userId: ", user_id);
  async function importData() {
    try {
      const fetchedPlaces = await fetch(`http://localhost:3000/api/places`);
      const places = await fetchedPlaces.json();
      setPlaceList(places);
      console.log(typeof placeList);

    } catch (error) {
      console.error('Error fetching ', error);
    }
  }

  useEffect(() => {
    importData();
  }, []);

  const [newPost, setNewPost] = useState({
    userId: user_id,
    placeId: '',
    url: '',
    more: '',
    rating: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleRatingChange = (event) => {
    const ratingValue = parseInt(event.target.value);
    setNewPost((prevPost) => ({ ...prevPost, rating: ratingValue }));
  };

  const handlePlaceChange = (event) => {
    const selectedPlaceId = parseInt(event.target.value);
    setNewPost((prevPost) => ({ ...prevPost, placeId: selectedPlaceId}));
    console.log("select value: ", selectedPlaceId);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/blog/post', {
        method: 'POST',
        body: JSON.stringify(newPost), // Send the entire form data
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('response.ok');

      } else {
        console.error('Failed to post the new comment.');
      }
    } catch (error) {
      console.error('Error posting the new comment:', error);
    }
    onClose();

  };



  return (
    <div className="new_post_div">
      <div className="new_post">
        <div className="detail">
          <h4>New Recommendation</h4>
          <h5>Share your experience with us</h5>
        </div>
        <form onSubmit={handleSubmit}>
          {/* <div>
            <label>place:</label>
            <input className="new_input" type="text" name="place" value={newPost.placeId} onChange={handleInputChange} />
          </div> */}
          <div>
            <label>place:</label>
            <select className="place_options" value={newPost.placeId} onChange={handlePlaceChange}>
              <option value="">Select A Place</option>
              {placeList.map((place, index) => (
                <option key={index} value={place.id}>{place.name}</option>
              ))}
            </select> 
          </div>
          <div>
            <label>url:</label>
            <input className="new_input" type="text" name="url" value={newPost.url} onChange={handleInputChange} />
          </div>
          <div>
            <label>more:</label>
            <input className="new_input" type="text" name="more" value={newPost.more} onChange={handleInputChange} />
          </div>
          <div>
            <label>rating:</label>
            <input className="new_input" type="text" name="rating" value={newPost.rating} onChange={handleRatingChange} />
          </div>
          <div>
            <button className="new_req_btn" type="submit">Submit</button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default NewRecommendations;
