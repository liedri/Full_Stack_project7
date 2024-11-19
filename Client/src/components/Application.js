import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Top from './top';
import Bottom from './bottom';
import Ads from './ads';
import '../styles/application.css';

function Application() {
  // const user_id = JSON.parse(localStorage.getItem('user')).id;
  const [selectedPlaceType, setSelectedPlaceType] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('user');
  };

  return (
    <>
      <div className="top">
        <Top />
      </div>

      <div className="center">
        <Outlet />
        <div className="application_right">
          <Ads />
        </div>
      </div>

      <div className="bottom">
        <Bottom />
      </div>
    </>
  );
}

export default Application;
