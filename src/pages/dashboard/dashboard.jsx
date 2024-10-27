    import React, { useRef, useState, useEffect } from 'react';
    import Navbar from '../../components/navbar/navbar';
    import Components from '../../theme/master-file-material';
    import "./dashboard.scss"
    import { useForm } from "react-hook-form";
    import theme from "../../theme/theme";
    import BangleDullUI from '../../components/common/bangle_dull/bangledull';
    import ArcCanvas from '../../components/common/arcdesign/arcdesign';
    const Dashboard = () => {
        const canvasRef = useRef(null);
        const [showMainUI, setShowMainUI] = useState(false);
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

        const toggleDiv = () => {
            setIsOpen((prev) => !prev);
        };

        const { register, handleSubmit } = useForm();
        const [columns, setColumns] = useState([{ id: 1 }]);

        const addColumn = () => {
            const newColumn = { id: columns.length + 1 };
            setColumns([...columns, newColumn]);
        };
        // Function to delete a column based on its ID
        const deleteColumn = (id) => {
            setColumns((prevColumns) => prevColumns.filter(column => column.id !== id));
        };

        useEffect(() => {
            if (tabs.length > 0) {
                const { width, height } = tabs[activeTab];
            
            }
        }, [tabs, activeTab]);

        const bangleDimensions = tabs[activeTab] ? {
            width: tabs[activeTab].width || 0,
            height: tabs[activeTab].height || 0
        } : { width: 0, height: 0 };

        const handleTabChange = (index) => {
            setActiveTab(index);
          
        };
        const [params, setParams] = useState({
            bangleWidth: 20,
            bangle2width:30,
            xPitch: 1.3,
            xMargin: 2,
            yPitch: 5,
            yMargin: 2,
            noOfCuts: 80,
            longCutAngle: 37.582,
            depthOfCut: 0.1,
            horizontalSpindleSpeed: 9000,
            zCutSpeed: 200,
            toolGap: 0.5,
            bangleRotation: 'CW',
            horizontalRotation: 'CW',
            dullStartDirection: 'R->L',
            toolDiameter: 16,
            toolVAngle: 120,
            angleOfCutLines: 0,
            toolNumber: 21,
            diameter: 63.67
          });
    
        // Handle dynamic input changes
        const handleInputChange = (event) => {
            
            const { name, value } = event.target;
            setParams((prevParams) => ({
            ...prevParams,
            [name]: value,  // Dynamically update the corresponding parameter
            }));

        };

        const onSubmit = (data) => {
            console.log("Submitted data:", data);
        };

        return (
            <>
                <Navbar onCreateNewFile={handleModelSubmit} />
                <div className="container-fluid" style={{ paddingLeft: "0px" }}>
                    <div className="d-flex" style={{ minHeight: "85vh" }}>
                        <div className="col" style={{ backgroundColor: "#F5F6F7", maxWidth: "50px" }}>
                            <div className="arrow-toggle">
                                <button onClick={toggleDiv} className="arrow-button">
                                    {isOpen ? <Components.Icons.ArrowBack /> : <Components.Icons.ArrowForward />}
                                </button>
                            </div>
                        </div>
                        {isOpen && (
                            <div className="col" style={{ maxWidth: "50px" }}>

                            </div>
                        )}
                        <div className={`col ${isOpen ? '' : 'flex-grow-1'}`} style={{ backgroundColor: "#E8E8E8" }}>
                            <Components.Tabs value={activeTab} onChange={(e, newValue) => handleTabChange(newValue)}
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: '4px',
                                    marginBottom: '5px',
                                    overflow: 'hidden'
                                }}
                            >
                                {tabs.map((tab, index) => (
                                    <Components.Tab key={index} label={`Page
                                ${index + 1}`} />
                                ))}

                            </Components.Tabs >
                            <div className="d-flex justify-content-between" style={{ height: "78vh" }}>
                                {/* box One  */}
                                <div className="p-2 box1" style={{ backgroundColor: "#ffffff", width: "20%", marginRight: "10px" }}>
                                    <div className='parameters-div'>
                                        <h6 >Background Library</h6 >
                                    </div>
                                </div>
                                {/* box Two  */}
                                <div className="p-2 box2" style={{ backgroundColor: "#ffffff", width: "50%", overflowY: "auto", marginRight: "10px", position: "relative" }}>
                                    <div style={{ height: "100%", display: 'flex', alignItems: "center", justifyContent: "center" }} > {/* Example height for content */}
                                    
                                        {tabs.length > 0 && (
                                            // <BangleDullUI
                                            //     bangleWidth={bangleDimensions.width}
                                            //     bangleHeight={bangleDimensions.height}
                                            //     params={params}
                                            //     showMainUI={showMainUI} 
                                            //     setShowMainUI={setShowMainUI} 
                                            // />
                                            <ArcCanvas/>  
                                            // <Preview/>
                                        )}
                                    </div>
                                </div>

                                {/* box three  */}
                                <div className="p-2 box3" style={{ backgroundColor: "#ffffff", width: "40%", display: "flex", flexDirection: "column", marginRight: "10px", justifyContent: "flex-start", overflowY: "auto", }}>
                                    <form onSubmit={handleSubmit(onSubmit)} style={{ fontSize: "14px", flexGrow: 1 }}>
                                        <div style={{ height: "200px" }}>

                                            <Components.Accordion defaultExpanded>
                                                <Components.AccordionSummary
                                                    expandIcon={<Components.Icons.ExpandMore />}
                                                    aria-controls="basic-parameters-content"
                                                    id="basic-parameters-header"
                                                    sx={{
                                                        background: "#F5F6F7",
                                                        borderBottom: "1px solid rgb(169, 168, 168)",
                                                        minHeight: '25px !important',  // Apply min-height globally
                                                        maxHeight: '25px !important',  // Apply max-height globally
                                                        '&.Mui-expanded': {
                                                            minHeight: '25px !important',  // Apply min-height when expanded
                                                            maxHeight: '25px !important',  // Apply max-height when expanded

                                                        },
                                                    }}
                                                >
                                                    <Components.Typography variant="body1" > {/* Use body1 or smaller font variant */}
                                                        Basic Parameters
                                                    </Components.Typography>
                                                </Components.AccordionSummary>
                                                <Components.AccordionDetails>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className='parameters-div'>
                                                                <label>Bangle Width :</label>
                                                                <input {...register("bangleWidth")} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/>
                                                            </div>

                                                            <div className='parameters-div'>
                                                                <label>Tool dia :</label>
                                                                <input {...register("tool_dia")} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/>
                                                            </div>
                                                            <div className='parameters-div'>
                                                                <label>Tool V Angle :</label>
                                                                <input {...register("tool_v_angle")} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/>
                                                            </div>
                                                            <div className='parameters-div'>
                                                                <label>Tool Number :</label>
                                                                <input {...register("tool_number")} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/>
                                                            </div>
                                                        </div>

                                                        <div className="col">
                                                            <div className='parameters-div'>
                                                                <label>Bangle (Y) Rotation Direction :</label>
                                                                <input {...register("rotation_direction")} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/>
                                                            </div>
                                                            <div className='parameters-div'>
                                                                <label>Dull Start Direction, X direction:</label>
                                                                <input {...register("dull_start_direction")} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Components.AccordionDetails>
                                            </Components.Accordion>

                                            {/* Multipass Parameters  */}
                                            <div className="row m-2">
                                                <div className="d-flex align-items-center" style={{ backgroundColor: "#F5F6F7" }}>
                                                    <h6 className="mb-0">Multipass</h6>
                                                    <button
                                                        type="button"
                                                        style={{
                                                            marginRight: '10px',
                                                            borderRadius: '50%',
                                                            paddingBlock: '7px',
                                                            border: '1px solid transparent',
                                                            backgroundColor: 'transparent',
                                                        }}
                                                        onClick={addColumn}
                                                    >
                                                        <Components.Icons.Add fontSize="small" />
                                                    </button>
                                                </div>

                                                <div className="d-flex flex-column">
                                                    {/* Labels Row */}
                                                    <div className="d-flex">
                                                        <div className="col-auto label-column mt-4">
                                                            {/* <div className="label-header">Parameters</div> */}
                                                            <div className="parameters-div2"><label>X Pitch</label></div>
                                                            <div className="parameters-div2"><label>X Margin </label></div>
                                                            <div className="parameters-div2"><label>No. of Cuts</label></div>
                                                            <div className="parameters-div2"><label>Long Cut Angle</label></div>
                                                            <div className="parameters-div2"><label>Depth of Cut</label></div>
                                                            <div className="parameters-div2"><label>Horizontal Spindle Speed</label></div>
                                                            <div className="parameters-div2"><label>Z Cut Speed</label></div>
                                                            <div className="parameters-div2"><label>Tool Gap</label></div>
                                                            <div className="parameters-div2"><label>Angle of Cutline</label></div>
                                                        </div>

                                                        {/* Dynamically Generated Columns */}
                                                        <div className="columns-container">
                                                            {columns.map((column) => (
                                                                <div className="col-auto input-column" key={column.id} style={{ paddingLeft: "5px" }}>
                                                                    {/* <div className="column-header">{column.id}</div> */}
                                                                    <div className="d-flex align-items-center">
                                                                        {/* <h6 className="mb-0">{column.id}</h6> */}
                                                                        <div>
                                                                            {column.id}
                                                                        </div>
                                                                        {console.log(column.id)}
                                                                        <button
                                                                            type='button'
                                                                            style={{
                                                                                border: '1px solid transparent',
                                                                                backgroundColor: 'transparent',
                                                                                color: theme.palette.delete_color
                                                                            }}
                                                                            onClick={() => deleteColumn(column.id)}
                                                                        >
                                                                            <Components.Icons.Delete fontSize="small" />
                                                                        </button>
                                                                    </div>
                                                                    <div className="parameters-div"><input {...register(`xPitch`)} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/></div>
                                                                    <div className="parameters-div"><input {...register(`xMargin`)} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/></div>
                                                                    <div className="parameters-div"><input {...register(`no_of_cuts_${column.id}`)} type="number" step="0.01" className="no-spinner" /></div>
                                                                    <div className="parameters-div"><input {...register(`long_cut_angle_${column.id}`)} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/></div>
                                                                    <div className="parameters-div"><input {...register(`depth_of_cut_${column.id}`)} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/></div>
                                                                    <div className="parameters-div"><input {...register(`horizontal_spindle_speed_${column.id}`)} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/></div>
                                                                    <div className="parameters-div"><input {...register(`z_cut_speed_${column.id}`)} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/></div>
                                                                    <div className="parameters-div"><input {...register(`tool_gap_${column.id}`)} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/></div>
                                                                    <div className="parameters-div"><input {...register(`angleOfCutLines`)} type="number" step="0.01" className="no-spinner" onChange={handleInputChange}/></div>
                                                                    
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Button */}
                                            <div className="row Button-div">
                                                <div className="col">
                                                    <Components.Button variant="contained" onClick={() => setShowMainUI(true)} style={{ backgroundColor: "#F5F6F7", color: "#000000" }}>Preview</Components.Button>
                                                </div>
                                                <div className="col">
                                                    <Components.Button variant="contained" style={{ backgroundColor: "#F5F6F7", color: "#000000" }}>Generate Code</Components.Button>
                                                </div>
                                                <div className="col">
                                                    <Components.Button variant="contained" style={{ backgroundColor: "#F5F6F7", color: "#000000" }}>Add Library</Components.Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <div className="">

                </div>

            </>

        );
    };

    export default Dashboard;
