import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/blog.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaUserCircle, FaSearch, FaBars, FaStar, FaRegComment } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import {AiOutlineLike} from 'react-icons/ai';
import NewRecommendations from "./newRecommendations";
import Comments from "./comments";

// import NewRecommendations from "../img/ad/1";

const Blog = (props) => {
  console.log("client/blog------------");
  let [postList, setPostList] = useState([]);
  let [userList, setUserList] = useState([]);
  let [placeList, setPlaceList] = useState([]);
  const [isRecFormVisible, setRecFormVisible] = useState(false);
  const [openCommentIndex, setOpenCommentIndex] = useState(null);
  const [optionsIndex, setOptionsIndex] = useState(null);
  const [editedRecommendation, setEditedRecommendation] = useState(null);


  // const openReqForm = () => setRecFormVisible(true);
  const openReqForm = () => {
    console.log("Open new post form");
    setRecFormVisible(true);
  };
  
  const closeReqForm = () => setRecFormVisible(false);

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
        setPostList(data);
    } catch (error) {
        console.error('Error fetching ', error);
    }
  }

  useEffect(() => {
      importData();
  }, []);
  // console.log("posts: ", postList );

  

  const toggleComments = (index) => {
    // console.log("comments function, index:", index);
    setOpenCommentIndex(openCommentIndex === index ? null : index);
  };

  const toggleOptions = (index) => {
    setOptionsIndex(optionsIndex === index ? null : index);
  };

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
  
//   async function handleEdit(recommendationId) {
//     try {
//       const response = await fetch(`http://localhost:3000/api/comments/update/${recommendationId}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//         },
//         // body: JSON.stringify({ body: updatedBody }),
//       });

//       if (response.ok) {
//           importData(); // Refresh comments after successful deletion
//       } else {
//           console.error("Error deleting comment");
//       }
//   } catch (error) {
//       console.error("Error deleting comment: ", error);
//   }
// }

const handleEdit = (recommendationId) => {
  // Set the edited recommendation based on its ID
  const recommendationToEdit = postList.find((post) => post.id === recommendationId);
  setEditedRecommendation(recommendationToEdit);
};

const handleEditChange = (field, value) => {
  // Update the edited recommendation's field value
  setEditedRecommendation((prevRecommendation) => ({
    ...prevRecommendation,
    [field]: value,
  }));
};

const handleEditSubmit = async (recommendationId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/blog/update/${recommendationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRecommendation),
    });

    if (response.ok) {
      importData(); // Refresh data after successful update
      setEditedRecommendation(null); // Exit edit mode
    } else {
      console.error("Error updating recommendation");
    }
  } catch (error) {
    console.error("Error updating recommendation: ", error);
  }
};

  async function handleDelete(recommendationId) {
    try {
      const response = await fetch(`http://localhost:3000/api/blog/delete/${recommendationId}`, {
          method: "DELETE",
      });

      if (response.ok) {
          importData(); // Refresh comments after successful deletion
      } else {
          console.error("Error deleting recommendation");
      }
  } catch (error) {
      console.error("Error deleting recommendation: ", error);
  }
}


  return (
    <div className='main_div'>
        <div className='left'>
          <div className='posts'>
            <div className="posts_list">
            {/* <div className="post"> */}
              {postList.map((post, index) => (
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
                    
                    <div className="date_and_rating">
                      <div className="date">
                        <label>{new Date(post.createdAt).toISOString().split("T")[0].split("-").reverse().join("/")}</label>
                      </div>
                      <div className="rating">
                        <StarRating rating={post.rating} />
                      </div>

                    </div>

                    <div className="options_icon">
                    {post.userId === user_id && (
                      <HiDotsHorizontal onClick={() => toggleOptions(index)} className="options_icon" />
                    )}
                    </div>
                  </div>

                <div className="post_body">
                  {/* <label>Body: </label> */}
                  {editedRecommendation && editedRecommendation.id === post.id ? (
                    <div>
                      <textarea
                        value={editedRecommendation.more}
                        onChange={(e) => handleEditChange("more", e.target.value)}
                      />
                      <button className="save_update_btn" onClick={() => handleEditSubmit(post.id)}>Save</button>
                    </div>
                ) : (
                  <label>{post.more}</label>
                )}
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
                    <button id='new_comment' onClick={() => toggleComments(index)}>Comment</button>
                  </div>

                </div>

                {optionsIndex === index && (
                  <div className="options">
                    <button onClick={() => handleEdit(post.id)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                  </div>)}

                {/* Display comments if openCommentIndex matches the current index */}
                {openCommentIndex === index && <Comments recommendationId={post.id} />}
              </div>))}

            </div>
            <div className="new">
                <button className="new_post_button" onClick={openReqForm}>+</button>
            </div>
          </div>
        </div>
        
        
        {isRecFormVisible && <NewRecommendations onClose={closeReqForm} />}

    </div>
  );
};

export default Blog;
