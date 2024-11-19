import React, { useState } from 'react';
import '../styles/registerForm.css';
import { FaArrowLeft } from 'react-icons/fa';


const RegisterForm = ({ onClose }) => {
  console.log("register Form ------------------")

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/users/post', {
        method: 'POST',
        body: JSON.stringify(formData), // Send the entire form data
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
    <div className='register_form_div'>
      <FaArrowLeft className="close_icon2" onClick={onClose}/>
      <h4>Register Form</h4>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div>
            <label>Name:</label>
            <input className="reginput" type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label>Phone:</label>
            <input className="reginput" type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="inputs">
          <div>
            <label>Email:</label>
            <input className="reginput" type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Street:</label>
            <input className="reginput" type="password" name="street" value={formData.street} onChange={handleChange} />
          </div>
        </div>
        <div className="inputs">
          <div>
            <label>City:</label>
            <input className="reginput" type="text" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div>
            <label>Username:</label>
            <input className="reginput" type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
        </div>
        <div className="inputs">
          <div>
            <label>Password:</label>
            <input className="reginput" type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
        <button className="reg_btn" type="submit">Submit</button>
      </div>
      </form>
    </div>
  );



};

export default RegisterForm;