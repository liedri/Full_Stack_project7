import React, { useState, useEffect } from 'react';
import '../styles/top.css';
import { FaArrowLeft } from 'react-icons/fa';


const Top = () => {
  console.log("top ------------------");
  const [manager, setManager] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.id === 1) {
      setManager(true);
    }
  }, []);

  return (
    <>
       <div className='top_img'>
        <h2 className='top_title'>LET'S TRAVEL</h2>
        <div className='navbar'>
          <a href="/">Home</a>
          <a href="#">Contact Us</a>
          <a href="/application/${user.id}/blog">Blog</a>
          {manager && 
            <a href="/application/1/manager" className="manager">Manager</a>
          }
        </div>
       </div>
       
    </>
  );
};

export default Top;