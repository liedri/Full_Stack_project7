import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

import '../styles/comments.css';

export default function Comments({ recommendationId }) {

    const [commentsList, setCommentsList] = useState([]);
    const [usersMapList, setUsersMap] = useState({}); //userId US username
    const [newCommentBody, setNewCommentBody] = useState(""); // Track the new comment input
    const [updateCommentBody, setUpdateCommentBody] = useState(""); // Track the new comment input
    const [editingCommentIndex, setEditingCommentIndex] = useState(null);

    const user_id = JSON.parse(localStorage.getItem('user')).id;

    async function importData() {
        try {
            const fetchedData = await fetch(`http://localhost:3000/api/comments?recommendationId=${recommendationId}`);
            const comments = await fetchedData.json();
            console.log("the comment: ", comments);
            setCommentsList(comments);

            const fetchedUsers = await fetch('http://localhost:3000/api/users/all');
            const users = await fetchedUsers.json();
            console.log("users: ", users);
            let usersMap = {};
            users.forEach(user => {
                usersMap[user.id] = user.username;
                console.log("user: ", user.id, " ", user.username);
            });
            console.log("usersmap: ", usersMap);
            setUsersMap(usersMap);
        } catch (error) {
            console.error('Error fetching ', error);
        }
    }
    
    async function submitComment() {
      try {
          const response = await fetch(`http://localhost:3000/api/comments/post`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  recommendationId,
                  userId: user_id,
                  body: newCommentBody,
              }),
          });

          if (response.ok) {
            // Refresh the comments after successful submission
            importData();
            setNewCommentBody(""); // Clear the input field
          } else {
            console.error("Error submitting comment");
          }
      } catch (error) {
        console.error("Error submitting comment: ", error);
      }
    }

    async function deleteComment(commentId) {
      try {
          const response = await fetch(`http://localhost:3000/api/comments/delete/${commentId}`, {
              method: "DELETE",
          });

          if (response.ok) {
              importData(); // Refresh comments after successful deletion
          } else {
              console.error("Error deleting comment");
          }
      } catch (error) {
          console.error("Error deleting comment: ", error);
      }
    }

    async function updateComment(commentId, updatedBody) {
      try {
          const response = await fetch(`http://localhost:3000/api/comments/update/${commentId}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ body: updatedBody }),
          });

          if (response.ok) {
              importData(); // Refresh comments after successful update
              setEditingCommentIndex(null); // Stop editing
          } else {
              console.error("Error updating comment");
          }
      } catch (error) {
          console.error("Error updating comment: ", error);
      }
    }



    useEffect(() => {
        importData();
    }, [recommendationId]);


    return (
      <>
        <div className="comments">
        {commentsList.map((comment, index) => (
          <div key={index} className="comment">
            <div className="name_and_body">
              <p className="user">{usersMapList[comment.userId]}</p>
              {editingCommentIndex === index ? (
                <input className="edit_comment_input" type="text" value={updateCommentBody}
                onChange={(e) => setUpdateCommentBody(e.target.value)}/>
              ) : (
              <p className="body">{comment.body}</p>
              )}
            </div>
            {comment.userId === user_id && ( // Only show icons for the current user's comments
            <div className="comment_icons">
              <button className="edit_comment_button"
                onClick={() => {
                  if (editingCommentIndex === index) {
                    updateComment(comment.id, updateCommentBody);
                  } else {
                    setUpdateCommentBody(comment.body);
                    setEditingCommentIndex(index);
                  }
                }}
                ><AiFillEdit /></button>
              <button className="delete_comment_button"
                onClick={() => deleteComment(comment.id)}
              ><AiFillDelete /></button>       
            </div>)}
          </div>))}
          <div className="new_comment">
            <input className="new_comment_input" type="text" name="new_comment_body" placeholder="   write your comment her..."
            value={newCommentBody} onChange={(e) => setNewCommentBody(e.target.value)}/>
            <button className="submit_comment_button" onClick={submitComment}>Submit</button>
          </div>
        </div>
     </>
  );
}



