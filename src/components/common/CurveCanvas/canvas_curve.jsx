import React, { useRef, useEffect } from "react";

const CurveCanvasComponent = ({ width, height, curve_path }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const rectX = canvas.width / 2 - width / 2;
        const rectY = canvas.height / 2 - height / 2;
        
        ctx.strokeStyle = '#fff'; // Set the border color (white)
        ctx.lineWidth = 1;           // Set the border width
        ctx.strokeRect(rectX, rectY, width, height); // Draw the rectangle border

        if (curve_path === "C") {
            const centerX = rectX + parseInt(width);
            const centerY = rectY + height / 2;
            
            const radiusX = width;  // Ellipse radius for X-axis
            const radiusY = height / 2; // Ellipse radius for Y-axis
   
            ctx.beginPath();
            ctx.ellipse(
                centerX,          // X-coordinate of the center
                centerY,          // Y-coordinate of the center
                radiusX,          // Radius along the X-axis
                radiusY,          // Radius along the Y-axis
                0,                // Rotation angle (no rotation)
                Math.PI * 0.5,    // Start angle (angle of the opening at top-left)
                Math.PI * 1.5,    // End angle (angle of the opening at bottom-left)
                false             // Counterclockwise direction
            );

            // Draw the ellipse outline with a border
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 1.5;
            ctx.stroke();

        } else if (curve_path === "S"){
            const centerX1 = rectX + parseInt(width);
            const centerY1 = rectY + (parseInt(height) / 4) * 1.07;
            
            const radiusX1 = width ;  
            const radiusY1 = (height / 4) * 1.07; 
   
            ctx.beginPath();
            ctx.ellipse(
                centerX1,      
                centerY1,      
                radiusX1,      
                radiusY1,      
                0,            
                Math.PI * 0.66,
                Math.PI * 1.5,
                false         
            );

            ctx.strokeStyle = 'yellow'; 
            ctx.lineWidth = 1.5;
            ctx.stroke();

            const centerX2 = rectX;
            const centerY2 = rectY + (parseInt(height) / 4 * 3) *0.975;
            
            const radiusX2 = width;  // Ellipse radius for X-axis
            const radiusY2 = (height / 4) * 1.07; // Ellipse radius for Y-axis
   
            ctx.beginPath();
            ctx.ellipse(
                centerX2,          // X-coordinate of the center
                centerY2,          // Y-coordinate of the center
                radiusX2,          // Radius along the X-axis
                radiusY2,          // Radius along the Y-axis
                0,                // Rotation angle (no rotation)
                Math.PI * 1.67,    // Start angle (angle of the opening at top-left)
                Math.PI * 0.5,    // End angle (angle of the opening at bottom-left)
                false             // Counterclockwise direction
            );

            // Draw the ellipse outline with a border
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
        }
    }, [width, height, curve_path]);

    return (
        <canvas
            ref={canvasRef}
            width={60}  // Fixed canvas width
            height={100} // Fixed canvas height
            style={{ background: '#000', borderRadius: "4px" }}
        />
    );
};

export default CurveCanvasComponent;
