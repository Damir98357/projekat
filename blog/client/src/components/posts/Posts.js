import React from 'react';

// components
import Post from '../post/Post';

// utils
import './posts.css';

export default function Posts({ posts }) {
  return (
    <div className='posts'>
      {posts.length !== 0 ? (
        posts.map((post) => {
          return <Post key={post.title} post={post} />;
        })
      ) : (
        <div className='no-posts'>
          <h1>No posts for this search</h1>
        </div>
      )}
    </div>
  );
}
