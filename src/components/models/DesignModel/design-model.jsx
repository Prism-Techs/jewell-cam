
import React, { useRef, useState, useEffect } from "react";
import Components from "../../../theme/master-file-material";
import { get_designs } from "../../../services/dull-services/dull-services";
import CustomeButton from "../../common/button/button";

const DesignModel = (props) => {
    const { open, onClose } = props;
    const onDesignSelect = props.onDesignSelect
    const [isDesignData, setDesignData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredDesign, setHoveredDesign] = useState(null);
    const [hoveredImage, setHoveredImage] = useState(null);

    useEffect(() => {
        if (open) {
            get_designs()
                .then(response => {
                    setDesignData(response.data);
                })
                .catch(error => {
                    console.error("Error fetching designs:", error);
                });
        }
    }, [open]);

    const handlePopoverOpen = (event, design) => {
        setAnchorEl(event.currentTarget);
        setHoveredDesign(design);
        setHoveredImage(design);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoveredDesign(null);
    };

    const handleFileClick = (design) => {
        onDesignSelect(design);
        onClose();
        setAnchorEl(null);
        setHoveredDesign(null);
    }
    
    return (
        <>
            <Components.Dialog
                open={open}
                onClose={onClose}
                sx={{
                    "& .MuiDialog-paper": { 
                        width: "95%",
                        maxWidth: "1500px",
                        height: "80vh",
                        display: "flex",
                        flexDirection: "column",
                    },
                    "& .MuiDialogContent-root": {
                        padding: "10px 15px",
                        borderBottom: "0px solid",
                    },
                }}
            >
                <div className="text-center p-1">
                    <h5>Design Files</h5>
                </div>

                <div 
                    className="design-list"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(12, 1fr)",
                        gap: "8px",
                        maxHeight: "calc(125px * 5 + 32px)",
                        overflowX: "auto",
                        padding: "16px",
                        margin: "0 auto",
                        flex: 1,
                    }}
                >
                    {isDesignData.length > 0 ? (
                        isDesignData.map((design, index) => (
                            <div
                                key={index}
                                className="design-item text-center"
                                style={{
                                    width: "100%",
                                    height: "125px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    padding: "8px",
                                    backgroundColor: "#fff",
                                    cursor: "pointer",
                                    transition: "box-shadow 0.2s",
                                    '&:hover': {
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    }
                                }}
                                onMouseEnter={(e) => handlePopoverOpen(e, design)}
                                onMouseLeave={handlePopoverClose}
                            >
                        
                                 <button
                                    className="image-button border rounded w-full hover:opacity-80 transition-opacity mb-1"
                                    onMouseEnter={(e) => handlePopoverOpen(e, design)}
                                    onMouseLeave={handlePopoverClose}
                                    // onClick={() => onImageClick(dataItem.pattern_id)} 
                                    onClick={() => handleFileClick(design)}
                                    
                                >
                                    <img
                                        src={design.attach}
                                        alt="Stored Canvas"
                                        className="w-full h-auto block"
                                    />
                                </button>
                                <div className="design-name">
                                    <span style={{ 
                                        fontSize: "10px",
                                        display: "block",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        maxWidth: "90px"
                                    }}>
                                        {design.design_name}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="d-flex justify-content-center">
                        <p>No designs available.</p>
                        </div>
                    )}
                </div>

                <div 
                    className="d-flex justify-content-end"
                    style={{
                        padding: "8px 16px",
                        marginTop: "auto",
                        borderTop: "1px solid #eee",
                    }}
                >
                    <CustomeButton onClick={onClose} text="Cancel" />
                    <CustomeButton type="submit" text="Ok" />
                </div>
            </Components.Dialog>

            <Components.Popover
                sx={{
                    pointerEvents: 'none',
                }}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                 {hoveredDesign && (
                    <div style={{ padding: "16px", maxWidth: "500px" }}>
                        <div style={{ 
                            borderBottom: "1px solid #eee", 
                            marginBottom: "12px", 
                            paddingBottom: "8px"
                        }}>
                            <h6 style={{ 
                                margin: 0,
                                fontSize: "16px",
                                fontWeight: "600"
                            }}>
                                {hoveredDesign.design_name}
                            </h6>
                        </div>
                        
                        <div style={{ 
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "16px"
                        }}>
                            {/* Left Column */}
                            <div style={{ fontSize: "12px" }}>
                                <p style={{ margin: "4px 0" }}>
                                    <strong>Bangle Type: </strong> 
                                    {hoveredDesign.bangle_type 
                                            ? hoveredDesign.bangle_type
                                                .replace(/_/g, ' ') // Replace underscores with spaces
                                                .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
                                            : '-'}
                                    {/* {hoveredDesign.bangle_type || '-'} */}
                                </p>
                                <p style={{ margin: "4px 0" }}>
                                    <strong>Bangle Width:</strong> {hoveredDesign.bangle_width || '-'}
                                </p>
                                <p style={{ margin: "4px 0" }}>
                                    <strong>Bangle Height:</strong> {hoveredDesign.bangle_height || '-'}
                                </p>
                                <p style={{ margin: "4px 0" }}>
                                    <strong>Bangle Diameter:</strong> {hoveredDesign.bangle_diameter || '-'}
                                </p>
                            </div>
                            
                            {/* Right Column */}
                            <div style={{ fontSize: "12px" }}>
                                <p style={{ margin: "4px 0" }}>
                                    <strong>Position: </strong> 
                                    {hoveredDesign.position 
                                            ? hoveredDesign.position
                                                .replace(/_/g, ' ') // Replace underscores with spaces
                                                .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
                                            : '-'}
                                </p>
                              
                                <p style={{ margin: "4px 0" }}>
                                    <strong>Unit:</strong> {hoveredDesign.unit || '-'}
                                </p>
                                <p style={{ margin: "4px 0" }}>
                                    <strong>Radius:</strong> {hoveredDesign.radius || '-'}
                                </p>
                                <p style={{ margin: "4px 0" }}>
                                    <strong>Degree:</strong> {hoveredDesign.degree || '-'}
                                </p>
                            </div>
                        </div>
                        <div>
                        {hoveredImage && (
                            <div style={{ padding: '10px' }}>
                                <img
                                    src={hoveredImage.attach}
                                    alt="Hovered Canvas"
                                    style={{ maxWidth: '350px', maxHeight: '350px' }}
                                />
                      
                            </div>
                        )}
                        </div>
                    </div>
                )}
            </Components.Popover>
        </>
    );
};

export default DesignModel;