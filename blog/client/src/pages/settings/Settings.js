// react imports
import React, { useContext, useState } from 'react';

// components
import Sidebar from '../../components/sidebar/Sidebar';

// utils
import './settings.css';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const PF = 'http://localhost:5000/images/';
  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_START' });

    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(`/users/${user._id}`, updatedUser);
      setSuccess(true);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'UPDATE_FAILURE' });
    }
  };

  return (
    <div className='settings'>
      <div className='settings-wrapper'>
        <div className='settings-title'>
          <span className='settings-update-title'>Update your Account</span>
          <span className='settings-delete-title'>Delete Account</span>
        </div>
        <form className='settings-form' onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className='settings-profile-picture'>
            {file ? (
              <img src={URL.createObjectURL(file)} alt='profile' />
            ) : user.profilePic ? (
              <img src={PF + user.profilePic} alt='profile' />
            ) : (
              <img
                src='https://manager.almadarisp.com/user/img/user.png'
                alt='profile'
              />
            )}

            <label htmlFor='fileInput'>
              <i className='settings-profile-picture-icon fa-regular fa-user'></i>
            </label>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type='text'
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='settings-submit' type='submit'>
            Update
          </button>{' '}
          {success && (
            <span className='settings-success-alert'>
              Profile has been updated
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
