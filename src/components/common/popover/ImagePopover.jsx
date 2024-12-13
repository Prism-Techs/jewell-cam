import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const ImagePopover = ({ dataItem, index,onImageClick  }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [hoveredImage, setHoveredImage] = useState(null);

    const handlePopoverOpen = (event, imgSrc) => {
        setAnchorEl(event.currentTarget);
        setHoveredImage(imgSrc);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoveredImage(null);
    };

    const open = Boolean(anchorEl);

    return (

        <div className="col-12 col-sm-4 mb-4" key={index}>
            {dataItem.canvas_img && (
                <div className="text-center">
                    <button
                        className="image-button border rounded w-full hover:opacity-80 transition-opacity mb-1"
                        onMouseEnter={(e) => handlePopoverOpen(e, dataItem.canvas_img)}
                        onMouseLeave={handlePopoverClose}
                        onClick={() => onImageClick(index)} 
                    >
                        <img
                            src={dataItem.canvas_img}
                            alt="Stored Canvas"
                            className="w-full h-auto block"
                        />
                    </button>
                    <Typography variant="body2" style={{ marginTop: '5px', fontSize: '10px' }}>
                                    {dataItem.pattern_type}
                                </Typography>

                    {/* Popover for displaying the hovered image */}
                    <Popover
                        sx={{ pointerEvents: 'none' }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        {hoveredImage && (
                            <div style={{ padding: '10px' }}>
                                <img
                                    src={hoveredImage}
                                    alt="Hovered Canvas"
                                    style={{ maxWidth: '350px', maxHeight: '350px' }}
                                />
                                <Typography variant="body2" style={{ marginTop: '5px', fontSize: '12px' }}>
                                    {dataItem.pattern_type}
                                </Typography>
                            </div>
                        )}
                    </Popover>
                </div>
            )}
        </div>
    );
};

export default ImagePopover;