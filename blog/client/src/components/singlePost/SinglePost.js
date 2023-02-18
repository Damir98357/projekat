// react imports
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// utils
import './singlePost.css';
import axios from 'axios';
import { Context } from '../../context/Context';

export default function SinglePost() {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const PF = 'http://localhost:5000/images/';

  const fetchPost = async () => {
    const res = await axios.get('/posts/' + postId);
    setPost(res.data);
    setTitle(res.data.title);
    setDesc(res.data.desc);
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`, {
        data: {
          username: user.username,
        },
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${postId}`, {
        username: user.username,
        title,
        desc,
      });
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='single-post'>
      <div className='single-post-wrapper'>
        {post.photo ? (
          <img className='single-post-img' src={PF + post.photo} alt='post' />
        ) : (
          <img
            className='single-post-img'
            src='https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt='default'
          />
        )}
        {updateMode ? (
          <input
            type='text'
            value={title}
            className='single-post-title-input'
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className='single-post-title'>
            {post.title}
            {post.username === user?.username && (
              <div className='single-post-edit'>
                <i
                  className='single-post-icon fa-regular fa-pen-to-square'
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className='single-post-icon fa-solid fa-trash'
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className='single-post-info'>
          <span className='single-post-author'>
            Author:{' '}
            <Link to={`/?user=${post.username}`} className='link'>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className='single-post-date'>
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <>
            <textarea
              className='single-post-desc-input'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <button className='single-post-button' onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <p className='single-post-desc'>{post.desc}</p>
        )}
      </div>
    </div>
  );
}
