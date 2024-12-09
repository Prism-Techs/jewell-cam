import React, { useRef, useEffect } from 'react';

const PatternArcCanvas = ({ params }) => {
  const canvasRef = useRef(null);
  const RADIAN = 0.017460317; // Constant to convert degrees to radians

  // Convert degree to radians
  const toRadians = (angle) => angle * RADIAN;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Function to draw the arcs
    const drawArcs = () => {
      // Clear the canvas before drawing
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Extract values from params
      const tool_dia = parseInt(params.tool_dia); // tool diameter
      const cut_depth = params.multipass[0].cut_depth;
      const tool_angle = params.tool_v_angle;
      const cut_angle1 = params.multipass[0].cut_angle1;
      const cut_angle = 180 - cut_angle1; // Cut angle calculation
      const cut_x = 150; // X-coordinate for the center of the arc
      const cut_y = 150; // Y-coordinate for the center of the arc
      const R = tool_dia / 2; // Tool radius
      const H1 = R - cut_depth; // Height of the cut
      const L = Math.sqrt(R * R - H1 * H1); // Length of the cut
      const cut_length = 2 * L; // Cut length
      const cut_width = cut_depth * Math.tan((tool_angle / 2) * Math.PI / 180) * 2; // Cut width
      const A = cut_length / 2; // Half cut length
      const H = cut_width / 2; // Half cut width
      const radius_arc1 = (A * A + H * H) / cut_width; // Arc radius
      const radius_arc = radius_arc1 * 50; // Scale the radius
      const theta1R = Math.acos(A / radius_arc1); // Angle for the arc
      const theta1D = theta1R * 180 * 7 / 22; // Angle in degrees
      const theta = 90 - theta1D; // Angle offset for arcs
      const startAngle = (cut_angle + 90 - theta) * Math.PI / 180;
      const endAngle = (cut_angle + 90 + theta) * Math.PI / 180;
      const startAngle1 = (cut_angle + 90 - theta + 180) * Math.PI / 180;
      const endAngle1 = (cut_angle + 90 + theta + 180) * Math.PI / 180;
      const xOff_center_arc = Math.cos(toRadians(90 - cut_angle)) * (radius_arc1 - cut_width / 2) * 50;
      const yOff_center_arc = Math.sin(toRadians(90 - cut_angle)) * (radius_arc1 - cut_width / 2) * 50;

      // Apply transformation (no panning or zooming)
      context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform

      // Draw the first arc
      context.beginPath();
      context.arc(cut_x + xOff_center_arc, cut_y - yOff_center_arc, radius_arc, startAngle, endAngle, false);
      context.fillStyle = '#ebd04d';
      context.fill();

      // Draw the second arc
      context.beginPath();
      context.arc(cut_x - xOff_center_arc, cut_y + yOff_center_arc, radius_arc, startAngle1, endAngle1, false);
      context.fillStyle = '#c4a506';
      context.fill();
    };

    // Draw the arcs on initial render or when parameters change
    drawArcs();
  }, [params]); // Re-run when params change

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      style={{ border: '1px solid black', background: '#000000' }}
    />
  );
};

export default PatternArcCanvas;
