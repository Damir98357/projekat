// react imports
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// utils
import './write.css';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function Write() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post('/posts', newPost);
      navigate('/post/' + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='write'>
      {file ? (
        <img className='write-img' src={URL.createObjectURL(file)} alt='' />
      ) : (
        <img
          className='write-img'
          src='https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
          alt=''
        />
      )}
      <form className='write-form' onSubmit={handleSubmit}>
        <div className='write-form-group'>
          <label htmlFor='fileInput'>
            <i className='write-icon fa-solid fa-plus'></i>
          </label>
          <input
            type='file'
            id='fileInput'
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type='text'
            placeholder='Title'
            className='write-input'
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='write-form-group'>
          <textarea
            placeholder='Post a story'
            type='text'
            className='write-input write-text'
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button type='submit' className='write-submit'>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
