import React, { useRef ,useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Navbar.scss'; // Import the updated SCSS file
import style from './navbar.module.scss';
import NewfileModal from '../models/newfilemodel/newfilemodel'; // Ensure this component is properly imported
import { useMediaQuery, useTheme } from '@mui/material';
import Components from '../../theme/master-file-material';
import logo from '../../theme/img/Vekaria_logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onCreateNewFile, dashboardData, setOpenFileData, setActiveTab }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [patternName, setPatternName] = useState('');

    // File input change handler to read file data
    const handleBackground = () => {
        setActiveTab('background')
    }
    const handleTurning = () => {
        setActiveTab('turning')
    }
    const handleDesign = () => {
        setActiveTab('design')
    }

    const fileInputRef = useRef(null);

    // Function to trigger the hidden file input click event
    const handleOpenFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically open file dialog
        }
    };

    // Function to handle file selection and read file content
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                try {
                    const jsonData = JSON.parse(text);  // Parse the JSON data
    
                    // Check if 'bangle_width' key exists
                    if (jsonData.hasOwnProperty('bangle_width')) {
                        setOpenFileData(jsonData);  // Set the parsed data if valid
                        console.log('File opened successfully:', jsonData);
                    } else {
                        console.error('Invalid file: Missing "bangle_width" key.');
                        alert('The selected file does not supported.');
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('The selected file does not supported.');
                }
            };
            reader.readAsText(file);  // Read file as text
        }
    };
    
    


    const handleConfirmOpenModal = (e) => {
        e.preventDefault();
        setIsConfirmModalOpen(true);
    };

    const handleConfirmCloseModal = () => {
        setIsConfirmModalOpen(false);
    };

    const handleNewFileOpenModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleNewFileCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleProjectSelectMenuClick = (item) => {
        localStorage.removeItem('projectType');
        navigate('/');
    };

    // const handleSaveToLibrary = () => {
    //     console.log(dashboardData, "check dashboard data");
    //     const keyUpdate = { ...dashboardData, pattern_type: patternName };
    //     try {
    //         let existingData = localStorage.getItem('formData');

    //         if (existingData) {
    //             existingData = JSON.parse(existingData);

    //             if (!Array.isArray(existingData)) {
    //                 console.warn("Data in localStorage is not an array. Resetting to an empty array.");
    //                 existingData = [];
    //             }
    //         } else {
    //             existingData = [];
    //         }

    //         const updatedData = [...existingData, keyUpdate];

    //         localStorage.setItem('formData', JSON.stringify(updatedData));

    //         //console.log("Data saved successfully!");
    //     } catch (error) {
    //         console.error("Error saving data to localStorage:", error);
    //     }
    //     setIsConfirmModalOpen(false);
    //     setPatternName('')
    // };

    // const handleSaveToLibrary = () => {
    //     const check_type = dashboardData?.dull_type
    //     console.log(dashboardData, "check dashboard data");
    //     // Get the dull_type from the form
    //     const dullType = check_type// Assuming "dull_type" is stored in your form
    //     const keyUpdate = { ...dashboardData, pattern_type: patternName };
    //     try {
    //         // Use dull_type as the localStorage key
    //         const storageKey = dullType || "Default"; // Fallback to "Default" if dull_type is not set
    //         let existingData = localStorage.getItem(storageKey);
    
    //         if (existingData) {
    //             existingData = JSON.parse(existingData);
    
    //             if (!Array.isArray(existingData)) {
    //                 console.warn(`Data in localStorage for ${storageKey} is not an array. Resetting to an empty array.`);
    //                 existingData = [];
    //             }
    //         } else {
    //             existingData = [];
    //         }
    
    //         // Update the data and save it back to localStorage
    //         const updatedData = [...existingData, keyUpdate];
    //         localStorage.setItem(storageKey, JSON.stringify(updatedData));
    
    //         console.log(`Data saved successfully under key: ${storageKey}`);
    //     } catch (error) {
    //         console.error("Error saving data to localStorage:", error);
    //     }
    
    //     setIsConfirmModalOpen(false);
    //     setPatternName('');
    // };


    const handleSaveToLibrary = () => {
        const check_type = dashboardData?.dull_type;
        console.log(dashboardData, "check dashboard data");
        
        // Validation
        if (!dashboardData) {
            console.error("No dashboard data to save");
            return;
        }
        
        const dullType = check_type;
        const keyUpdate = { ...dashboardData, pattern_type: patternName };
        
        // Add timestamp to track when the entry was added
        const dataToSave = {
            ...keyUpdate,
            timestamp: new Date().toISOString()
        };
        
        try {
            const storageKey = dullType || "Default";
            let existingData = localStorage.getItem(storageKey);
            let dataArray = [];
            
            if (existingData) {
                try {
                    dataArray = JSON.parse(existingData);
                    
                    if (!Array.isArray(dataArray)) {
                        console.warn(`Data in localStorage for ${storageKey} is not an array. Creating new array.`);
                        dataArray = [];
                    }
                    
                    // Optional: Check for duplicates before adding
                    const isDuplicate = dataArray.some(item => 
                        item.pattern_type === dataToSave.pattern_type
                    );
                    
                    if (isDuplicate) {
                        console.warn("Pattern with this name already exists");
                        // Optional: You can handle duplicate cases here
                        // For example, update existing entry or show warning to user
                    }
                    
                    dataArray.push(dataToSave);
                } catch (parseError) {
                    console.error("Error parsing existing data:", parseError);
                    dataArray = [dataToSave];
                }
            } else {
                dataArray = [dataToSave];
            }
            
            // Check localStorage size limit before saving
            const dataString = JSON.stringify(dataArray);
            if (dataString.length * 2 > 5242880) { // 5MB limit
                console.error("localStorage size limit exceeded");
                // Handle the error appropriately
                return;
            }
            
            localStorage.setItem(storageKey, dataString);
            console.log(`Data saved successfully under key: ${storageKey}`);
            
        } catch (error) {
            console.error("Error saving data to localStorage:", error);
        }
        
        setIsConfirmModalOpen(false);
        setPatternName('');
    };

    const handleSaveFile = () => {
        console.log(dashboardData);
        
        const content = JSON.stringify(dashboardData, null, 2); // Convert the object to a pretty-printed JSON string
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "dashboardData.txt"; // Name of the file
        link.click();

    }

    const navItems = [
        {
            name: 'File',
            permission: true,
            isExpandable: true,
            child: [
                {
                    name: 'New',
                    onClick: handleNewFileOpenModal,
                },
                {
                    name: 'Open',
                    onClick: handleOpenFile,
                },
                {
                    name: 'Save',
                    onClick: handleSaveFile,
                },
                {
                    name: 'Save As',
                },
                {
                    name: 'Add to Pattern Library',
                    onClick: handleConfirmOpenModal,
                },
            ],
        },
        {
            name: 'Edit',
            permission: true,
            isExpandable: true,
            child: [],
        },
        {
            name: 'Operations',
            permission: true,
            isExpandable: true,
            child: [
                {
                    name: 'Background',
                    onClick: handleBackground
                },
                {
                    name: 'Design',
                    onClick: handleDesign
                },
                {
                    name: 'Turning',
                    onClick: handleTurning
                },
            ],
        },
        {
            name: 'Project',
            permission: true,
            isExpandable: true,
            child: [
                {
                    name: 'Select Project',
                    onClick: handleProjectSelectMenuClick,
                },
            ],
        },
        {
            name: 'Clipart Library',
            permission: true,
            isExpandable: true,
            child: [],
        },
        {
            name: 'Tool Path',
            permission: true,
            isExpandable: true,
            child: [
                {
                    name: 'Tool Library',
                },
                {
                    name: 'Generate Code',
                },
            ],
        },
        {
            name: 'Window',
            permission: true,
            isExpandable: true,
            child: [],
        },
        {
            name: 'Help',
            permission: true,
            isExpandable: true,
            child: [],
        },
        {
            name: 'Object Type',
            permission: true,
            isExpandable: true,
            child: [
                {
                    name: 'Flat',
                },
                {
                    name: 'Spherical',
                },
                {
                    name: 'V shape',
                },
                {
                    name: 'Flat Pendent',
                },
                {
                    name: 'Spherical Pendent',
                },
            ],
        },

        {
            name: 'Machine Setup',
            permission: true,
            isExpandable: true,
            child: [
                {
                    name: 'Post Processor',
                },
            ],
        },
    ];

    const [selectedMenu, setSelectedMenu] = useState(navItems[0]);

    const handleMenuClick = (item) => {
        setSelectedMenu(item); // Update the selected menu
    };

    const handleModelSubmit = (dimensions) => {
        onCreateNewFile(dimensions);
        setIsModalOpen(false);
    };

    const theme = useTheme();
    let isMatch = Components.useMediaQuery(theme.breakpoints.down('xl'));
    isMatch = useMediaQuery('(max-width:1200px)');

    return (
        <header>
            <nav style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div className="navbar">
                    <div className="logo-container d-flex align-items-center p-2">
                        <NavLink to={'/dashboard'} className={`${style.company_name} text-primary`}>
                            <img src={logo} alt="Vekaria" className={`${style.imgClass}`} />
                        </NavLink>
                    </div>

                    {!isMatch ? (
                        <div className="nav-links-container">
                            <ul className="d-flex mb-0 p-0 dropdown">
                                {navItems.map((item, index) =>
                                    item.permission && item.isExpandable ? (
                                        <li key={index} className="li-items">
                                            <div className="nav-link dropdown-toggle py-1 px-2">{item.name}</div>
                                            {item.child && (
                                                <ul className="sub-menu">
                                                    {item.child.map((childItem, childIndex) => (
                                                        <li key={childIndex} className="sub-li-items">
                                                            {childItem.onClick ? (
                                                                <div
                                                                    className="nav-link"
                                                                    style={{ fontSize: '14px', cursor: 'pointer', color: '#000' }}
                                                                    onClick={childItem.onClick}
                                                                >
                                                                    {childItem.name}
                                                                </div>
                                                            ) : (
                                                                <NavLink
                                                                    style={{ fontSize: '14px' }}
                                                                    to={childItem.route}
                                                                    // activeClassName="active-link"
                                                                    className="nav-link"
                                                                >
                                                                    <div className="d-flex justify-content-between">
                                                                        {childItem.name}
                                                                        {childItem?.child ? (
                                                                            <Components.Icons.ArrowForwardIosRounded fontSize="5" />
                                                                        ) : null}
                                                                    </div>
                                                                </NavLink>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ) : item.permission && !item.isExpandable ? (
                                        <NavLink
                                            // activeClassName ="active-link"
                                            to={item.route}
                                            className="nav-link py-2 px-3"
                                            key={index}
                                        >
                                            <li className="li-items">{item.name}</li>
                                        </NavLink>
                                    ) : null
                                )}
                            </ul>
                        </div>
                    ) : (
                        <></>
                    )}

                    {isMatch ? (
                        <div className="menu-icon-container">
                            <Components.IconButton onClick={() => setDrawer(!drawer)}>
                                <Components.Icons.MenuOutlined className="fs-2 text-dark" />
                            </Components.IconButton>
                        </div>
                    ) : (
                        <></>
                    )}

                    <Components.Drawer open={drawer} onClose={() => setDrawer(false)}>
                        <ul className="mb-0 p-0 dropdown dropend">
                            {navItems.map((item, index) =>
                                item.permission ? (
                                    <Components.ListItem key={index} disablePadding className="li-items-drawer">
                                        {item.isExpandable ? (
                                            <>
                                                <Components.ListItemButton>
                                                    <NavLink to={item.route} className="nav-link dropdown-toggle">
                                                        {item.name}
                                                    </NavLink>
                                                </Components.ListItemButton>
                                                {item.child && (
                                                    <ul className="sub-menu-drawer p-0">
                                                        {item.child.map((childItem, childIndex) => (
                                                            <Components.ListItem key={childIndex} disablePadding>
                                                                <Components.ListItemButton>
                                                                    <NavLink to={childItem.route}>{childItem.name}</NavLink>
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
            </nav>

            <Components.Dialog open={isConfirmModalOpen} onClose={handleConfirmCloseModal} >
                {/* <Components.DialogTitle>{<b>Confirm</b>}</Components.DialogTitle> */}
                <Components.DialogContent>
                    <div className="modal-content">
                        <h6 style={{ textAlign: 'left' }}>Please enter a pattern name:</h6>

                        <input
                            type="text"
                            value={patternName}
                            onChange={(e) => setPatternName(e.target.value)}
                            placeholder="Enter pattern name"
                            className="pattern-input"
                        />
                    </div>
                </Components.DialogContent>
                <Components.DialogActions>
                    <Components.Button onClick={handleConfirmCloseModal} variant="outlined"
                        sx={{
                            backgroundColor: '#bed2e7',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: '#dae2eb',
                            },
                        }}
                    >
                        Cancel
                    </Components.Button>
                    <Components.Button
                        onClick={() => { handleSaveToLibrary() }}
                        variant="outlined"
                        sx={{
                            backgroundColor: '#bed2e7',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: '#dae2eb',
                            },
                        }}
                    >
                        Ok
                    </Components.Button>
                </Components.DialogActions>
            </Components.Dialog>
            <NewfileModal open={isModalOpen} onClose={handleNewFileCloseModal} onSubmit={handleModelSubmit} />
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </header>

    );
};

export default Navbar;
