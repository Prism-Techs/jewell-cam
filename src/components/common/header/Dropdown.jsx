import React from 'react'
import MenuItems from './MenuItems';
import './css/header.module.scss';

const Dropdown = ({ submenus, dropdown, depthLevel, isMatch }) => {

    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
    const dropdownClassVert = depthLevel > 1 ? "dropdown-submenu-vert" : "";

    return (
        <>
            {isMatch ?
                <ul className={`dropdown-vert ${dropdownClassVert} ${dropdown ? "show" : ''}`}>
                    {submenus.map((item, index) => (
                        <MenuItems items={item} key={index} depthLevel={depthLevel} isMatch={isMatch}/>
                    ))}
                </ul>
                :
                <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ''}`}>
                    {submenus.map((item, index) => (
                        <MenuItems items={item} key={index} depthLevel={depthLevel} isMatch={isMatch}/>
                    ))}
                </ul>
            }
        </>
    )
}

export default Dropdown