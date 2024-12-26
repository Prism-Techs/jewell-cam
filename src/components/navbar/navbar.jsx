import React, { useRef, useState } from 'react';
import './Navbar.scss'; // Import the updated SCSS file
import style from './navbar.module.scss';
import { Link, NavLink, useNavigate } from "react-router-dom";
import NewfileModal from '../models/newfilemodel/newfilemodel'; // Ensure this component is properly imported
import { useMediaQuery, useTheme } from '@mui/material';
import Components from '../../theme/master-file-material';
// import logo from '../../../public/assets/img/vekaria_logo.png';
import { getUserDetails, LoggedOut } from "../../services/authenticate";
import FileCreator from '../common/FileCreator/fileCreate';
import MachineSettingModel from '../models/MachineSettingModel/machine-setting-model';
import { create_patterns,download_stp_file,create_design } from '../../services/dull-services/dull-services';
import DesignModel from '../models/DesignModel/design-model';
import { toast } from 'react-toastify';
import ToolLibraryModel from '../models/ToolLibraryModel/tool-library-model';
const Navbar = ({ onCreateNewFile, dashboardData, setOpenFileData, setActiveTab, DullIdGet, updateDesignData }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isMachineSettingModel, setIsMachineSettingModel] = useState(false)
    const [isDesignModel, setDesignModel] = useState(false)
    const [isSaveAsModel, setisSaveAsModel] = useState(false)
    const [patternName, setPatternName] = useState('');
    const [designname, setDesignName] = useState('');
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isToolDialogOpen, setIsToolDialogOpen] = useState(false);


    const handleMachineSettingModelOpen = (e) => {
        e.preventDefault();
        setIsMachineSettingModel(true);
    };

    const handleMachineSettingModelClose = () => {
        setIsMachineSettingModel(false);
    };

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
    const handleDesignModelOpen = () => {
        setDesignModel(true);
    };

    const handleDesignModelClose = () => {
        setDesignModel(false);
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
    const handleSaveAsOpenModal = (e) => {
        e.preventDefault();
        setisSaveAsModel(true);
    };

    const handleSaveAsCloseModal = () => {
        setisSaveAsModel(false);
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

    //save pattern in library
    const handleSaveToLibrary = () => {
        console.log(dashboardData);

        if (!dashboardData) {
            console.error("No dashboard data to save");
            return;
        }

        const dullid = DullIdGet;
        let pattern_name = patternName;

        pattern_name = pattern_name.replace(/\s+/g, ''); // This removes all spaces

        const formattedDataUrl = `data:image/png,name:${pattern_name}.png;base64,${dashboardData.canvas_img}`;
        const attach = [formattedDataUrl]
        const multipass = dashboardData.multipass
        const tool_dia = dashboardData.tool_dia
        const tool_v_angle = dashboardData.tool_v_angle
        const xmargin = dashboardData.xmargin

        const postData = {
            pattern_name,
            multipass,
            dullid,
            attach,
            tool_dia,
            tool_v_angle,
            xmargin
        };

        create_patterns(postData)
            .then(response => {
                console.log("Pattern saved successfully:", response);
            })
            .catch(error => {
                console.error("Error saving pattern:", error);
            });

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

    const fileCreatorRef = useRef(null);

    const handleCreateFile = () => {
        const currentUrl = new URL(window.location.href);
        const searchParams = new URLSearchParams(currentUrl.search);
        const designId = searchParams.get('design');  // Extract design_id from URL
        download_stp_file(designId)
        .then(response => {
            console.log(response);
            
            const blob = new Blob([response.data], { 
                type: 'application/octet-stream' 
            });
            
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            
            a.download = 'Dull Test 24 Dec.stp';
            
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(url);
            a.remove();
        })
        .catch(error => {
            console.error("Error downloading file:", error);
            if (error.response?.status === 401) {
                alert('Authentication failed. Please login again.');
                // Redirect to login or handle token expiry
            } else if (error.response?.status === 406) {
                alert('File format not supported.');
            } else {
                // alert('Failed to download the file. Please try again.');
                toast.warning("Please Select design For generate STP file", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                })
            }
        });
    };

    const handleSaveAsDesign = () => {

        const formData = dashboardData
        let Design_Name = designname;

        Design_Name = Design_Name.replace(/\s+/g, ''); // This removes all spaces
        const formattedDataUrl = `data:image/png,name:${Design_Name}.png;base64,${formData.canvas_img}`;
        const { design_id, ...restOfDashboardData } = dashboardData;
        const updatedata = {
            ...restOfDashboardData,
            design_name: designname,
            attach: [formattedDataUrl],

        }
        console.log(updatedata);

        create_design(updatedata)
            .then(response => {
                const data = response.data;

                const encryptedKey = data.design_id;

                const currentUrl = new URL(window.location.href);

                const searchParams = new URLSearchParams(currentUrl.search);

                if (searchParams.has('design_id')) {
                    searchParams.delete('design_id');
                }

                // Add the new 'design_id' to the query string
                searchParams.append('design_id', encryptedKey);

                // Update the URL without reloading the page
                const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
                window.history.pushState({ path: newUrl }, '', newUrl);

                toast.success("Design saved successfully", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch(error => {
                console.error("Error saving pattern:", error);
            });
        handleSaveAsCloseModal();
    }

    const openToolDialog = () => setIsToolDialogOpen(true);
    const closeToolDialog = () => setIsToolDialogOpen(false);

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
                    onClick: handleDesignModelOpen,
                },
                {
                    name: 'Save',
                    onClick: handleSaveFile,
                },
                {
                    name: 'Save As',
                    onClick: handleSaveAsOpenModal,

                },
                {
                    name: 'Add to Pattern Library',
                    onClick: handleConfirmOpenModal,
                },
            ],
        },
        // {
        //     name: 'Edit',
        //     permission: true,
        //     isExpandable: true,
        //     child: [],
        // },
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
        // {
        //     name: 'Project',
        //     permission: true,
        //     isExpandable: true,
        //     child: [
        //         {
        //             name: 'Select Project',
        //             onClick: handleProjectSelectMenuClick,
        //         },
        //     ],
        // },
        // {
        //     name: 'Clipart Library',
        //     permission: true,
        //     isExpandable: true,
        //     child: [],
        // },
        {
            name: 'Tool path',
            permission: true,
            isExpandable: true,
            child: [
                {
                    name: 'Tool Library',
                    onClick: openToolDialog
                },
                {
                    name: 'Generate Code',
                },
                {
                    name: 'Generate STP File',
                    onClick: handleCreateFile,
                },
            ],
        },
        // {
        //     name: 'Window',
        //     permission: true,
        //     isExpandable: true,
        //     child: [],
        // },
        // {
        //     name: 'Help',
        //     permission: true,
        //     isExpandable: true,
        //     child: [],
        // },
        {
            name: 'Object type',
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
            name: 'Machine setup',
            permission: true,
            isExpandable: true,
            child: [
                {
                    name: 'Machine Setting',
                    onClick: handleMachineSettingModelOpen
                },
                {
                    name: 'Post Processor',
                },
            ],
        },
    ];

    const handleModelSubmit = (dimensions) => {
        onCreateNewFile(dimensions);
        setIsModalOpen(false);
    };

    const theme = useTheme();
    let isMatch = Components.useMediaQuery(theme.breakpoints.down('xl'));
    isMatch = useMediaQuery('(max-width:1200px)');

    const handleDesignSelect = (designData) => {
        console.log(designData);
        updateDesignData(designData)
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <header>
            <nav>
                <div className="main-nav d-flex justify-content-between">
                    <div className="child-div-logo">
                        <NavLink to={'/dashboard'} className={`${style.company_name} text-primary`}>
                            <img src={'assets/img/vekaria_logo.png'} alt="Vekaria" className={`${style.imgClass}`} />
                        </NavLink>
                 
                    </div>
                    <div className="child-div-1">
                        {navItems.map((item, index) => (
                            <div
                                key={index}
                                className="nav-item"
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="main-item">{item.name}</div>

                                {/* Show child items on hover */}
                                {hoveredIndex === index && item.child && item.child.length > 0 && (
                                    <div className="dropdown-menu">
                                        {item.child.map((child, childIndex) => (
                                            <div
                                                key={childIndex}
                                                className="dropdown-item"
                                                onClick={child.onClick}
                                            >
                                                {child.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                    </div>
                    <div className="child-div-2">

                        
                    <Components.Tooltip title="Logout" arrow>
                            <Link >
                                <Components.IconButton>
                                    <Components.Icons.AccountCircle className=" text-black " />
                                </Components.IconButton>
                            </Link>
                    </Components.Tooltip>
                 
                    <Components.Tooltip title="Logout" arrow>
                            <Link to={"/auth"} replace onClick={() => LoggedOut(navigate)}>
                                <Components.IconButton>
                                    <Components.Icons.Logout className=" text-black " />
                                </Components.IconButton>
                            </Link>
                    </Components.Tooltip>
                    </div>
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
            <Components.Dialog open={isSaveAsModel} onClose={handleSaveAsCloseModal} >
                {/* <Components.DialogTitle>{<b>Confirm</b>}</Components.DialogTitle> */}
                <Components.DialogContent>
                    <div className="modal-content">
                        <h6 style={{ textAlign: 'left' }}>Please enter a Design name:</h6>

                        <input
                            type="text"
                            value={designname}
                            onChange={(e) => setDesignName(e.target.value)}
                            placeholder="Enter Design name"
                            className="pattern-input"
                        />
                    </div>
                </Components.DialogContent>

                <Components.DialogActions>
                    <Components.Button onClick={handleSaveAsCloseModal} variant="outlined"
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
                        onClick={() => { handleSaveAsDesign() }}
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
            <MachineSettingModel open={isMachineSettingModel} onClose={handleMachineSettingModelClose} />
            <FileCreator ref={fileCreatorRef} dashboardData={dashboardData} />
            <DesignModel open={isDesignModel} onClose={handleDesignModelClose} onDesignSelect={handleDesignSelect} />
            <ToolLibraryModel open={isToolDialogOpen} onClose={closeToolDialog} />
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
