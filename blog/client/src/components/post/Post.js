// react imports
import React from 'react';
import { Link } from 'react-router-dom';

// utils
import './post.css';

export default function Post({ post }) {
  const PF = 'http://localhost:5000/images/';

  return (
    <div className='post'>
      {post.photo ? (
        <img className='post-img' src={PF + post.photo} alt='post' />
      ) : (
        <img
          className='post-img'
          src='https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
          alt='default'
        />
      )}

      <div className='post-info'>
        <div className='post-categories'>
          {post.categories.map((category) => {
            return (
              <span key={category.name} className='post-cat'>
                {category.name}
              </span>
            );
          })}
        </div>
        <Link to={`/post/${post._id}`} className='link'>
          <span className='post-title'>{post.title}</span>
        </Link>
        <hr />
        <span className='post-date'>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className='post-description'>{post.desc}</p>
    </div>
  );
}
