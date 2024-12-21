import React, { useRef ,useState } from 'react';
import './Navbar.scss'; // Import the updated SCSS file
import style from './navbar.module.scss';
import { Link, NavLink, useNavigate } from "react-router-dom";
import NewfileModal from '../models/newfilemodel/newfilemodel'; // Ensure this component is properly imported
import { useMediaQuery, useTheme } from '@mui/material';
import Components from '../../theme/master-file-material';
// import logo from '../../../public/assets/img/vekaria_logo.png';
import { getUserDetails, LoggedOut} from "../../services/authenticate";
import FileCreator from '../common/FileCreator/fileCreate';
import MachineSettingModel from '../models/MachineSettingModel/machine-setting-model';
import { create_patterns} from '../../services/dull-services/dull-services';
import DesignModel from '../models/DesignModel/design-model';
import { create_design } from '../../services/dull-services/dull-services';
import { toast } from 'react-toastify';
const Navbar = ({ onCreateNewFile, dashboardData, setOpenFileData, setActiveTab,DullIdGet , updateDesignData}) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isMachineSettingModel, setIsMachineSettingModel] = useState(false)
    const [isDesignModel, setDesignModel] = useState(false)
    const [isSaveAsModel, setisSaveAsModel] = useState(false)
    const [patternName, setPatternName] = useState('');
    const [designname, setDesignName] = useState('');

    const handleMachineSettingModelOpen= (e) => {
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
        const attach= [formattedDataUrl]
        const multipass= dashboardData.multipass
        const tool_dia= dashboardData.tool_dia
        const tool_v_angle= dashboardData.tool_v_angle
        const xmargin= dashboardData.xmargin

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
      if (fileCreatorRef.current) {
        fileCreatorRef.current.createFile();
      }
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
            attach:[formattedDataUrl],
            
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
                    name: 'Machine Setting',
                    onClick:handleMachineSettingModelOpen
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

    return (
        <header>
            <nav >
                <div className="navbar">
                    <div className="logo-container d-flex align-items-center" style={{margin:"0px 0px 25px 0px"}}>
                        <NavLink to={'/dashboard'} className={`${style.company_name} text-primary`}>
                            <img src={'assets/img/vekaria_logo.png'} alt="Vekaria" className={`${style.imgClass}`} />
                        </NavLink>
                    </div>

                    {!isMatch ? (
                        <div className="nav-links-container">
                            <ul className="d-flex p-0 dropdown">
                                {navItems.map((item, index) =>
                                    item.permission && item.isExpandable ? (
                                        <li key={index} className="li-items">
                                            <div className="nav-link py-1 px-2">{item.name}</div>
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
                    <div className="d-flex justify-content-center">

                    <Components.Tooltip title="Logout" arrow>
                            <Link >
                                <Components.IconButton sx={{margin:"0px 0px 15px 0px"}}>
                                    <Components.Icons.AccountCircle className=" text-black " />
                                </Components.IconButton>
                            </Link>
                    </Components.Tooltip>
                 
                    <Components.Tooltip title="Logout" arrow>
                            <Link to={"/auth"} replace onClick={() => LoggedOut(navigate)}>
                                <Components.IconButton sx={{margin:"0px 0px 15px 0px"}}>
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
            <DesignModel open={isDesignModel} onClose={handleDesignModelClose} onDesignSelect={handleDesignSelect}/>
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
