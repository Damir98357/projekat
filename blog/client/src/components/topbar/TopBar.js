// react imports
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// utils
import './topbar.css';
import { Context } from '../../context/Context';

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = 'http://localhost:5000/images/';

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <div className='top'>
      <div className='top-left'>
        <i className='top-icon fa-brands fa-square-facebook'></i>
        <i className='top-icon fa-brands fa-square-twitter'></i>
        <i className='top-icon fa-brands fa-square-instagram'></i>
        <i className='top-icon fa-brands fa-linkedin'></i>
      </div>
      <div className='top-center'>
        <ul className='top-list'>
          <li className='top-list-item'>
            <Link to='/' className='link'>
              HOME
            </Link>
          </li>
          <li className='top-list-item'>
            <Link to='/' className='link'>
              ABOUT
            </Link>
          </li>
          <li className='top-list-item'>
            <Link to='/' className='link'>
              CONTACT
            </Link>
          </li>
          <li className='top-list-item'>
            <Link to='/write' className='link'>
              WRITE
            </Link>
          </li>
          <li className='top-list-item' onClick={handleLogout}>
            {user && 'LOGOUT'}
          </li>
        </ul>
      </div>
      <div className='top-right'>
        {user ? (
          user.profilePic ? (
            <Link to='/settings'>
              <img
                src={PF + user.profilePic}
                alt='user'
                className='top-image'
              />
            </Link>
          ) : (
            <Link to='/settings'>
              <img
                src='https://manager.almadarisp.com/user/img/user.png'
                alt='user'
                className='top-image'
              />
            </Link>
          )
        ) : (
          <ul className='top-list'>
            <li className='top-list-item'>
              <Link className='link' to='/login'>
                LOGIN
              </Link>
            </li>
            <li className='top-list-item'>
              <Link className='link' to='/register'>
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i className='top-search-icon fa-solid fa-magnifying-glass'></i>
      </div>
    </div>
  );
}
