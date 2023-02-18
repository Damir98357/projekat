// react imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// utils
import './sidebar.css';
import sidebarImg from '../../assets/images/sidebar.jpg';
import axios from 'axios';

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  const fetchCats = async () => {
    const res = await axios.get('/categories');
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebar-item'>
        <span className='sidebar-title'>ABOUT</span>
        <img src={sidebarImg} alt='' />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className='sidebar-item'>
        <span className='sidebar-title'>CATEGORIES</span>
        <ul className='sidebar-list'>
          {categories.map((category) => {
            return (
              <Link
                to={`/?cat=${category.name}`}
                key={category.name}
                className='link'
              >
                <li className='sidebar-list-item'>{category.name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className='sidebar-item'>
        <span className='sidebar-title'>FOLLOW US</span>
        <div className='sidebar-social'>
          <i className='sidebar-icon fa-brands fa-square-facebook'></i>
          <i className='sidebar-icon fa-brands fa-square-twitter'></i>
          <i className='sidebar-icon fa-brands fa-square-instagram'></i>
          <i className='sidebar-icon fa-brands fa-linkedin'></i>
        </div>
      </div>
    </div>
  );
}
