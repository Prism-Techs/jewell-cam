import React, { useRef, useEffect, useState } from 'react';
import * as math from 'mathjs';

const ArcCanvas = ({ params, localCoordinates, setLocalCoordinates, SetcanvasImg }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const RADIAN = 0.017460317;
    const bangle_postion = params.position
    
    // Scale bangle dimensions by 2.9
    const BangleWidthWithout_29 = params.bangle_width
    const BangleHeightWithout_29 = params.bangle_height
    const BangleWidth_29 = BangleWidthWithout_29 * 2.9;
    const BangleHeight_29 = BangleHeightWithout_29 * 2.9;
    const FIXED_CANVAS_HEIGHT = 610; // Fixed canvas viewport height
    const CANVAS_WIDTH = 700;
    const [canvasScale, setCanvasScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    // const XmarginWith_29 = params.multipass[0].xmargin * 2.9
    const XmarginWithout_29 = params.xmargin
    const XmarginWith_29 = XmarginWithout_29 * 2.9
    const GlobalMultipass = params.multipass
    // const [localCoordinates, setLocalCoordinates] = useState({ x: 0, y: 0 });
    const toRadians = (angle) => angle * RADIAN;

    // Draw rectangle and margin lines based on bangle dimensions
    const drawRectangleAndMargins = (context, transformState) => {
        // Save current context state
        context.save();

        // Center the rectangle in the canvas
        const centerX = (CANVAS_WIDTH - BangleWidth_29) / 2;
        const centerY = (FIXED_CANVAS_HEIGHT - BangleHeight_29) / 2;

        // Apply transformations
        context.setTransform(
            transformState.scale,
            0,
            0,
            transformState.scale,
            transformState.translate.x,
            transformState.translate.y
        );

        // Set crisp lines
        context.imageSmoothingEnabled = false;
        context.lineWidth = 1 / transformState.scale;

        // Draw main rectangle
        context.beginPath();
        context.rect(
            Math.round(centerX) + 0.5,
            Math.round(centerY) + 0.5,
            Math.round(BangleWidth_29),
            Math.round(BangleHeight_29)
        );
        context.strokeStyle = '#ffffff';
        context.stroke();

        // context.fillStyle = '#fff';
        // context.fill(); 

        // Draw margin lines if x_margin is provided in params
        if (XmarginWithout_29) {
            const marginDistance = XmarginWith_29;

            // Left margin line - outside the rectangle
            context.beginPath();
            context.moveTo(
                Math.round(centerX - marginDistance) + 0.5,
                Math.round(centerY) + 0.5
            );
            context.lineTo(
                Math.round(centerX - marginDistance) + 0.5,
                Math.round(centerY + BangleHeight_29) + 0.5
            );
            context.strokeStyle = '#ffffff'; // Red color for margin lines
            context.stroke();

            // Right margin line - outside the rectangle
            context.beginPath();
            context.moveTo(
                Math.round(centerX + BangleWidth_29 + marginDistance) + 0.5,
                Math.round(centerY) + 0.5
            );
            context.lineTo(
                Math.round(centerX + BangleWidth_29 + marginDistance) + 0.5,
                Math.round(centerY + BangleHeight_29) + 0.5
            );
            context.stroke();

            // Draw horizontal lines to show the gap
            context.setLineDash([2, 2]); // Dashed line

            // Left gap line
            context.beginPath();
            context.moveTo(Math.round(centerX - marginDistance) + 0.5, centerY + BangleHeight_29 / 2);
            context.lineTo(Math.round(centerX) + 0.5, centerY + BangleHeight_29 / 2);
            context.stroke();

            // Right gap line
            context.beginPath();
            context.moveTo(Math.round(centerX + BangleWidth_29) + 0.5, centerY + BangleHeight_29 / 2);
            context.lineTo(Math.round(centerX + BangleWidth_29 + marginDistance) + 0.5, centerY + BangleHeight_29 / 2);
            context.stroke();

            // Reset line dash
            context.setLineDash([]);
        }
        // Restore context state
        context.restore();
    };
 
    const drawArcs = (context, scale, params, transformState) => {
        const {
            tool_dia = params.tool_dia,
            tool_v_angle = params.tool_v_angle,
            multipass = [],
        } = params;
    
        // Loop through each layer in multipass array
        multipass.forEach((layer) => {
            const cut_depth = parseFloat(layer.cut_depth);
            const cut_angle1 = parseFloat(layer.cut_angle1);
            const xpitch = parseFloat(layer.xpitch);
            const xmargin = parseFloat(layer.xmargin);
            const no_of_cuts = parseInt(layer.no_of_cuts, 10);
            const long_cut_angle = parseFloat(layer.long_angle);
            const theme_light = layer.theme_color_light
            const theme_dark = layer.theme_color_dark
            const X_Shift = layer.x_shift_start * 2.9
            const Y_Shift = layer.y_shift_start * 2.9
            const CurvePath = layer.curve_path
            const CurvePathHeight = layer.curve_path_height
            const CurvePathWidth = layer.curve_path_width
            const Boxes_y = layer.curve_y 
            const cut_angle = 180 - cut_angle1;
            let Rx = 1;
            let Ry = 1;
            let Dy = Ry*2
            let Y1 = 0
            let Y2 = 0
            let Y3 = 0
            let X1 = 0
            let X2 = 0
            let cut_x1 = 0
            
            let cut_x_start = CANVAS_WIDTH / 2 - BangleWidth_29 / 2 - XmarginWith_29;
            let cut_y_start = FIXED_CANVAS_HEIGHT / 2 + BangleHeight_29 / 2;
    
            // Calculate dimensions
            const R = tool_dia / 2;
            const H1 = R - cut_depth;
            const L = Math.sqrt(R * R - H1 * H1);
            const cut_length = 2 * L;
            const cut_width = cut_depth * Math.tan((tool_v_angle / 2) * Math.PI / 180) * 2;
            const A = cut_length / 2;
            const H = cut_width / 2;
    
            // Calculate arc properties
            const radius_arc1 = (A * A + H * H) / cut_width;
            const radius_arc = radius_arc1 * scale;
            const theta1R = Math.acos(A / radius_arc1);
            const theta1D = theta1R * 180 * 7 / 22;
            const theta = 90 - theta1D;
    
            // Calculate angles
            const startAngle = toRadians(cut_angle + 90 - theta);
            const endAngle = toRadians(cut_angle + 90 + theta);
            const startAngle1 = toRadians(cut_angle + 90 - theta + 180);
            const endAngle1 = toRadians(cut_angle + 90 + theta + 180);
    
            // Loop to draw multiple arcs with increasing offset
            const XPitchWith_29 = xpitch * 2.9;
            // let y_increment = BangleHeight_29 / no_of_cuts;
            const theta_R = long_cut_angle * (Math.PI / 180);
                       
            let y_increment = XPitchWith_29 * math.tan(theta_R)
            let x_start_offset = XPitchWith_29 / 2;
            let no_cuts_w = (parseInt(BangleWidthWithout_29) + (2 * parseInt(XmarginWithout_29))) / xpitch;
   
            let cut_x = cut_x_start + X_Shift;
            let cut_y = cut_y_start - Y_Shift;
                
            for (let j = 0; j < no_cuts_w * 1 + 1; j++) {  
                
                
                for (let i = 0; i < no_of_cuts-1; i++) {  
    
                    const xOff = Math.cos(toRadians(90 - cut_angle)) * (radius_arc1 - cut_width / 2) * scale;
                    const yOff = Math.sin(toRadians(90 - cut_angle)) * (radius_arc1 - cut_width / 2) * scale;
    
                    context.save();
                    context.setTransform(
                        transformState.scale,
                        0,
                        0,
                        transformState.scale,
                        transformState.translate.x,
                        transformState.translate.y
                    );

                    // Draw first arc (top-left)
                    
                    context.beginPath();
                    context.arc(cut_x + xOff, cut_y - yOff, radius_arc, startAngle, endAngle, false);
                    context.fillStyle = theme_light;
                    context.fill();
    
                    context.beginPath();
                    context.arc(cut_x - xOff, cut_y + yOff, radius_arc, startAngle + Math.PI, endAngle + Math.PI, false);
                    context.fillStyle = theme_dark;
                    context.fill();
                    context.restore();
                    
                    if (CurvePath =='C') {
                        Ry=BangleHeightWithout_29/2/Boxes_y;
                        Dy=Ry*2
                        Rx = Ry/CurvePathHeight*CurvePathWidth
                        Y1 = i*(BangleHeightWithout_29)/no_of_cuts;
                        Y3 = Y1 - Dy * Math.floor(Y1/ Dy)
                        Y2 = Y3*(-1)+(BangleHeightWithout_29/2/Boxes_y);
                        
                        X1 = (Rx*Rx)*(1-(Y2*Y2)/(Ry*Ry));
                        X2 = Math.sqrt(X1);
                        cut_x = cut_x_start-X2*2.9 + XPitchWith_29*j;
                       
                    }
                    if (CurvePath =='Spiral') {
                        cut_x += XPitchWith_29/no_of_cuts;
                    }

                    cut_y -= (BangleHeight_29+y_increment)/no_of_cuts;
                    if (cut_y < (cut_y_start-BangleHeight_29)) {
                        cut_y = cut_y + BangleHeight_29;
                    }
                    // console.log("curve path", CurvePath, 'Y1=', Y1,"Y3=", math.abs(Y1/ Dy), "Dy=", Dy)
                }
                if (CurvePath =='Straight') {
                    cut_x += XPitchWith_29;
                }
                if (CurvePath =='C') {
                    cut_x += XPitchWith_29;
                }
                if (CurvePath =='S') {
                    cut_x += XPitchWith_29;
                                  
                }
               
            }
        });
    };
    
    const getMousePos = (canvas, event) => {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) / canvasScale - translate.x / canvasScale,
            y: (event.clientY - rect.top) / canvasScale - translate.y / canvasScale
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Set high-quality rendering
        context.imageSmoothingEnabled = false;

        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw rectangle and margins first
        drawRectangleAndMargins(context, {
            scale: canvasScale,
            translate: translate
        });

        // Then draw arcs
        drawArcs(context, 2.9, { ...params, GlobalMultipass}, {
            scale: canvasScale,
            translate: translate
        });

        const cropX = 0;
        const cropY = 0;
        const cropWidth = canvas.width;  // Adjust these to control the cropped size
        const cropHeight = 750;          // Set the height you want to crop (e.g., 500px)

        // Create a new offscreen canvas for the cropped area
        const offscreenCanvas = document.createElement('canvas');
        const offscreenContext = offscreenCanvas.getContext('2d');

        // Set the size of the offscreen canvas to the size of the cropped area
        offscreenCanvas.width = cropWidth;
        offscreenCanvas.height = cropHeight;

        // Draw the cropped area of the original canvas to the offscreen canvas
        offscreenContext.drawImage(canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        // Generate the image URL from the cropped canvas
        const croppedImageUrl = offscreenCanvas.toDataURL('image/png');
        SetcanvasImg(croppedImageUrl);  // Store the cropped image URL

    }, [SetcanvasImg,params, canvasScale, translate]);

    // Enhanced zoom handling with cursor as reference point
    const handleWheel = (event) => {
        event.preventDefault();
        const canvas = canvasRef.current;
        const mousePos = getMousePos(canvas, event);
        
        const scaleAmount = event.shiftKey ? 0.5 : 0.1;;
        const newScale = event.deltaY < 0
            ? Math.min(canvasScale + scaleAmount, 15)
            : Math.max(canvasScale - scaleAmount, 0.9);

        if (newScale !== canvasScale) {
            const scaleDiff = newScale - canvasScale;

            const newTranslate = {
                x: translate.x - mousePos.x * scaleDiff,
                y: translate.y - mousePos.y * scaleDiff
            };

            setCanvasScale(newScale);
            setTranslate(newTranslate);
        }
    };

    // Pan handling
    const handleMouseDown = (event) => {
        setIsDragging(true);
        setLastMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event) => {
        const canvas = canvasRef.current;
        const mousePos = getMousePos(canvas, event);

        const centerX = (700 - BangleWidth_29) / 2;
        const centerY = (610 - BangleHeight_29) / 2;
        const Position = params.position;
        const width = BangleWidthWithout_29 || 0;
        const height = BangleHeightWithout_29 || 0;
        // Check if the mouse is inside the rectangle
        if (
            mousePos.x >= centerX && mousePos.x <= centerX + BangleWidth_29 &&
            mousePos.y >= centerY && mousePos.y <= centerY + BangleHeight_29
        ) {
            // Calculate the local coordinates relative to the rectangle's top-left corner
            let localX = mousePos.x - centerX;
            let localY = mousePos.y - centerY;
            let Xdisp = localX / 2.9
            let Ydisp = localY / 2.9

            // this case for check my x and y based on Zero position
            switch (Position) {
                case "top_left":
                    Ydisp = localY / 2.9 * (-1);
                    break;
                case "top_right":
                    Xdisp = localX / 2.9 - width;
                    Ydisp = localY / 2.9 * (-1);
                    break;
                case "bottom_right":
                    Xdisp = localX / 2.9 - width;
                    Ydisp = height - localY / 2.9;
                    break;
                case "bottom_left":
                    Ydisp = height - localY / 2.9;
                    break;
                case "center":
                    Xdisp = localX / 2.9 - width / 2;
                    Ydisp = (localY / 2.9 - height / 2) * (-1);
                    break;
                default:
                    break;
            }
            // You can add additional cases for other positions (e.g., "bottom_left", "top_left") if needed

            setLocalCoordinates({ x: Xdisp, y: Ydisp });
        } else {
            setLocalCoordinates({ x: 0.00, y: 0.00 }); // Mouse is outside the rectangle
        }

        if (isDragging) {
            const dx = event.clientX - lastMousePos.x;
            const dy = event.clientY - lastMousePos.y;

            setTranslate(prev => ({
                x: prev.x + dx,
                y: prev.y + dy
            }));

            setLastMousePos({ x: event.clientX, y: event.clientY });
        }
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    return (

        <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={FIXED_CANVAS_HEIGHT}
            // width={700}
            // height={610}
            style={{
                border: '1px solid black',
                background: "#000000",
                // cursor: isDragging ? 'grabbing' : 'pointer'
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        />

    );
};

export default ArcCanvas;

