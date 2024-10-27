// import React, { useRef, useState, useEffect } from 'react';
// import { Button } from '@mui/material';
// import Components from '../../../theme/master-file-material';

// const NewModel = ({ open, onClose,onSubmit }) => {
//     const canvasRef = useRef(null);
//     const [type, setType] = useState('flat');
//     const [Unittype, setUnitType] = useState('mm');
//     const [unit, setUnit] = useState('mm');
//     const [dimensions, setDimensions] = useState({
//         diameter: '',
//         width: '',
//         height: '',
//         material_thickness: ''
//     });
//     const [center, setCenter] = useState('center');
//     const [canvasSize, setCanvasSize] = useState({
//         width: 400,
//         height: 400
//     })

//     const handleTypeChange = (event) => setType(event.target.value);
//     const handleUnitTypeChange = (event) => setUnitType(event.target.value);
//     const handleCenterChange = (event) => setCenter(event.target.value);

//     const handleDimensionChange = (e) => {
//         const { name, value } = e.target;
//         setDimensions((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const getCanvasCenterCoordinates = () => {
//         const { width, height } = canvasSize;
//         switch (center) {
//             case 'top_left': return { x: 0, y: 0 };
//             case 'top_right': return { x: width, y: 0 };
//             case 'bottom_left': return { x: 0, y: height };
//             case 'bottom_right': return { x: width, y: height };
//             case 'center': 
//             default: return { x: width / 2, y: height / 2 };
//         }
//     };
    
//     useEffect(() => {
//         const canvas = canvasRef.current;
    
//         if (!canvas) return;
    
//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;
    
//         // Set the new canvas dimensions
//         canvas.width = canvasSize.width;
//         canvas.height = canvasSize.height;
    
//         // Clear the canvas before drawing
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
    
//         const { diameter, width, height, material_thickness } = dimensions;
//         const thickness = material_thickness || 2;
    
//         // Set default styles
//         ctx.strokeStyle = '#000';
//         ctx.lineWidth = thickness;
    
//         const { x, y } = getCanvasCenterCoordinates();
    
//         // Draw circle if diameter is provided
//         if (diameter) {
//           const radius = diameter / 2;
//           ctx.beginPath();
//           ctx.arc(x, y, radius, 0, 2 * Math.PI);
//           ctx.stroke();
//         }
    
//         // Draw rectangle if width and height are provided
//         if (width && height) {
//           ctx.beginPath();
//           ctx.rect(x - width / 2, y - height / 2, width, height); // Draw the rectangle centered on (x, y)
//           ctx.stroke();
//         }
//       }, [dimensions, canvasSize, center]); // Redraw when dimensions, canvas size, or center change
    
//     const [fileName, setFileName] = useState('');

//     const handleSubmit = () => {
//         console.log(dimensions, "check submit function called");

//         // Create a new object with only the values that are necessary
//         const dataToSubmit = {
//             diameter: dimensions.diameter,
//             width: dimensions.width,
//             height: dimensions.height,
//             material_thickness: dimensions.material_thickness,
//         };

