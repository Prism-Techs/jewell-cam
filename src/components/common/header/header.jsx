import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Navbar.scss';  // Import the updated SCSS file
// import styles from './navbar_module.scss'
import style from './navbar.module.scss';
import NewfileModal from '../models/newfilemodel/newfilemodel'; // Ensure this component is properly imported
import { useMediaQuery, useTheme } from "@mui/material";
import Components from '../../theme/master-file-material';
import logo from "../../theme/img/Vekaria_logo.png"

const Navbar = ({ onCreateNewFile }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);    
    const [drawer, setDrawer] = useState(false);

    const [selectedMenu, setSelectedMenu] = useState(null);

    const handleMenuClick = (item) => {
        setSelectedMenu(item); // Update the selected menu
    };

    const handleNewFileOpenModal = (e) => {
 
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleNewFileCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleModelSubmit = (dimensions) => {
        // Pass the dimensions to the parent Dashboard component
        onCreateNewFile(dimensions); // Call the function passed from Dashboard
        setIsModalOpen(false); // Close the modal
    };

    const theme = useTheme();

    let isMatch = Components.useMediaQuery(theme.breakpoints.down("xl"));
    isMatch = useMediaQuery(`(max-width:1741px)`);

    const navItems = [
        {
            name: "File",
            route: "/",
            permission: true,
            isExpandable: true,
            child: [
                {
                    name: "New",
                    onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },

            ],
        },
        {
            name: "Edit",
            route: "/edit",
            permission: true,
            isExpandable: false,
            child: []
        },
        {
            name: "Project",
            route: "/project",
            permission: true,
            isExpandable: false,
            child: []
        },
        {
            name: "Clipart Library",
            route: "/clipart_library",
            permission: true,
            isExpandable: false,
            child: []
        },
        {
            name: "Tool Path",
            route: "/toolpath",
            permission: true,
            isExpandable: false,
            child: [
                {
                    name: "Tool Library",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },

            ],
        },
        {
            name: "Window",
            route: "/window",
            permission: true,
            isExpandable: false,
            child: []
        },
        {
            name: "Help",
            route: "/help",
            permission: true,
            isExpandable: false,
            child: []
        },
        {
            name: "Object Type",
            route: "/object_type",
            permission: true,
            isExpandable: false,
            child: [

                {
                    name: "Flat",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },
                {
                    name: "Spherical",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },
                {
                    name: "V shape",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },
                {
                    name: "Flat Pendent",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },
                {
                    name: "Spherical Pendent",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },
            ]
        },
        {
            name: "Operations",
            route: "/operation",
            permission: true,
            isExpandable: false,
            child: [

                {
                    name: "Background",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },
                {
                    name: "Vertical Design",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },
                {
                    name: "Horizontal Rotary",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },
                {
                    name: "Turning",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                },
            ]
        },
        {
            name: "Machine Setup",
            route: "/machine_setup",
            permission: true,
            isExpandable: false,
            child: [
                {
                    name: "Post Processor",
                    // onClick: handleNewFileOpenModal,
                    //   route: "/orders",
                }
            ]
        },
    ];

    return (
        <header>
            <nav>
                <div className="navbar">
                <div className='logo-container d-flex align-items-center p-2'>
                                <NavLink to={'/dashboard'} className={`${style.company_name} text-primary`}>
                                    <img src={logo} alt='Vekaria' className={`${style.imgClass}`} />
                                </NavLink>
                            </div>
                    {!isMatch ? (
                        <>
                           <div className="nav-links-container">
                        <ul className="d-flex mb-0 p-0 dropdown">
                            {navItems.map((item, index) =>
                                item.permission ? (
                                    <li key={index} className="li-items">
                                        <NavLink
                                            to={item.route}
                                            className="nav-link"
                                            activeClassName="active"
                                        >
                                            {item.name}
                                        </NavLink>
                                        {item.child && (
                                            <ul className="sub-menu p-0">
                                                {item.child.map((childItem, childIndex) => (
                                                    <NavLink
                                                        key={childIndex} // Key needs to be inside NavLink
                                                        style={{ fontSize: "14px" }}
                                                        to={childItem.route}
                                                        activeClassName="active"
                                                        onClick={childItem.name === "New" ? handleNewFileOpenModal : null}
                                                    >
                                                        <li className="sub-li-items">
                                                            <div className="d-flex justify-content-between">
                                                                {childItem.name}
                                                                {childItem?.child ? (
                                                                    <Components.Icons.ArrowForwardIosRounded fontSize="5" />
                                                                ) : null}
                                                            </div>
                                                        </li>
                                                    </NavLink>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ) : null
                            )}
                        </ul>
                    </div>
                        </>
                    ) : (
                        <></>
                    )}
                    {/* burger menu  */}
                    {isMatch ? (
                        <>
                            <div className="menu-icon-container">
                                <Components.IconButton onClick={() => setDrawer(!drawer)}>
                                    <Components.Icons.MenuOutlined className="fs-2 text-dark" />
                                </Components.IconButton>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    {/* drawer opens when click on menu icon */}
                    <Components.Drawer open={drawer} onClose={() => setDrawer(false)}>
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
                    </Components.Drawer>
                </div>
                <hr />
            </nav>
            <NewfileModal open={isModalOpen} onClose={handleNewFileCloseModal} onSubmit={handleModelSubmit}  />
            <nav>
              here is the sub nav data which is based on main nav data 
            </nav>
        </header>
    );
};

export default Navbar;

import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import Components from '../../theme/master-file-material';
import "./dashboard.scss"
import CenterModel from '../../components/models/CenterModel/centermodel';
const Dashboard = () => {
    const canvasRef = useRef(null);
    const [tabs, setTabs] = useState(() => {
        // Load tabs from localStorage initially (if they exist)
        const savedTabs = JSON.parse(localStorage.getItem('tabs')) || [];
        return savedTabs;
    });
    const [activeTab, setActiveTab] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // Update localStorage whenever tabs change
    useEffect(() => {
        if (tabs.length > 0) {

            localStorage.setItem('tabs', JSON.stringify(tabs));
        }
    }, [tabs]);

    const handleModelSubmit = (data) => {
        // Create a new tab with the submitted data
        setTabs((prevTabs) => {
            const updatedTabs = [...prevTabs, data];
            setActiveTab(updatedTabs.length - 1);
            return updatedTabs;
        });
    };

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     if (canvas && tabs.length > 0) {
    //         const ctx = canvas.getContext('2d');
    //         const { width, height, diameter, material_thickness } = tabs[activeTab];

    //         // Clear the canvas before redrawing
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);

    //         // Set line thickness
    //         const thickness = material_thickness || 2;
    //         ctx.lineWidth = thickness;

    //         // Draw circle if diameter is provided
    //         if (diameter) {
    //             const radius = diameter / 2;
    //             ctx.beginPath();
    //             ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    //             ctx.stroke();
    //         }

    //         // Draw rectangle if width and height are provided
    //         if (width && height) {
    //             ctx.beginPath();
    //             ctx.rect((canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    //             ctx.stroke();
    //         }
    //     }
    // }, [tabs, activeTab]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && tabs.length > 0) {
            const ctx = canvas.getContext('2d');
            const { width, height, diameter, material_thickness } = tabs[activeTab];

            // Clear the canvas before redrawing
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set line thickness
            const thickness = material_thickness || 2;
            ctx.lineWidth = thickness;

            // ** Only calculate diameter but don't draw it **
            if (diameter) {
                const radius = diameter / 2;
                // You can still use the radius or diameter for other logic, but don't draw the circle
                console.log(`Diameter is ${diameter}, Radius is ${radius}`);
            }

            // Draw rectangle if width and height are provided
            if (width && height) {
                ctx.beginPath();
                ctx.rect((canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
                ctx.stroke();
            }
        }
    }, [tabs, activeTab]);

    const toggleDiv = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <>
            <Navbar onCreateNewFile={handleModelSubmit} />
            <div className="dashboard">
                {/* <Components.Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    marginBottom: '20px',
                    overflow: 'hidden'
                }}
            >
                {tabs.map((tab, index) => (
                    <Components.Tab key={index} label={`File
                         ${index + 1}`} />
                ))}
            </Components.Tabs>
            <div className="details-div">
                <div className="row">
                    <div className="col design">
                    </div>
                    <div className="col background">
                    </div>
                    <div className="col model-viewer">
                        {tabs.length > 0 && (
                            <div className='m-4'>

                                <canvas
                                    ref={canvasRef}
                                    width={tabs[activeTab]?.width || 300}  // Default width
                                    height={tabs[activeTab]?.height || 150}  // Default height
                                />
                            </div>
                        )}
                    </div>
                    <div className="col dull-parameter">
                    </div>
                </div>
            </div> */}
                <div className="arrow-toggle">
                    <button onClick={toggleDiv} className="arrow-button">
                        {isOpen ? <Components.Icons.ArrowBack /> : <Components.Icons.ArrowForward />}
                    </button>
                    {isOpen && (
                        <div className="side-div">
                            <p>This is the content that appears beside the arrow.</p>
                        </div>
                    )}
                </div>
            </div>

        </>

    );
};

export default Dashboard;
