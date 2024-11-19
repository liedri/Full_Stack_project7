import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './components/login';
import Application from './components/Application';
import Blog from './components/blog';
import Profile from './components/profile';
import Places from './components/places';
import Place from './components/place';
import Manager from './components/manager';
import PlanTrip from './components/planTrip';



export const userContext = React.createContext();

function App() {
  console.log("client/app --------------")
  const [userInfo, setUserInfo] = useState({});

  return (
    <userContext.Provider value={userInfo}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginPage setUserInfo={setUserInfo} />} />
          <Route exact path='/login' element={<LoginPage setUserInfo={setUserInfo} />} />

          <Route path='/application' element={<Application />} >
            <Route path="/application/places" element={<Places />} />
            <Route path="/application/place/:placeType" element={<Place />} />
            <Route path="/application/:id/blog" element={<Blog />} />
            <Route path="/application/:id/profile" element={<Profile />} />
            <Route path="/application/:id/manager" element={<Manager />} />
            <Route path="/application/:id/planTrip" element={<PlanTrip />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default App;
