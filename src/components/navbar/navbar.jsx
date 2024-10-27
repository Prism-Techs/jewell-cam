import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Navbar.scss';  // Import the updated SCSS file
// import styles from './navbar_module.scss'
import style from './navbar.module.scss';
import NewfileModal from '../models/newfilemodel/newfilemodel'; // Ensure this component is properly imported
import { useMediaQuery, useTheme } from "@mui/material";
import Components from '../../theme/master-file-material';
import logo from "../../theme/img/Vekaria_logo.png";
// {"conversationId":"d08e1c77-bf7f-4f5c-9341-108552e2289d","source":"instruct"}
const Navbar = ({ onCreateNewFile }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [drawer, setDrawer] = useState(false);

    const handleNewFileOpenModal = (e) => {
        console.log("model loaded");
        
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleNewFileCloseModal = () => {
        setIsModalOpen(false);
    };

    const navItems = [
        {
            name: "File",
            //route: "/",
            permission: true,
            isExpandable: true,
            child: [
                {
                    name: "New",
                    onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },

            ],
        },
        {
            name: "Edit",
            //route: "/edit",
            permission: true,
            isExpandable: false,
            child: []
        },
        {
            name: "Project",
            //route: "/project",
            permission: true,
            isExpandable: false,
            child: []
        },
        {
            name: "Clipart Library",
            //route: "/clipart_library",
            permission: true,
            isExpandable: false,
            child: []
        },
        {
            name: "Tool Path",
            //route: "/toolpath",
            permission: true,
            isExpandable: false,
            child: [
                {
                    name: "Tool Library",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },

            ],
        },
        {
            name: "Window",
            //route: "/window",
            permission: true,
            isExpandable: false,
            child: []
        },
        {
            name: "Help",
            //route: "/help",
            permission: true,
            isExpandable: false,
            child: []
        },
        {
            name: "Object Type",
            //route: "/object_type",
            permission: true,
            isExpandable: false,
            child: [

                {
                    name: "Flat",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },
                {
                    name: "Spherical",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },
                {
                    name: "V shape",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },
                {
                    name: "Flat Pendent",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },
                {
                    name: "Spherical Pendent",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },
            ]
        },
        {
            name: "Operations",
            //route: "/operation",
            permission: true,
            isExpandable: false,
            child: [

                {
                    name: "Background",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },
                {
                    name: "Vertical Design",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },
                {
                    name: "Horizontal Rotary",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },
                {
                    name: "Turning",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                },
            ]
        },
        {
            name: "Machine Setup",
            //route: "/machine_setup",
            permission: true,
            isExpandable: false,
            child: [
                {
                    name: "Post Processor",
                    // onClick: handleNewFileOpenModal,
                    //   //route: "/orders",
                }
            ]
        },
    ];

    const [selectedMenu, setSelectedMenu] = useState(navItems[0]);

    const handleMenuClick = (item) => {
        console.log(item);

        setSelectedMenu(item); // Update the selected menu
    };

    const handleModelSubmit = (dimensions) => {
        // Pass the dimensions to the parent Dashboard component
        onCreateNewFile(dimensions); // Call the function passed from Dashboard
        setIsModalOpen(false); // Close the modal
    };

    const theme = useTheme();

    let isMatch = Components.useMediaQuery(theme.breakpoints.down("xl"));
    isMatch = useMediaQuery(`(max-width:1741px)`);

    return (
        <header>
            <nav style={{borderBottom:"1px solid #a9a8a8"}}> 
                <div className="navbar">
                    <div className='logo-container d-flex align-items-center p-2'>
                        <NavLink to={'/dashboard'} className={`${style.company_name} text-primary`}>
                            <img src={logo} alt='Vekaria' className={`${style.imgClass}`} />
                        </NavLink>
                    </div>
                    {/* {!isMatch ? (
                        <> */}
                            <div className="nav-links-container">
                                <ul className="d-flex mb-0 p-0 dropdown">
                                    {console.log(selectedMenu)}
                                    {navItems.map((item, index) =>
                                        item.permission ? (
                                            <li key={index} className="li-items">
                                                <NavLink
                                                    to={item.route}
                                                    className="nav-link"
                                                    activeclassname="active"
                                                    onClick={() => handleMenuClick(item)}  // Handle click to show submenu
                                                >
                                                    {item.name}
                                                </NavLink>
                                            </li>
                                        ) : null
                                    )}
                                </ul>
                            </div>
                        {/* </>
                    ) : (
                        <></>
                    )} */}
                    {/* burger menu  */}
                    {/* {isMatch ? (
                        <>
                            <div className="menu-icon-container">
                                <Components.IconButton onClick={() => setDrawer(!drawer)}>
                                    <Components.Icons.MenuOutlined className="fs-2 text-dark" />
                                </Components.IconButton>
                            </div>
                        </>
                    ) : (
                        <></>
                    )} */}
                    {/* drawer opens when click on menu icon */}
                    {/* <Components.Drawer open={drawer} onClose={() => setDrawer(false)}>
                        <ul className="mb-0 p-0 dropdown dropend">
                            {navItems.map((item, index) =>
                                item.permission ? (
                                    <Components.ListItem
                                        key={index}
                                        disablePadding
                                        className="li-items-drawer"
                                    >
                                        {item.isExpandable ? (
                                            <>
                                                <Components.ListItemButton>
                                                    <NavLink
                                                        to={item.route}
                                                        className="nav-link dropdown-toggle"
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                </Components.ListItemButton>
                                                {item.child && (
                                                    <ul className="sub-menu-drawer p-0">
                                                        {item.child.map((childItem, childIndex) => (
                                                            <Components.ListItem
                                                                key={childIndex}
                                                                disablePadding
                                                            >
                                                                <Components.ListItemButton>
                                                                    <NavLink to={childItem.route}>
                                                                        {childItem.name}
                                                                    </NavLink>
                                                                </Components.ListItemButton>
                                                            </Components.ListItem>
                                                        ))}
                                                    </ul>
                                                )}
                                            </>
                                        ) : (
                                            <Components.ListItemButton>
                                                <NavLink to={item.route} className="nav-link">
                                                    {item.name}
                                                </NavLink>
                                            </Components.ListItemButton>
                                        )}
                                    </Components.ListItem>
                                ) : null
                            )}
                        </ul>
                    </Components.Drawer> */}
                </div>
                {/* <hr /> */}
            </nav>
            <NewfileModal open={isModalOpen} onClose={handleNewFileCloseModal} onSubmit={handleModelSubmit} />
            <nav>
                {selectedMenu && selectedMenu.child && ( // Display sub-menu based on the selected item
                    <div className="navbar2" style={{borderBottom:"1px solid #a9a8a8", minHeight:"45px"}}>
                        <ul className="d-flex sub-nav mb-0 p-0">
                        {selectedMenu.child.map((childItem, index) => (
                                <li key={index} className="sub-li-items text-center">
                                    {childItem.onClick ? (
                                        <button
                                            onClick={childItem.onClick} // Trigger the modal on click
                                            className="nav-link d-flex flex-column align-items-center"
                                        >
                                            {childItem.icon && (
                                                <span className="menu-icon mb-1">
                                                    <childItem.icon fontSize="small" />
                                                </span>
                                            )}
                                            {childItem.name}
                                        </button>
                                    ) : (
                                        <NavLink
                                            to={childItem.route}
                                            className="nav-link d-flex flex-column align-items-center"
                                            activeclassname="active"
                                        >
                                            {childItem.icon && (
                                                <span className="menu-icon mb-1">
                                                    <childItem.icon fontSize="small" />
                                                </span>
                                            )}
                                            {childItem.name}
                                        </NavLink>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* <hr /> */}
            </nav>
        </header>
    );
};

export default Navbar;
