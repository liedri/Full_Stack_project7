import React, { useState } from 'react';
import '../styles/loginForm.css';
import { FaArrowLeft } from 'react-icons/fa';
import RegisterForm from './registerForm';


const LoginForm = ({ onClose }) => {
  console.log("login Form ------------------")
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    // Clear the error message when the user starts typing in a field
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    // Check if the username and password fields are empty
    if (formData.username === '') {
      setErrors({ ...errors, username: 'The username field is required' });
    }
    if (formData.password === '') {
      setErrors({ ...errors, password: 'The password field is required' });
    }
    
    // If any field is empty, do not proceed with the submission
    if (formData.username === '' || formData.password === '') {
      return;
    }

    // Check if the provided username and password match any user in the usersList
    console.log("1");

    const fetchedData = await fetch(`http://localhost:3000/api/users?username=${formData.username}&password=${formData.password}`);
    console.log("2: ", fetchedData);
    if (fetchedData.status === 200) {
      const data = await fetchedData.json();  
      setFormData(data);
      localStorage.setItem('user', JSON.stringify(data[0]));
    }
    else {
      console.log("!200");
      alert('Username / password is wrong');
    }
    onClose();
  };

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };


  return (
    <div className='login_form_div'>
      <FaArrowLeft className="close_icon" onClick={onClose}/>
      <h4>Login Form</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input className="input" type="text" name="username" value={formData.username} onChange={handleChange} />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button className="login_btn" type="submit">Submit</button>
        {/* <p className='register_link'>Don't have en account? <a href="#" class="register_link">Register</a></p> */}
        <div className='register_div'>
          <p>Don't Have An Account?</p>
          <a className="register_link" onClick={handleRegisterClick}>Register</a>
        </div>

      </form>
      {showRegisterForm && <RegisterForm onClose={() => setShowRegisterForm(false)} />}

    </div>
  );
};

export default LoginForm;