//         if (dataToSubmit) {
//             onSubmit(dataToSubmit); // Send the data back to the parent (Dashboard)
//             // Reset the form fields after submission
//             setDimensions({
//                 diameter: '',
//                 width: '',
//                 height: '',
//                 material_thickness: ''
//             });
//         }
//     };
//     return (
//         <Components.Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: '1100px', maxWidth: '100%' } }}>
//             <Components.DialogTitle>New Model</Components.DialogTitle>
//             <div className="container d-flex">
//                 <div className="row">
//                     <Components.DialogContent dividers>
//                         {/* Type Section */}
//                         <Components.Box mb={1}>
//                             <Components.Typography variant="subtitle1" align="center" sx={{
//                                 backgroundColor: '#e0e7eb',
//                                 padding: '8px',
//                                 borderRadius: '4px',
//                                 fontWeight: 'bold'
//                             }}>Type</Components.Typography>
//                             <Components.RadioGroup row value={type} onChange={handleTypeChange}>
//                                 <Components.FormControlLabel value="flat" control={<Components.Radio />} label="Flat" />
//                                 <Components.FormControlLabel value="v_shaped" control={<Components.Radio />} label="V-Shaped" />
//                                 <Components.FormControlLabel value="half_round" control={<Components.Radio />} label="Half-Round" />
//                                 <Components.FormControlLabel value="pendant" control={<Components.Radio />} label="Pendant" />
//                             </Components.RadioGroup>
//                         </Components.Box>
//                         <Components.Box mb={1}>
//                             <Components.Typography variant="subtitle1" align="center" sx={{
//                                 backgroundColor: '#e0e7eb',
//                                 padding: '8px',
//                                 borderRadius: '4px',
//                                 fontWeight: 'bold'
//                             }}>Unit</Components.Typography>
//                             <Components.RadioGroup row value={Unittype} onChange={handleUnitTypeChange} sx={{
//                                 display: 'flex',
//                                 justifyContent: 'center' // Centers the FormControlLabels horizontally
//                             }}>
//                                 <Components.FormControlLabel value="mm" control={<Components.Radio />} label="MM" />
//                                 <Components.FormControlLabel value="inch" control={<Components.Radio />} label="Inch" />
//                             </Components.RadioGroup>
//                         </Components.Box>
//                         <Components.Box mb={1}>
//                             <Components.Typography variant="subtitle1" align="center" sx={{
//                                 backgroundColor: '#e0e7eb',
//                                 padding: '8px',
//                                 borderRadius: '4px',
//                                 fontWeight: 'bold'
//                             }}>Dimensions</Components.Typography>
//                             <div className='mt-2'>
//                                 <Components.TextField
//                                     label="Diameter"
//                                     name="diameter"
//                                     value={dimensions.diameter}
//                                     onChange={handleDimensionChange}
//                                     fullWidth
//                                     variant="standard"
//                                     disabled = {type == "pendant"}
//                                 />
//                             </div>
//                             <div className='mt-2'>
//                                 <Components.TextField
//                                     label="Width"
//                                     name="width"
//                                     value={dimensions.width}
//                                     onChange={handleDimensionChange}
//                                     fullWidth
//                                     variant="standard"
//                                 />
//                             </div>
//                             <div className='mt-2'>
//                                 <Components.TextField
//                                     label="Height"
//                                     name="height"
//                                     value={dimensions.height}
//                                     onChange={handleDimensionChange}
//                                     fullWidth
//                                     variant="standard"
//                                 />
//                             </div>
//                             <div className='mt-2'>
//                                 <Components.TextField
//                                     label="Material Thickness"
//                                     name="material_thickness"
//                                     value={dimensions.material_thickness}
//                                     onChange={handleDimensionChange}
//                                     fullWidth
//                                     variant="standard"
//                                 />
//                             </div>
//                         </Components.Box>
//                     </Components.DialogContent>
//                 </div>
//                 <div className="row">
//                     <Components.DialogContent dividers>
//                         <canvas
//                             ref={canvasRef}
//                             width={canvasSize.width}
//                             height={canvasSize.height}
//                         />
//                         <Components.Box mt={2}>
//                             <Components.Typography variant="subtitle1" align="center" sx={{
//                                 backgroundColor: '#e0e7eb',
//                                 padding: '8px',
//                                 borderRadius: '4px',
//                                 fontWeight: 'bold'
//                             }}>Select Center</Components.Typography>
//                             <Components.RadioGroup row value={center} onChange={handleCenterChange}>
//                                 <Components.FormControlLabel value="top_left" control={<Components.Radio />} label="Top Left" />
//                                 <Components.FormControlLabel value="center" control={<Components.Radio />} label="Center" />
//                                 <Components.FormControlLabel value="bottom_left" control={<Components.Radio />} label="Bottom Left" />
//                                 <Components.FormControlLabel value="top_right" control={<Components.Radio />} label="Top Right" />
//                                 <Components.FormControlLabel value="bottom_right" control={<Components.Radio />} label="Bottom Right" />
//                             </Components.RadioGroup>
//                         </Components.Box>
//                     </Components.DialogContent>
//                 </div>
//             </div>
//             <Components.DialogActions>
//                 <Button onClick={onClose} color="secondary">Cancel</Button>
//                 <Button onClick={handleSubmit} color="primary">Ok</Button>
//             </Components.DialogActions>
//         </Components.Dialog>
//     );
// };

// export default NewModel;

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Components from '../../../theme/master-file-material';

