import React, { useEffect, useState } from 'react'
import style from './css/header.module.scss';

import menuItemsData from './data/menuItemsData';
import MenuItems from './MenuItems';
import './css/header.module.scss';
import { NavLink } from 'react-router-dom';
import { useDrawer } from '../../../services/drawerContext';

const Navbar = ({ isMatch }) => {

  const { drawer, setDrawer } = useDrawer();

  const data = menuItemsData();

  const depthLevel = 0;

  const handleCloseDrawer = () => {
    setDrawer(false);
  }

  return (
    <>
      {!isMatch ?
        (

          <nav className='main-nav mt-2'>
            <ul className='menus mt-2'>
              {data.map((item, index) => (

                item.permission && item.isExpandable ? (
                  <MenuItems items={item} key={index} depthLevel={depthLevel} isMatch={isMatch} />
                ) : item.permission && !item.isExpandable ? (
                  <li className='menu-items' key={item.name} onClick={handleCloseDrawer}>
                    <NavLink to={item.route} className={({ isActive }) => (isActive ? `${style.active} ${style.nav_link}` : `${style.nav_link} `)}  >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              ))}
            </ul>
          </nav>

        )
        :
        (

          <nav className='main-nav-vert '>
            <ul className='menus-vert '>
              {data.map((item, index) => (

                item.permission && item.isExpandable ? (
                  <MenuItems items={item} key={index} depthLevel={depthLevel} isMatch={isMatch}/>
                ) : item.permission && !item.isExpandable ? (
                  <li className='menu-items-vert' key={item.name} onClick={handleCloseDrawer}>
                    <NavLink to={item.route} className={({ isActive }) => (isActive ? `${style.active} ${style.nav_link}` : `${style.nav_link} `)}  >
                      {item.name}
                    </NavLink>
                  </li>
                ) : null
              ))}
            </ul>
          </nav>
        )

      }
    </>
  )
}

export default Navbar