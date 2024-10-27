import React, { useRef, useEffect } from 'react';
import * as math from 'mathjs'

const ArcCanvas = () => {
  const canvasRef = useRef(null);
  const RADIAN = 0.017460317
  const toRadians = (angle) => {
    return angle * RADIAN;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const context2 = canvas.getContext('2d');
    const scale = 50
    const tool_dia = 10
    const cut_depth = 0.2
    const tool_angle = 120
    const cut_angle1 = 0
    const cut_angle= 180-cut_angle1
    const cut_x = 150; 
    const cut_y = 150;
    const R=tool_dia/2
    const H1 = R-cut_depth
    const L = Math.sqrt(R*R-H1*H1);
    const cut_length = 2*L
    
    const radius = 70;
    
    const cut_width = cut_depth*Math.tan((tool_angle/2)*Math.PI/180)*2
    const A = cut_length/2
    const H = cut_width/2
    console.log('A, H', A, H)
    const radius_arc1 = (A*A+H*H)/cut_width
    const radius_arc = radius_arc1*scale
    const theta1R = Math.acos(A/radius_arc1)
    const theta1D = theta1R*180*7/22
    const theta = 90-theta1D
    const startAngle = ((cut_angle+90-theta) * Math.PI / 180); // Convert to radians
    const endAngle = ((cut_angle+90+theta)* Math.PI / 180); // Convert to radians
    const startAngle1 = ((cut_angle+90-theta+180) * Math.PI / 180); // Convert to radians
    const endAngle1 = ((cut_angle+90+theta+180)* Math.PI / 180); // Convert to radians
    const xOff_center_arc = Math.cos(toRadians(90-cut_angle))*(radius_arc1-cut_width/2)*scale
    
    const yOff_center_arc = Math.sin(toRadians(90-cut_angle))*(radius_arc1-cut_width/2)*scale
    console.log('Offset ', xOff_center_arc,yOff_center_arc)
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    context.beginPath();
    context.arc(cut_x+xOff_center_arc, cut_y-yOff_center_arc, radius_arc, startAngle, endAngle, false);
    //context.arc(cut_x, cut_y, radius_arc, startAngle, endAngle, false);
    context.fillStyle = '#ebd04d';
    context.fill();

    // Second arc (right)
    context2.beginPath();
    context2.arc(cut_x-xOff_center_arc, cut_y+yOff_center_arc, radius_arc, startAngle1, endAngle1, false);
    //context2.arc(cut_x, cut_y, radius_arc, startAngle1, endAngle1, false);
    context2.fillStyle = '#c4a506';
    context2.fill();
  }, []);
  
  return (
    <canvas ref={canvasRef} width={300} height={700} style={{ border: '1px solid black' }} />
  );
};

export default ArcCanvas;
 