import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Components from "../../theme/master-file-material";
import "./dashboard.scss";
import { useFieldArray, useForm } from "react-hook-form";
import theme from "../../theme/theme";
import ArcCanvas from "../../components/common/arcdesign/arcdesign";
import { Popover, Box, Button, Typography } from '@mui/material';
import CurveCanvasComponent from "../../components/common/CurveCanvas/canvas_curve";
import Box2 from "../../components/common/box2/box2";
import TurningPage from "../../components/common/TurningPage/Turning";
import DesignPage from "../../components/common/DesignPage/design";
import { get_single_pattern, create_design, update_design, get_single_design } from "../../services/dull-services/dull-services";
import { get_tool_library } from "../../services/tool-services/tool-services";
import { toast } from "react-toastify";
const Dashboard = () => {
    const [isOpenColorModel, setOpColorModel] = useState(false);
    const [selectedColorName, setSelectedColorName] = useState(null);
    const [canvasImg, SetcanvasImg] = useState(null);
    const [selectedColors, setSelectedColors] = useState({ light: "", dark: "" });
    const [selectedColumnId, setSelectedColumnId] = useState(null);
    const [openfileData, setOpenFileData] = useState([]);
    const [localCoordinates, setLocalCoordinates] = useState({ x: 0, y: 0 });
    const [activeTab, setActiveTab] = useState('background');
    const [activeIcon, setActiveIcon] = useState('Wall');
    const [selectedDullId, setSelectedDullId] = useState(null); // State to hold the dull_id
    const [DesignMasterId, setDesignMasterId] = useState([])
    const [ToolLibraryData, setToolLibraryData] = useState([])
    const [tabs, setTabs] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const isPopoverOpen = Boolean(anchorEl);

    const colorMapping = [
        { name: "Golden", light: "#e8dca2", dark: "#bca323" },
        { name: "Blue", light: "#8db3f0", dark: "#326bc7" },
        { name: "Green", light: "#a5e8a7", dark: "#3a873c" },
        { name: "Red", light: "#e8a895", dark: "#9c503a" },
        { name: "Purple", light: "#c9a5e6", dark: "#c9a5e6" },
        { name: "Grey", light: "#e6e1eb", dark: "#7a757d" },
    ];

    const handleOpenColorPopover = (event, index) => {
        event.preventDefault();
        console.log(event.currentTarget);
        
        setAnchorEl(event.currentTarget); // Set anchor for the popover
        setSelectedColumnId(index); // Set the selected color index
    };

    const handleCloseColorPopover = () => {
        setAnchorEl(null);
    };

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
            design_id: tabs["design_id"] || "",
            design_name: tabs["design_name"] || "",
            bangle_width: tabs['bangle_width'] || 20,
            bangle_diameter: tabs['bangle_diameter'] || 63.64,
            bangle_type: tabs['bangle_type'] || 'flat',
            bangle_height: tabs['bangle_height'] || 200,
            position: tabs['position'] || 'center',
            tool_dia: 10,
            tool_v_angle: 120,
            pattern_type: "",
            canvas_img: canvasImg,
            dull_type: "",
            xmargin: 2,
            no_of_tool: 0,
            multipass: [
                {
                    id: 0,
                    tool_id: '',
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

    useEffect(() => {
        const currentUrl = new URL(window.location.href);
        const searchParams = new URLSearchParams(currentUrl.search);
        const designId = searchParams.get('design');  // Extract design_id from URL
        setDesignMasterId(designId);
    })

    // const onSubmitParameters = (data) => {
    // };

    const handleModelSubmit = (data) => {

        const formData = watch();
        let pattern_name = formData.design_name;

        pattern_name = pattern_name.replace(/\s+/g, ''); // This removes all spaces
        const formattedDataUrl = `data:image/png,name:${pattern_name}.png;base64,${formData.canvas_img}`;
        const updatedata = {
            ...data,
            dull_type: activeIcon,
            bangle_type: data.type,
            bangle_width: data.width,
            bangle_diameter: data.diameter,
            bangle_height: data.height,
            attach: [formattedDataUrl],
            multipass: [
                {
                    id: 0,
                    tool_id:'',
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
        }
        create_design(updatedata)
            .then(response => {
                const data = response.data;
                setTabs(data);
                console.log("Design saved successfully:", data.design_id);
                reset({
                    design_id: data.design_id || "",
                    design_name: data.design_name || "",
                    bangle_width: data.bangle_width || '',
                    bangle_diameter: data.bangle_diameter || '',
                    bangle_type: data.bangle_type || '',
                    bangle_height: data.bangle_height || '',
                    position: data.position || '',
                    tool_dia: 10,
                    tool_v_angle: 120,
                    no_of_tool: data.no_of_tool || '',
                    multipass: [
                        {
                            id: 0,
                            tool_id:'',
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
                // Get the encrypted key (in this case, design_id)
                const encryptedKey = data.design_eid;

                // Get current URL
                const currentUrl = new URL(window.location.href);

                // Use URLSearchParams to modify the query string
                const searchParams = new URLSearchParams(currentUrl.search);

                // Remove existing 'design_id' parameter if present
                if (searchParams.has('design')) {
                    searchParams.delete('design');
                }

                // Add the new 'design_id' to the query string
                searchParams.append('design', encryptedKey);

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
    };

    const handleUpdateDesign = () => {
        const currentUrl = new URL(window.location.href);
        const searchParams = new URLSearchParams(currentUrl.search);
        const designId = searchParams.get('design');  // Extract design_id from URL
        setDesignMasterId(designId);
        if (!designId) {
            toast.error("Please Select Or Create Design First", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            return;  // Exit if design_id is not present in the URL
        }

        // Get specific keys from the form state using watch()
        const formData = watch();       
        let pattern_name = formData.design_name;

        pattern_name = pattern_name.replace(/\s+/g, ''); // This removes all spaces
        const formattedDataUrl = `data:image/png,name:${pattern_name}.png;base64,${formData.canvas_img}`;
        const updatedData = {
            tool_dia: formData.tool_dia,
            bangle_type: formData.bangle_type,
            design_name: formData.design_name,
            position: formData.position,
            dull_type: activeIcon,
            no_of_tool: formData.no_of_tool,
            tool_v_angle: parseInt(formData.tool_v_angle),
            xmargin: formData.xmargin,
            multipass: formData.multipass,
            attach: [formattedDataUrl]
        };
        console.log(updatedData);
        

        update_design(designId, updatedData)
            .then(response => {
                const data = response.data;
                toast.success("Design update successfully", {
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
    };

    const addColumn = () => {
        append({
            id: fields.length + 1,  // Assign id based on current number of fields
            tool_id: '',
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

    const handleDullIdSelect = (dull_id, dull_type) => {
        setActiveIcon(dull_type)
        console.log();

        setValue('pattern_type', dull_type);
        setSelectedDullId(dull_id);
    };

    const handleImageClick = (id) => {
        get_single_pattern(id)
            .then((response) => {
                if (response && response.data) {
                    const clickedData = response.data;
                    if (clickedData) {
                        setValue("tool_dia", parseInt(clickedData.tool_dia) || 10); // Default value if missing
                        setValue("tool_v_angle", parseInt(clickedData.tool_v_angle) || 120); // Default value if missing
                        setValue("xmargin", parseInt(clickedData.xmargin) || 2); // Default value if missing
                        setValue("multipass", clickedData.multipass || [
                            {
                                id: 0,
                                xpitch: 4,
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
                        ]); // Set default multipass or clicked multipass
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching patterns data:", error);
            });
    };

    const handleUploadDesign = (data) => {
        console.log(data);
        // Get the encrypted key (in this case, design_id)
        const encryptedKey = data.design_eid;

        // Get current URL
        const currentUrl = new URL(window.location.href);

        // Use URLSearchParams to modify the query string
        const searchParams = new URLSearchParams(currentUrl.search);

        // Remove existing 'design_id' parameter if present
        if (searchParams.has('design_id')) {
            searchParams.delete('design_id');
        }

        // Add the new 'design_id' to the query string
        searchParams.append('design', encryptedKey);

        // Update the URL without reloading the page
        const newUrl = `${currentUrl.pathname}?${searchParams.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        reset({
            design_id: data.design_eid || "",
            design_name: data.design_name || "",
            bangle_width: data.bangle_width || '',
            bangle_diameter: data.bangle_diameter || '',
            bangle_type: data.bangle_type || '',
            bangle_height: data.bangle_height || '',
            position: data.position || '',
            tool_dia: data.tool_dia || 10,
            tool_v_angle: data.tool_v_angle || 120,
            no_of_tool: data.no_of_tool || 0,
            multipass: data.multipass ||
                [
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
                ]
        });
    };


    useEffect(() => {
        get_tool_library()
            .then(response => {
                // console.log(response);
                setToolLibraryData(response.data);
            })
            .catch(error => {
                toast.error("Failed to fetch Tool Data");
            });

    }, []);

    // console.log(watch())

    return (
        <>
            <div className="main-container">
                <Navbar
                    onCreateNewFile={handleModelSubmit}
                    updateDesignData={handleUploadDesign}
                    dashboardData={formData}
                    setActiveTab={setActiveTab}
                    setOpenFileData={setOpenFileData}
                    DullIdGet={selectedDullId}
                ></Navbar>
                <div className="content">

                    {activeTab === 'background' && (
                        <>
                            <Box2 onDullIdSelect={handleDullIdSelect} handleImageClick={handleImageClick} />

                            <div className="row box3">
                                <div className="d-flex justify-content-between p-1">
                                    <label>
                                        <strong className="strong-class">Type :</strong>
                                        <span className="text-class">
                                            {watch('bangle_type')
                                                ? watch('bangle_type')
                                                    .replace(/_/g, ' ') // Replace underscores with spaces
                                                    .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
                                                : ''}
                                        </span>
                                    </label>
                                    <label>
                                        <strong className="strong-class">Design :</strong>
                                        <span className="text-class">{watch('design_name')}</span>
                                    </label>
                                    <label>
                                        <strong className="strong-class">Width :</strong>
                                        <span className="text-class">{watch('bangle_width')}</span>
                                    </label>
                                    <label>
                                        <strong className="strong-class">Diameter :</strong>
                                        <span className="text-class">{watch('bangle_diameter')}</span>
                                    </label>
                                    {/* <label>
                                        <strong className="strong-class">Pattern :</strong>
                                        <span className="text-class">{watch('pattern_type')}</span>
                                    </label> */}
                                </div>
                                <div className="">
                                    <ArcCanvas params={formData} localCoordinates={localCoordinates} setLocalCoordinates={setLocalCoordinates} SetcanvasImg={SetcanvasImg} />
                                </div>
                                <div className="col xy-cord">
                                    <div>
                                        <span className="strong-class">X: <span className="text-class">{(localCoordinates.x.toFixed(2))}</span> </span>
                                        <span className="strong-class" style={{ marginLeft: '30px' }}>Y: <span className="text-class">{(localCoordinates.y.toFixed(2))}</span></span>
                                    </div>
                                    <div>
                                        <span className="strong-class">
                                            Zero Position:
                                            <span className="text-class">
                                                {watch('position')
                                                    ? watch('position')
                                                        .replace(/_/g, ' ') // Replace underscores with spaces
                                                        .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
                                                    : ''}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <div className="box4">
                                <form onSubmit={handleSubmit} className="form-div">
                                    <div style={{ flexGrow: 1 }}>
                                        <div className="row m-1  right-div">
                                            <div className="row p-1">
                                                {/* <div className="col-12 col-md-3 mb-1">
                                                    <div className="d-flex flex-column">
                                                        <label className="mb-1" style={{ whiteSpace: 'nowrap' }}>
                                                            <strong>Design Name</strong>
                                                        </label>
                                                        <input
                                                            value={watch('design_name')}
                                                            style={{ fontSize: "12px" }}
                                                        />
                                                    </div>
                                                </div> */}
                                                <div className="col-12 col-md-3 mb-1">
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
                                                <div className="col-12 col-md-3 mb-1">
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
                                                <div className="col-12 col-md-3 mb-1">
                                                    <div className="d-flex flex-column">
                                                        <label className="mb-1" style={{ whiteSpace: 'nowrap' }}>
                                                            <strong>No Of Tools</strong>
                                                        </label>
                                                        <input
                                                            {...register("no_of_tool")}
                                                            type="number"
                                                            //step="0.01"
                                                            className="no-spinner"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-3 mb-1">
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
                                            <div className="d-flex justify-content-between align-items-center multilayer">
                                                {/* First div with h6 and button */}
                                                <div className="d-flex justify-content-start align-items-center">
                                                    <h6 className="mb-0 title-label ">MultiLayer</h6>
                                                    <button
                                                        type="button"
                                                        style={{ border: '1px solid transparent', backgroundColor: 'transparent' }}
                                                        onClick={addColumn}
                                                    >
                                                        <Components.Icons.Add fontSize="small" />
                                                    </button>
                                                </div>

                                                {/* Second div with Update button */}
                                                {/* {DesignMasterId && ( */}
                                                    <div className="d-flex justify-content-end align-items-center">
                                                        <button
                                                            type="button"
                                                            style={{
                                                                fontWeight: 'bold',
                                                                backgroundColor: 'transparent',
                                                                border: 'none',   // Remove border
                                                                color: 'black',   // Set text color
                                                                padding: '5px 10px',  // Add padding for better spacing
                                                                cursor: 'pointer'  // Change cursor to pointer for better UX
                                                            }}
                                                            onClick={handleUpdateDesign} // Make sure to replace with your actual update handler
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                {/* )} */}
                                            </div>
                                            <div className="d-flex flex-column">
                                                <div className="d-flex">
                                                    <div className="col-auto label-column mt-4">

                                                        <div className="parameters-div2"><label>Tool</label></div>
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
                                                                            type="button"
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
                                                                    <select {...register(`multipass[${index}].tool_id`)} className="dropdown-select">
                                                                        <option value="">Select Tool</option>
                                                                        {ToolLibraryData?.map((tool) => (
                                                                            <option key={tool.tool_id} value={tool.tool_id}>
                                                                                {tool.tool_name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="parameters-div">
                                                                    <input {...register(`multipass[${index}].xpitch`)} type="number" step="0.1" className="no-spinner" />
                                                                </div>
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
                                                                        disabled={activeIcon === 'Wall'}
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

                        <TurningPage />

                    )}

                    {activeTab === 'design' && (

                        <DesignPage />
                    )}
                </div>

            </div>
        </>
    );
};

export default Dashboard;
