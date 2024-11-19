import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './loginForm';
import '../styles/login_page.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';

const LoginPage = () => {
  const navigate = useNavigate();
  //const [usersList, setUsersList] = useState([]);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const openLoginForm = () => setIsLoginFormVisible(true);
  const closeLoginForm = () => setIsLoginFormVisible(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(!!JSON.parse(localStorage.getItem('user')));
  const [userName, setUserName] = useState('');
  const [manager, setManager] = useState(false);

  useEffect(() => {
    console.log("isLoginFormVisible: ", isLoginFormVisible);
    // Retrieve user data and set user name when user is connected
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name); 
      setIsConnected(true);
      if (user.id === 1) {
        setManager(true);
      }
    }

  }, [isLoginFormVisible]); 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Check if there's a user connected based on localStorage
  const logout = async() => {
    localStorage.removeItem('user');
    setIsConnected(false);
    setUserName(''); // Clear the user name when logging out

  };

  return (
    <div className='background'>
      <div className='main'>

        <div className='left_div'>
          <div className='left_top_div'>
            <div className='sidebar'>
              <FaBars className='sidebar-icon' onClick={toggleSidebar} />
              {isSidebarOpen && (
                <div className='sidebar-links1'>
      <div id="mySidebar" class="sidebar1" style={{ width: isSidebarOpen ? '250px' : '0',
                                              left: isSidebarOpen ? '0' : '-250px',
                                              transition: 'width 0.3s ease-in-out' }}>
                    <a href="javascript:void(0)" class="closebtn" onClick={toggleSidebar}>×</a>
                    <a href="/application/places">Places</a>
                    <a href="#">Hospitality</a>
                    <a href="#">Food Places</a>
                    <a href="/application/${user.id}/profile">Your Profile</a>
                  </div>
                </div>
              )}
            </div>
            <div className='navbar'>
              <a href="#">Home</a>
              <a href="#">Contact Us</a>
              <a href="/application/${user.id}/blog">Blog</a>
              {manager && 
                <a href="/application/1/manager">Manager</a>
              }
            </div>
          </div>
          <div className='left_buttom_div'>
            <div className='text_div'>
              <h2>EXPLORE</h2>
              <h3>THE NATURE</h3>
              <p>Connect to the site and start looking<br/>
              for your next adventure in nature</p>
            </div>
            <div className='buttons_div'>
              <button id='discover_button'>Discover</button>
              <button id='more_button'>Know More</button>
            </div>
          </div>
        </div>
        <div className='right_div'>
          <div className='right_top_div'>
            <div>
              <input type="text" id="search_bar" placeholder="Search..." />
              <FaSearch className="search_icon"/>
            </div>
            {isConnected ? (
              <div className='logout_div'>
                <button id="logout" onClick={logout}>
                  <span className="hello-text">Hello {userName}</span> Log Out
                </button>
                <FaUserCircle className="user_icon"/>
              </div>
            ) : (
              <div className='login_div'>
                <button id="login" onClick={openLoginForm}>Log In</button>
                <FaUserCircle className="user_icon"/>
              </div>
            )}
          </div>
          <div className='right_buttom_div'>
            <div className='links'>
              <FaTwitter className="link_icon"/>
              <FaFacebookF className="link_icon"/>
              <FaInstagram className="link_icon"/>
              <FaYoutube className="link_icon"/>
            </div>
          </div>
        </div>
      </div>
      {isLoginFormVisible && <LoginForm onClose={closeLoginForm} />}
    </div>
  );
};

export default LoginPage;