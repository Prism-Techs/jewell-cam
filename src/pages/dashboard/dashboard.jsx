import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Components from "../../theme/master-file-material";
import "./dashboard.scss";
import { useFieldArray, useForm } from "react-hook-form";
import theme from "../../theme/theme";
import ArcCanvas from "../../components/common/arcdesign/arcdesign";
import { Popover, Box, Button, Typography } from '@mui/material';
import FormatColorFill from '@mui/icons-material/FormatColorFill';
import CurveCanvasComponent from "../../components/common/CurveCanvas/canvas_curve";
import ImagePopover from "../../components/common/popover/ImagePopover";
import Box1 from "../../components/common/box1/box1";
import Box2 from "../../components/common/box2/box2";
import TurningPage from "../../components/common/TurningPage/Turning";
import DesignPage from "../../components/common/DesignPage/design";
const Dashboard = () => {
    const [isOpenColorModel, setOpColorModel] = useState(false);
    const [selectedColorName, setSelectedColorName] = useState(null);
    const [canvasImg, SetcanvasImg] = useState(null);
    const [selectedColors, setSelectedColors] = useState({ light: "", dark: "" });
    const [selectedColumnId, setSelectedColumnId] = useState(null);
    const [openfileData, setOpenFileData] = useState([]);
    const [localCoordinates, setLocalCoordinates] = useState({ x: 0, y: 0 });
    const [activeTab, setActiveTab] = useState('background');
    const [activeIcon, setActiveIcon] = useState('Wall Dull');
    const [storedData, setStoredData] = useState([])

    const colorMapping = [
        { name: "Golden", light: "#e8dca2", dark: "#bca323" },
        { name: "Blue", light: "#8db3f0", dark: "#326bc7" },
        { name: "Green", light: "#a5e8a7", dark: "#3a873c" },
        { name: "Red", light: "#e8a895", dark: "#9c503a" },
        { name: "Purple", light: "#c9a5e6", dark: "#c9a5e6" },
        { name: "Grey", light: "#e6e1eb", dark: "#7a757d" },
    ];

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenColorPopover = (event, index) => {
        setAnchorEl(event.currentTarget); // Set anchor for the popover
        setSelectedColumnId(index); // Set the selected color index
    };

    const handleCloseColorPopover = () => {
        setAnchorEl(null);
    };

    const isPopoverOpen = Boolean(anchorEl); // Check if the popover is open

    const [tabs, setTabs] = useState(() => {
        const savedTabs = JSON.parse(localStorage.getItem("tabs")) || [];
        return savedTabs;
    });

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            bangle_width: tabs["width"],
            bangle_diameter: tabs["diameter"],
            bangle_type: tabs["type"],
            bangle_height: tabs["height"],
            position: tabs["position"],
            tool_dia: 10,
            tool_v_angle: 120,
            pattern_type: "",
            canvas_img: canvasImg,
            dull_type: "",
            xmargin: 2,
            multipass: [
                {
                    id: 0,
                    xpitch: 4,
                    no_of_cuts: 50,
                    cut_depth: 0.1,
                    spindle_speed: 9000,
                    cut_angle1: 0,
                    long_angle: 45,
                    x_shift_start: 0,
                    y_shift_start: 0,
                    angle_of_cutline: "",
                    curve_path: "Spiral",
                    curve_path_width: 50,
                    curve_path_height: 50,
                    curve_y: 1,
                    part_y: "",
                    theme_color_light: "#e8dca2",
                    theme_color_dark: "#bca323"
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "multipass"
    })

    useEffect(() => {
        if (openfileData && Object.keys(openfileData).length > 0) {
            console.log("openfileData", openfileData); // Check the structure

            reset({
                bangle_width: openfileData.bangle_width || '',
                bangle_diameter: openfileData.bangle_diameter || '',
                bangle_type: openfileData.bangle_type || '',
                bangle_height: openfileData.bangle_height || '',
                position: openfileData.position || '',
                tool_dia: openfileData.tool_dia || 10,
                tool_v_angle: openfileData.tool_v_angle || 120,
                pattern_type: openfileData.pattern_type || '',
                canvas_img: openfileData.canvas_img || canvasImg,
                multipass: openfileData.multipass || []
            });
        }
    }, [openfileData, reset]);

    useEffect(() => {
        if (canvasImg) {
            setValue('canvas_img', canvasImg);  // Update form with new canvas image URL
        }
    }, [canvasImg, setValue]);

    // This function for store formData in localstorage 
    const onSubmitParameters = (data) => {
    };

    const handleModelSubmit = (data) => {
        localStorage.removeItem("tabs"); // Clear old data
        localStorage.setItem("tabs", JSON.stringify(data)); // Save new data
        setTabs(data); // Update state with new tabs
        console.log(data);

        reset({
            bangle_width: data['width'] || '',
            bangle_diameter: data['diameter'] || '',
            bangle_type: data['type'] || '',
            bangle_height: data['height'] || '',
            position: data['position'] || '',
            tool_dia: 10,
            tool_v_angle: 120,
            multipass: [
                {
                    id: 0,
                    xpitch: 4,
                    no_of_cuts: 50,
                    cut_depth: 0.1,
                    spindle_speed: 9000,
                    cut_angle1: 0,
                    long_angle: 45,
                    x_shift_start: 0,
                    y_shift_start: 0,
                    angle_of_cutline: "",
                    curve_path: "Spiral",
                    curve_path_width: 50,
                    curve_path_height: 50,
                    curve_y: "",
                    part_y: "",
                    theme_color_light: "#e8dca2",
                    theme_color_dark: "#bca323"
                },
            ],
        });
    };

    const addColumn = () => {
        append({
            id: fields.length + 1,  // Assign id based on current number of fields
            xpitch: 4,
            // xmargin: 2,
            no_of_cuts: 50,
            cut_depth: 0.1,
            spindle_speed: 9000,
            cut_angle1: 0,
            long_angle: 45,
            x_shift_start: 0,
            y_shift_start: 0,
            angle_of_cutline: "",
            curve_path: "Spiral",
            curve_path_width: 50,
            curve_path_height: 50,
            curve_y: 1,
            part_y: "",
            theme_color_light: "#e8dca2",
            theme_color_dark: "#bca323"
        });

    };

    const deleteColumn = (index) => {
        remove(index);
    };

    const formData = watch();

    const handleImageClick = (index) => {
        // Retrieve the formData from localStorage
        const formData = JSON.parse(localStorage.getItem(activeIcon));


        if (formData) {
            // Retrieve the data based on the index
            const clickedData = formData[index];

            if (clickedData) {
                // Reset the form with clickedData values
                reset({
                    bangle_width: tabs["width"],
                    bangle_diameter: tabs["diameter"],
                    bangle_type: tabs["type"],
                    bangle_height: tabs["height"],
                    position: tabs["position"],
                    tool_dia: clickedData.tool_dia || 10, // You can provide a default if necessary
                    tool_v_angle: clickedData.tool_v_angle || 120, // Default value if missing
                    pattern_type: clickedData.pattern_type || "", // Default value
                    canvas_img: clickedData.canvas_img || canvasImg, // Default image
                    dull_type: activeIcon,
                    xmargin: 2,
                    multipass: clickedData.multipass || [
                        {
                            id: 0,
                            xpitch: 4,
                            // xmargin: 2,
                            no_of_cuts: 50,
                            cut_depth: 0.2,
                            spindle_speed: 9000,
                            cut_angle1: 0,
                            long_angle: 45,
                            x_shift_start: 0,
                            y_shift_start: 0,
                            angle_of_cutline: "",
                            curve_path: "",
                            curve_path_width: "",
                            curve_path_height: "",
                            part_x: "",
                            part_y: "",
                            theme_color_light: "#e8dca2",
                            theme_color_dark: "#bca323"
                        },
                    ], // Set default multipass or clicked multipass
                });
            }
        } else {
            console.log('No form data found in localStorage');
        }
    };

    const handleIconClick = (iconName) => {
        const GetFormData = JSON.parse(localStorage.getItem(iconName)) || [];
        setStoredData(GetFormData)
        console.log(iconName);
        
        setValue("dull_type", iconName);
        setActiveIcon(iconName);
    };


    return (
        <>
            <div className="main-container">

                <Navbar
                    onCreateNewFile={handleModelSubmit}
                    dashboardData={formData}
                    setActiveTab={setActiveTab}
                    setOpenFileData={setOpenFileData}
                ></Navbar>
                <div className="content">

                    {activeTab === 'background' && (
                        <>
                            <Box1 handleIconClick={handleIconClick} activeIcon={activeIcon} />
               
                            <Box2 storedData={storedData} handleImageClick={handleImageClick}/>

                            <div className="row box3">
                                <div className="d-flex justify-content-between p-1">
                                    <label>
                                        <strong className="strong-class">Type :</strong>
                                        <span className="text-class">  {watch('bangle_type')
                                            .replace(/_/g, ' ') // Replace underscores with spaces
                                            .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
                                        }</span>
                                    </label>
                                    <label>
                                        <strong className="strong-class">Width :</strong>
                                        <span className="text-class">{watch('bangle_width')}</span>
                                    </label>
                                    <label>
                                        <strong className="strong-class">Diameter :</strong>
                                        <span className="text-class">{watch('bangle_diameter')}</span>
                                    </label>
                                    <label>
                                        <strong className="strong-class">Pattern :</strong>
                                        <span className="text-class">{watch('pattern_type')}</span>
                                    </label>
                                </div>
                                <div className="">
                                    <ArcCanvas params={formData} localCoordinates={localCoordinates} setLocalCoordinates={setLocalCoordinates} SetcanvasImg={SetcanvasImg} />
                                </div>
                                <div className="col xy-cord">
                                    <div>
                                        <span>X: <span className="text-class">{(localCoordinates.x.toFixed(2))}</span> </span>
                                        <span style={{ marginLeft: '30px' }}>Y: <span className="text-class">{(localCoordinates.y.toFixed(2))}</span></span>
                                    </div>
                                    <div>
                                        <span>
                                            Zero Position:
                                            <span className="text-class">
                                                {watch('position')
                                                    .replace(/_/g, ' ') // Replace underscores with spaces
                                                    .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
                                                }
                                            </span>
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <div className="box4">
                                <form onSubmit={handleSubmit(onSubmitParameters)} className="form-div">
                                    <div style={{ flexGrow: 1 }}>
                                        {/* Tool Section */}
                                        <div className="row m-1 border border-2 right-div">
                                            <div className="row p-1">
                                                <div className="col-12 col-md-4 mb-1">
                                                    <div className="d-flex flex-column">
                                                        <label className="mb-1" style={{ whiteSpace: 'nowrap' }}>
                                                            <strong>Tool Diameter</strong>
                                                        </label>
                                                        <input
                                                            {...register("tool_dia")}
                                                            type="number"
                                                            //step="0.01"
                                                            className=" no-spinner"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4 mb-1">
                                                    <div className="d-flex flex-column">
                                                        <label className="mb-1" style={{ whiteSpace: 'nowrap' }}>
                                                            <strong>Tool Angle</strong>
                                                        </label>
                                                        <input
                                                            {...register("tool_v_angle")}
                                                            type="number"
                                                            //step="0.01"
                                                            className="no-spinner"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-4 mb-1">
                                                    <div className="d-flex flex-column">
                                                        <label className="mb-1" style={{ whiteSpace: 'nowrap' }}>
                                                            <strong>X-Margin</strong>
                                                        </label>
                                                        <input
                                                            {...register("xmargin")}
                                                            type="number"
                                                            step="0.01"
                                                            className="no-spinner"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        {/* Multipass Parameters */}
                                        <div className="row m-1">
                                            <div className="d-flex align-items-center multilayer ">
                                                <h6 className="mb-0 title-lable">MultiLayer</h6>
                                                <button type="button" style={{ border: '1px solid transparent', backgroundColor: 'transparent' }}
                                                    onClick={addColumn}
                                                >
                                                    <Components.Icons.Add fontSize="small" />
                                                </button>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <div className="d-flex">
                                                    <div className="col-auto label-column mt-4">

                                                        <div className="parameters-div2"><label>X Pitch</label></div>
                                                        {/* <div className="parameters-div2"><label>X Margin </label></div> */}
                                                        <div className="parameters-div2"><label>No. of Cuts (Y pitch)</label></div>
                                                        <div className="parameters-div2"><label>Cut Depth</label></div>
                                                        <div className="parameters-div2"><label>Spindle Speed</label></div>
                                                        <div className="parameters-div2"><label>Cut Angle (X1 Axis)</label></div>
                                                        <div className="parameters-div2"><label>Long Angle</label></div>
                                                        <div className="parameters-div2"><label>X shift Start</label></div>
                                                        <div className="parameters-div2"><label>Y shift Start</label></div>
                                                        <div className="parameters-div2"><label>Angle of Cutline</label></div>
                                                        <div className="parameters-div2"><label>Curve Path</label></div>
                                                        <div className="parameters-div2"><label>Curve Path width</label></div>
                                                        <div className="parameters-div2"><label>Curve Path Height</label></div>
                                                        <div className="parameters-div2"><label>Boxes Y</label></div>
                                                    </div>
                                                    {/* Dynamically Generated Columns */}
                                                    <div className="columns-container">
                                                        {fields.map((column, index) => (

                                                            <div className="col-auto input-column" key={column.id} style={{ paddingLeft: "5px" }}>
                                                                <div className="d-flex align-items-center">
                                                                    <div>
                                                                        <button
                                                                            onClick={(event) => handleOpenColorPopover(event, index)}
                                                                            style={{ border: '1px solid transparent', backgroundColor: 'transparent' }}
                                                                        >
                                                                            <Components.Icons.FormatColorFill
                                                                                style={{
                                                                                    width: '20px',
                                                                                    height: '17px',
                                                                                    color: watch(`multipass[${index}].theme_color_dark`) || 'black' // Use selected color for the icon or default
                                                                                }}
                                                                            />
                                                                        </button>
                                                                        <Popover
                                                                            open={isPopoverOpen}
                                                                            anchorEl={anchorEl}
                                                                            onClose={handleCloseColorPopover}
                                                                            anchorOrigin={{
                                                                                vertical: 'bottom',
                                                                                horizontal: 'left',
                                                                            }}
                                                                            transformOrigin={{
                                                                                vertical: 'top',
                                                                                horizontal: 'left',
                                                                            }}
                                                                        >
                                                                            <Box sx={{ padding: "10px" }}>
                                                                                <Typography sx={{ fontSize: "14px", marginBottom: "10px", textAlign: 'center', fontWeight: 'bold' }}>
                                                                                    Select a Theme
                                                                                </Typography>
                                                                                <Box
                                                                                    display="flex"
                                                                                    flexDirection="row"
                                                                                    justifyContent="center"
                                                                                    alignItems="center"
                                                                                    gap={1}
                                                                                    flexWrap="nowrap"
                                                                                >
                                                                                    {colorMapping.map((color) => (
                                                                                        <Box
                                                                                            key={color.name}
                                                                                            onClick={() => {
                                                                                                setSelectedColorName(color.name);
                                                                                                setValue(`multipass[${selectedColumnId}].theme_color_light`, color.light);
                                                                                                setValue(`multipass[${selectedColumnId}].theme_color_dark`, color.dark);
                                                                                                handleCloseColorPopover(); // Close after selection
                                                                                            }}
                                                                                            sx={{
                                                                                                display: "flex",
                                                                                                justifyContent: "center",
                                                                                                alignItems: "center",
                                                                                                width: 60,
                                                                                                height: 30,
                                                                                                backgroundColor: color.dark,
                                                                                                borderRadius: "3px",
                                                                                                color: "#fff",
                                                                                                fontWeight: "bold",
                                                                                                cursor: "pointer",
                                                                                                textTransform: "capitalize",
                                                                                                boxShadow: "0 0 3px rgba(0,0,0,0.2)",
                                                                                                border: selectedColorName === color.name ? "3px solid #000" : "none",
                                                                                            }}
                                                                                        >
                                                                                            {color.name}
                                                                                        </Box>
                                                                                    ))}
                                                                                </Box>
                                                                            </Box>
                                                                        </Popover>
                                                                    </div>
                                                                    <span style={{ fontWeight: "bold", fontSize: "14px" }}>{index + 1}</span>
                                                                    {
                                                                        index !== 0 && (
                                                                            <button
                                                                                type='button'
                                                                                style={{ border: '1px solid transparent', backgroundColor: 'transparent', color: theme.palette.delete_color }}
                                                                                onClick={() => deleteColumn(index)}
                                                                            >
                                                                                <Components.Icons.Delete fontSize="small" style={{ width: '20px', height: '17px' }} />
                                                                            </button>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].xpitch`)} type="number" step="0.1" className="no-spinner" />
                                                                </div>
                                                                {/* <div className="parameters-div">
                                                                    <input {...register(`xmargin`)}
                                                                        disabled={index !== 0}
                                                                        type="number" step="1" className="no-spinner" />
                                                                </div> */}
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].no_of_cuts`)} type="number" className="no-spinner" />
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].cut_depth`)} type="number" step="0.01" className="no-spinner" />
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].spindle_speed`)} type="number" className="no-spinner" />
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].cut_angle1`)} type="number" className="no-spinner" />
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input
                                                                        {...register(`multipass[${index}].long_angle`)}
                                                                        type="number"
                                                                        className="no-spinner"
                                                                        disabled={activeIcon == 'Wall Dull'}
                                                                    />
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].x_shift_start`)} type="number" step="0.1" className="no-spinner" />
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].y_shift_start`)} type="number" step="0.1" className="no-spinner" />
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].angle_of_cutline`)} type="number" className="no-spinner" />
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <select {...register(`multipass[${index}].curve_path`)} className="no-spinner"
                                                                        style={{ height: '30px', width: '60px', borderRadius: "4px", borderColor: "1px solid #ccc" }}
                                                                    >
                                                                        <option value="Spiral">Spiral</option>
                                                                        <option value="Straight">Straight</option>
                                                                        <option value="C">C</option>
                                                                        <option value="S">S</option>
                                                                    </select>
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].curve_path_width`)} type="number" className="no-spinner" />
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].curve_path_height`)} type="number" className="no-spinner" />
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].curve_y`)} type="number" className="no-spinner" />
                                                                </div>

                                                                <div className="parameters-div">
                                                                    <CurveCanvasComponent
                                                                        width={watch(`multipass[${index}].curve_path_width`)}  // Canvas width (can be set to a fixed size or dynamic based on requirement)
                                                                        height={watch(`multipass[${index}].curve_path_height`)} // Canvas height (can be set to a fixed size or dynamic based on requirement)
                                                                        curve_path={watch(`multipass[${index}].curve_path`)}
                                                                        style={{ background: '#000', borderRadius: "4px" }}
                                                                    />
                                                                </div>

                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="row m-1">
                                        <div className="Button-div d-flex justify-content-between w-100">
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </>
                    )}

                    {activeTab === 'turning' && (
                     
                            <TurningPage/>
                    
                    )}

                    {activeTab === 'design' && (
                    
                            <DesignPage/>
                        )}
                </div>

            </div>
        </>
    );
};

export default Dashboard;
