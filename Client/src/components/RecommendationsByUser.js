import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/recommendationsByUser.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaUserCircle, FaSearch, FaBars, FaStar, FaRegComment } from 'react-icons/fa';
import {AiOutlineLike} from 'react-icons/ai';

const RecommendationsByUser = (props) => {
  console.log("client/postbyuser------------");
  let [postList, setPostList] = useState([]);
  let [userList, setUserList] = useState([]);
  let [placeList, setPlaceList] = useState([]);
  
  const user_id = JSON.parse(localStorage.getItem('user')).id;

  async function importData() {
    try {
        const fetchedUsers = await fetch(`http://localhost:3000/api/users/all`);
        const fetchedPlaces = await fetch(`http://localhost:3000/api/places`);
        const fetchedData = await fetch(`http://localhost:3000/api/blog`);
        const users = await fetchedUsers.json();
        const places = await fetchedPlaces.json();
        const data = await fetchedData.json();
        setUserList(users);
        setPlaceList(places);
        console.log("user: ", user_id);
        console.log(data);
        const recommByUser = data.filter(post => post.userId === user_id);
        setPostList(recommByUser);
    } catch (error) {
        console.error('Error fetching ', error);
    }
  }

  useEffect(() => {
      importData();

  }, []);
  
  console.log("posts:  ", postList );

  const StarRating = ({ rating }) => {
    const filledStars = rating ? Math.floor(rating) : 0;
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
  
    const renderStars = (count, isFilled) => {
      return Array.from({ length: count }).map((_, index) => (
        <FaStar key={index} color={isFilled ? 'gold' : 'gray'} />
      ));
    };
  
    return (
      <div>
        {renderStars(filledStars, true)}
        {halfStar && <FaStar color={rating >= 0.5 ? 'gold' : 'gray'} />}
        {renderStars(emptyStars, false)}
      </div>
    );
  };
  
  return (
          <div className='posts_by_user'>
            <div className="posts_list">
            {/* <div className="post"> */}
              {postList.map((post) => (
                <div key={post.id} className="post">
                  <div className="post_title2">
                    <div key={post.id} className="post_title">
                    <div className="post_place">
                        <label>Place: </label>
                        <label>{placeList.find((place) => place.id === post.placeId)?.name}</label>
                      </div>
                      <div className="post_writer">
                        <label>Name: </label>
                        <label>{userList.find((user) => user.id === post.userId)?.name}</label>
                      </div>
                    </div>
                    <div className="date_and_rating1">
                      <div className="date">
                        <label>{new Date(post.createdAt).toISOString().split("T")[0].split("-").reverse().join("/")}</label>
                      </div>
                      <div className="rating">
                        <StarRating rating={post.rating} />
                      </div>

                    </div>
                  </div>

                <div className="post_body">
                  <label>Body: </label>
                  <label>{post.more}</label>
                </div>

                <div className="photo">
                  {/* <img className="photo_img" src={require(post.url)}/> */}
                </div>

                <div className="post_bottom">
                  <div className="like_div">
                    <AiOutlineLike className="like_icon"/>
                    <button id='like'>Like</button>
                  </div>
                  <div className="new_comment_div">
                    <FaRegComment className="comment_icon"/>
                    <button id='new_comment'>Comment</button>
                  </div>

                </div>
              </div>))}

            </div>
          </div>
  );
};

export default RecommendationsByUser;
<div>
  <div>
    
  </div>
</div>