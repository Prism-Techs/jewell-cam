import React, { useEffect, useRef, useState } from 'react'
import Dropdown from './Dropdown';
import './css/header.module.scss';
import { NavLink } from 'react-router-dom';
import style from './css/header.module.scss';
import Components from '../../../theme/master-file-material';
import { useDrawer } from '../../../services/drawerContext';

const MenuItems = ({ items, depthLevel, isMatch }) => {

  const { drawer, setDrawer } = useDrawer();
  
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const handleMouseEnter = () => {
     setDropdown(true);
  };

  const handleMouseLeave = () => {
     setDropdown(false);
  };

  const handleCloseDrawer = () => {
    setDrawer(false);
  }

  return (
    <>
      {!isMatch ?
        (

          <li className='menu-items' ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {items.child ? (
              <>
                <button type='button' aria-haspopup="menu" aria-expanded={dropdown ? "true" : 'false'} onClick={handleCloseDrawer}>
                  {depthLevel <= 0 ?
                    <NavLink to={items.route} className={({ isActive }) => (isActive && depthLevel <= 0 ? `${style.active} ${style.nav_link} ` : ``)} >

                      {items.name} {' '}
                    </NavLink>
                    :
                    <NavLink to={items.route} style={{ marginTop: '7px' }}>

                      {items.name} {' '}
                      {depthLevel > 0 ? <span>&raquo;</span> : <span className='arrow'></span>}
                    </NavLink>
                  }

                </button>
                <Dropdown submenus={items.child} dropdown={dropdown} depthLevel={depthLevel} isMatch={isMatch}/>
              </>
            ) : (
              depthLevel <= 0 ? (

                <NavLink to={items.route} className={({ isActive }) => (isActive ? `${style.active} ${style.nav_link}` : ` `)}  >
                  {items.name}
                </NavLink>
              ) : (
                <NavLink to={items.route} style={{ marginTop: '7px' }}  >
                  {items.name}
                </NavLink>
              )
            )}
          </li>

        )
        :
        (

          <Components.ListItem className='menu-items-vert' ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {items.child ? (
              <>
                <button type='button' aria-haspopup="menu" aria-expanded={dropdown ? "true" : 'false'} onClick={handleCloseDrawer}>
                  {depthLevel <= 0 ?
                    <NavLink to={items.route} className={({ isActive }) => (isActive && depthLevel <= 0 ? `${style.active} ${style.nav_link} ` : ``)} >

                      {items.name} {' '}
                    </NavLink>
                    :
                    <NavLink to={items.route} >

                      {items.name} {' '}
                      {depthLevel > 0 ? <span>&raquo;</span> : <span className='arrow'></span>}
                    </NavLink>
                  }

                </button>
                <Dropdown submenus={items.child} dropdown={dropdown} depthLevel={depthLevel} isMatch={isMatch}/>
              </>
            ) : (
              depthLevel <= 0 ? (

                <NavLink to={items.route} className={({ isActive }) => (isActive ? `${style.active} ${style.nav_link}` : ` `)}  onClick={handleCloseDrawer}>
                  {items.name}
                </NavLink>
              ) : (
                <NavLink to={items.route}  onClick={handleCloseDrawer} >
                  {items.name}
                </NavLink>
              )
            )}
          </Components.ListItem>
        )
      }
    </>

  )
}

export default MenuItems