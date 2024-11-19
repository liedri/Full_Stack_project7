import React, { useState } from 'react';
import '../styles/bottom.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';


const Bottom = () => {
  console.log("bottom ------------------")

  return (
    <>
      <div className='bottom_div'>
        <div className='details'>
          <h6>nvkjeborjblenbojorb<br/>
          jvnrkjbhrbjksb</h6>
        </div>
        <div className='bottom_links'>
              <FaTwitter className="bottom_icon"/>
              <FaFacebookF className="bottom_icon"/>
              <FaInstagram className="bottom_icon"/>
              <FaYoutube className="bottom_icon"/>
        </div>
      </div>

    </>
  );
};

export default Bottom;