import React from 'react';
import { Ellipse } from 'react-konva';

const EllipsePattern = ({ params,scale  }) => {
    const { 
        x_pitch, 
        x_margin, 
        no_of_cuts, 
        long_cut_angle, 
        tool_gap, 
        tabWidth, 
        tabHeight 
    } = params;

    const ellipses = [];

    for (let i = 0; i < no_of_cuts; i++) {
        const xPosition = x_margin + (i * x_pitch);  // Adjust x position based on margin and pitch
        const yPosition = tabHeight / 2;  // Center the ellipses vertically

        if (xPosition < tabWidth) {  // Ensure ellipses are within the tab width
            ellipses.push(
                <Ellipse
                    key={i}
                    x={xPosition}
                    y={yPosition}
                    radiusX={x_pitch / 2}  // Keep radiusX as is
                    radiusY={tool_gap}     // Keep radiusY as is
                    rotation={long_cut_angle}  // Apply rotation
                    fill="gold"
                    stroke="black"
                    strokeWidth={1}
                />
            );
        }
    }

    return <>{ellipses}</>;
};

export default EllipsePattern;