const NewModel = ({ open, onClose, onSubmit }) => {
    const canvasRef = useRef(null);
    const [type, setType] = useState('flat');
    const [Unittype, setUnitType] = useState('mm');
    const [dimensions, setDimensions] = useState({
        diameter: '', // Diameter will be calculated in the background, not displayed
        width: '',
        height: '',
        material_thickness: ''
    });
    const [center, setCenter] = useState('center');
    const [canvasSize, setCanvasSize] = useState({
        width: 400,
        height: 400
    });

    const handleTypeChange = (event) => setType(event.target.value);
    const handleUnitTypeChange = (event) => setUnitType(event.target.value);
    const handleCenterChange = (event) => setCenter(event.target.value);

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        setDimensions((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getCanvasCenterCoordinates = () => {
        const { width, height } = canvasSize;
        switch (center) {
            case 'top_left': return { x: 0, y: 0 };
            case 'top_right': return { x: width, y: 0 };
            case 'bottom_left': return { x: 0, y: height };
            case 'bottom_right': return { x: width, y: height };
            case 'center': 
            default: return { x: width / 2, y: height / 2 };
        }
    };
    const drawLShape = (ctx, x, y, size) => {
        // Draw a small L-shape
        ctx.beginPath();
        ctx.moveTo(x, y);  // Start at (x, y)
        ctx.lineTo(x, y + size);  // Vertical line down
        ctx.lineTo(x + size, y + size);  // Horizontal line to the right
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
    
        if (!canvas) return;
    
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
    
        // Set the new canvas dimensions
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
    
        // Clear the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const { width, height, material_thickness } = dimensions;
        const thickness = material_thickness || 2;
    
        // Set default styles
        ctx.strokeStyle = '#000';
        ctx.lineWidth = thickness;
    
        const { x, y } = getCanvasCenterCoordinates();
    
        // Draw rectangle if width and height are provided
        if (width && height) {
            ctx.beginPath();
            ctx.rect(x - width / 2, y - height / 2, width, height); // Draw the rectangle centered on (x, y)
            ctx.stroke();
        }
    }, [dimensions, canvasSize, center]); // Redraw when dimensions, canvas size, or center change

    const handleSubmit = () => {
        console.log(dimensions, "check submit function called");

        // Create a new object with only the values that are necessary
        const dataToSubmit = {
            diameter: dimensions.diameter,
            width: dimensions.width,
            height: dimensions.height,
            material_thickness: dimensions.material_thickness,
        };

        if (dataToSubmit) {
            onSubmit(dataToSubmit); // Send the data back to the parent (Dashboard)
            // Reset the form fields after submission
            setDimensions({
                diameter: '',
                width: '',
                height: '',
                material_thickness: ''
            });
        }
    };

    return (
        <Components.Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: '1100px', maxWidth: '100%' } }}>
            <Components.DialogTitle>New Model</Components.DialogTitle>
            <div className="container d-flex">
                <div className="row">
                    <Components.DialogContent dividers>
                        {/* Type Section */}
                        <Components.Box mb={1}>
                            <Components.Typography variant="subtitle1" align="center" sx={{
                                backgroundColor: '#e0e7eb',
                                padding: '8px',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>Type</Components.Typography>
                            <Components.RadioGroup row value={type} onChange={handleTypeChange}>
                                <Components.FormControlLabel value="flat" control={<Components.Radio />} label="Flat" />
                                <Components.FormControlLabel value="v_shaped" control={<Components.Radio />} label="V-Shaped" />
                                <Components.FormControlLabel value="half_round" control={<Components.Radio />} label="Half-Round" />
                                <Components.FormControlLabel value="pendant" control={<Components.Radio />} label="Pendant" />
                            </Components.RadioGroup>
                        </Components.Box>
                        <Components.Box mb={1}>
                            <Components.Typography variant="subtitle1" align="center" sx={{
                                backgroundColor: '#e0e7eb',
                                padding: '8px',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>Unit</Components.Typography>
                            <Components.RadioGroup row value={Unittype} onChange={handleUnitTypeChange} sx={{
                                display: 'flex',
                                justifyContent: 'center' // Centers the FormControlLabels horizontally
                            }}>
                                <Components.FormControlLabel value="mm" control={<Components.Radio />} label="MM" />
                                <Components.FormControlLabel value="inch" control={<Components.Radio />} label="Inch" />
                            </Components.RadioGroup>
                        </Components.Box>
                        <Components.Box mb={1}>
                            <Components.Typography variant="subtitle1" align="center" sx={{
                                backgroundColor: '#e0e7eb',
                                padding: '8px',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>Dimensions</Components.Typography>
                            <div className='mt-2'>
                                <Components.TextField
                                    label="Diameter"
                                    name="diameter"
                                    value={dimensions.diameter}
                                    onChange={handleDimensionChange}
                                    fullWidth
                                    variant="standard"
                                    disabled={type === "pendant"} // Disable input for pendant type
                                />
                            </div>
                            <div className='mt-2'>
                                <Components.TextField
                                    label="Width"
                                    name="width"
                                    value={dimensions.width}
                                    onChange={handleDimensionChange}
                                    fullWidth
                                    variant="standard"
                                />
                            </div>
                            <div className='mt-2'>
                                <Components.TextField
                                    label="Height"
                                    name="height"
                                    value={dimensions.height}
                                    onChange={handleDimensionChange}
                                    fullWidth
                                    variant="standard"
                                />
                            </div>
                            <div className='mt-2'>
                                <Components.TextField
                                    label="Material Thickness"
                                    name="material_thickness"
                                    value={dimensions.material_thickness}
                                    onChange={handleDimensionChange}
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
                            width={canvasSize.width}
                            height={canvasSize.height}
                        />
                        <Components.Box mt={2}>
                            <Components.Typography variant="subtitle1" align="center" sx={{
                                backgroundColor: '#e0e7eb',
                                padding: '8px',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>Select Center</Components.Typography>
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
                <Button onClick={handleSubmit} color="primary">Ok</Button>
            </Components.DialogActions>
        </Components.Dialog>
    );
};

export default NewModel;
