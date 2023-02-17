import React from 'react';

// utils
import './header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className='header-titles'>
        <span className='header-title-sm'>ITEH</span>
        <span className='header-title-lg'>BLOG</span>
      </div>
      <img
        className='header-img'
        src='https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        alt='flower'
      />
    </div>
  );
}
