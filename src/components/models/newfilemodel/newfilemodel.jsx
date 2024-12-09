import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import Components from '../../../theme/master-file-material';

const NewModel = ({ open, onClose, onSubmit }) => {
    const canvasRef = useRef(null);
    const [type, setType] = useState('flat');
    const [Unittype, setUnitType] = useState('mm');
    const [center, setCenter] = useState('center');
    const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });
    const [lastUpdated, setLastUpdated] = useState(null); // Track which field was last updated

    const { register, handleSubmit, watch, setValue, control } = useForm({
        defaultValues: {
            diameter: 63.64,
            width: 20,
            height: 200,
            material_thickness: '',
            radius: '',
            unit: Unittype,
            type: type,
            position:''
        }
    });
    
    const diameter = watch("diameter");
    const height = watch("height");
    const bangletype = watch("type");

    // Handle diameter and height calculations
    useEffect(() => {
        if (bangletype !== 'pendant') {
            // Skip calculation if no values are present
            if (!diameter && !height) return;

            // Prevent infinite loop by checking which field was last updated
            if (lastUpdated === 'diameter' && diameter) {
                // Calculate height based on diameter
                const calculatedHeight = (22 / 7) * parseFloat(diameter);
                setValue("height", parseFloat(calculatedHeight.toFixed(2)));
            } else if (lastUpdated === 'height' && height) {
                // Calculate diameter based on height
                const calculatedDiameter = (7 / 22) * parseFloat(height);
                setValue("diameter", parseFloat(calculatedDiameter.toFixed(2)));
            }
        }
    }, [diameter, height, bangletype, setValue, lastUpdated]);

    // Custom onChange handlers for diameter and height
    const handleDiameterChange = (event) => {
        setLastUpdated('diameter');
        setValue('diameter', event.target.value);
    };

    const handleHeightChange = (event) => {
        setLastUpdated('height');
        setValue('height', event.target.value);
    };

    const handleTypeChange = (event) => {
        const newType = event.target.value;
        setType(newType);
        setValue('type', newType);
    };

    const handleUnitTypeChange = (event) => {
        const newUnitType = event.target.value;
        setUnitType(newUnitType);
        setValue('unit', newUnitType);
    };

    // const handleCenterChange = (event) => setCenter(event.target.value);

    const handleCenterChange = (event) => {
        const newPosition = event.target.value;
        setCenter(newPosition);
        setValue('position', newPosition); // Update form value
    };

    const getPositionCoordinates = (rectX, rectY, rectWidth, rectHeight) => {
        const positions = {
            'center': {
                x: rectX + rectWidth / 2,
                y: rectY + rectHeight / 2
            },
            'top_left': {
                x: rectX + 2,
                y: rectY + 2
            },
            'top_right': {
                x: rectX + rectWidth - 2,
                y: rectY + 2
            },
            'bottom_left': {
                x: rectX + 2,
                y: rectY + rectHeight - 2
            },
            'bottom_right': {
                x: rectX + rectWidth - 2,
                y: rectY + rectHeight - 2
            }
        };
        return positions[center];
    };

    const drawPositionIndicator = (ctx, x, y) => {
        const size = 4;
        ctx.beginPath();
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        
        ctx.moveTo(x - size, y);
        ctx.lineTo(x + size, y);
        
        ctx.moveTo(x, y - size);
        ctx.lineTo(x, y + size);
        
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const formValues = watch();
        const width = Number(formValues.width) || 0;
        const height = Number(formValues.height) || 0;
        const thickness = Number(formValues.material_thickness) || 2;

        const rectX = (canvas.width - width) / 2;
        const rectY = (canvas.height - height) / 2;

        ctx.strokeStyle = '#000';
        ctx.lineWidth = thickness;
        ctx.beginPath();
        ctx.rect(rectX, rectY, width, height);
        ctx.stroke();

        if (width && height) {
            const pos = getPositionCoordinates(rectX, rectY, width, height);
            drawPositionIndicator(ctx, pos.x, pos.y);
        }
    }, [watch(), canvasSize, center]);

    const onSubmitForm = (data) => {
        onSubmit(data);
    };

    return (
        <Components.Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: '1110px', maxWidth: '100%' } }}>
            <Components.DialogTitle>New Model</Components.DialogTitle>
            <div className="container d-flex">
                <div className="row">
                    <Components.DialogContent dividers>
                        {/* Type selection */}
                        <Components.Box mb={1}>
                            <Components.Typography variant="subtitle1" align="center" sx={{ backgroundColor: '#e0e7eb', padding: '8px', borderRadius: '4px', fontWeight: 'bold' }}>Type</Components.Typography>
                            <Components.RadioGroup row value={type} onChange={handleTypeChange}>
                                <Components.FormControlLabel value="flat" control={<Components.Radio />} label="Flat" />
                                <Components.FormControlLabel value="v_shaped" control={<Components.Radio />} label="V-Shaped" />
                                <Components.FormControlLabel value="half_round" control={<Components.Radio />} label="Half-Round" />
                                <Components.FormControlLabel value="pendant" control={<Components.Radio />} label="Pendant" />
                            </Components.RadioGroup>
                        </Components.Box>

                        {/* Unit selection */}
                        <Components.Box mb={1}>
                            <Components.Typography variant="subtitle1" align="center" sx={{ backgroundColor: '#e0e7eb', padding: '8px', borderRadius: '4px', fontWeight: 'bold' }}>Unit</Components.Typography>
                            <Components.RadioGroup row value={Unittype} onChange={handleUnitTypeChange} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Components.FormControlLabel value="mm" control={<Components.Radio />} label="MM" />
                                <Components.FormControlLabel value="inch" control={<Components.Radio />} label="Inch" />
                            </Components.RadioGroup>
                        </Components.Box>

                        {/* Dimensions */}
                        <Components.Box mb={1}>
                            <Components.Typography variant="subtitle1" align="center" sx={{ backgroundColor: '#e0e7eb', padding: '8px', borderRadius: '4px', fontWeight: 'bold' }}>Dimensions</Components.Typography>
                            <div className='mt-2'>
                                <Components.TextField
                                    label="Diameter"
                                    {...register("diameter")}
                                    value={watch('diameter')}
                                    onChange={handleDiameterChange}
                                    fullWidth
                                    variant="standard"
                                    disabled={type === "pendant"}
                                />
                            </div>
                            <div className='mt-2'>
                                <Components.TextField
                                    label="Width"
                                    {...register("width")}
                                    fullWidth
                                    variant="standard"
                                />
                            </div>
                            <div className='mt-2'>
                                <Components.TextField
                                    label="Height"
                                    {...register("height")}
                                    value={watch('height')}
                                    onChange={handleHeightChange}
                                    fullWidth
                                    variant="standard"
                                />
                            </div>
                            {type === "half_round" && (
                                <div className='mt-2'>
                                    <Components.TextField
                                        label="Radius"
                                        {...register("radius")}
                                        fullWidth
                                        variant="standard"
                                    />
                                </div>
                            )}
                            <div className='mt-2'>
                                <Components.TextField
                                    label="Material Thickness"
                                    {...register("material_thickness")}
                                    fullWidth
                                    variant="standard"
                                />
                            </div>
                        </Components.Box>
                    </Components.DialogContent>
                </div>
                <div className="row">
                    <Components.DialogContent dividers>
                        <canvas
                            ref={canvasRef}
                            width={600}
                            height={400}
                            // style={{ border: '1px solid #ccc' }}
                        />
                        <Components.Box mt={2}>
                            <Components.Typography variant="subtitle1" align="center" sx={{ backgroundColor: '#e0e7eb', padding: '8px', borderRadius: '4px', fontWeight: 'bold' }}>Select Center</Components.Typography>
                            <Components.RadioGroup row value={center} onChange={handleCenterChange}>
                                <Components.FormControlLabel value="top_left" control={<Components.Radio />} label="Top Left" />
                                <Components.FormControlLabel value="center" control={<Components.Radio />} label="Center" />
                                <Components.FormControlLabel value="bottom_left" control={<Components.Radio />} label="Bottom Left" />
                                <Components.FormControlLabel value="top_right" control={<Components.Radio />} label="Top Right" />
                                <Components.FormControlLabel value="bottom_right" control={<Components.Radio />} label="Bottom Right" />
                            </Components.RadioGroup>
                        </Components.Box>
                    </Components.DialogContent>
                </div>
            </div>
            <Components.DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit(onSubmitForm)} color="primary">Ok</Button>
            </Components.DialogActions>
        </Components.Dialog>
    );
};

export default NewModel;