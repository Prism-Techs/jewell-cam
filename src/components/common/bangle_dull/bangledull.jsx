import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus, ZoomIn, ZoomOut } from 'lucide-react';
import Components from '../../../theme/master-file-material';

const BangleDullUI = ({ bangleWidth, bangleHeight, params, showMainUI, setShowMainUI }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;

  // Effect to draw the preview whenever the relevant dependencies change
  useEffect(() => {
    if (showMainUI) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      drawPreview(ctx);
    }
  }, [params, showMainUI, bangleWidth, bangleHeight, zoom, pan]); // Dependencies include params
  
  const drawPreview = (ctx) => {
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    const scaleFactor = Math.min(CANVAS_WIDTH / bangleWidth, CANVAS_HEIGHT / bangleHeight) / zoom;
    const scaledWidth = bangleWidth * scaleFactor;
    const scaledHeight = bangleHeight * scaleFactor;

    const startX = (CANVAS_WIDTH / zoom - scaledWidth) ;
    const startY = (CANVAS_HEIGHT / zoom - scaledHeight) ;

    const numDullsX = Math.floor(scaledWidth / (params.xPitch + params.xMargin));
    // const numDullsY = Math.floor(scaledHeight / (params.yPitch + params.yMargin));
    const numDullsY = 25
    
    // const dullWidth = params.xPitch * scaleFactor + 10;
    // const dullHeight = params.yPitch * scaleFactor +10 ;

    const dullWidth = 65 * 2;
    const dullHeight = 5 * 2 ;

    // Draw the bangle outline
    ctx.lineWidth = 2 / zoom;
    ctx.strokeRect(startX, startY, scaledWidth, scaledHeight);

    // Draw the dull pattern
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < numDullsY; j++) {
        console.log(params.xPitch);
        
        const x = startX + i * (dullWidth + params.xMargin * scaleFactor);
        const y = startY + j * (dullHeight + params.yMargin * scaleFactor);

        ctx.save();
        ctx.translate(x + dullWidth / 2, y + dullHeight / 2);
        ctx.rotate(params.angleOfCutLines * Math.PI / 180);

        // Draw the top half (gold)
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.ellipse(0, 0, dullWidth / 2, dullHeight / 2, 0, -Math.PI, 0);
        ctx.fill();
        
        // Draw the bottom half (yellow)
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.ellipse(0, 0, dullWidth / 2, dullHeight / 2, 0, 0, Math.PI);
        ctx.fill();

        ctx.restore();
      }
    }

    ctx.restore();
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 10));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.1));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    // e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.1), 10));
  };

  return (
    <Components.Card className="w-full max-w-7xl mx-auto">
      <Components.CardHeader>Bangle Dull Making UI</Components.CardHeader>
      <Components.CardContent className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 space-y-4 overflow-y-auto max-h-[600px]">

          {/* {!showMainUI ? (
            <Components.Button onClick={() => setShowMainUI(true)}>Submit</Components.Button>
          ) : (
            <div className="flex space-x-2">
              <Components.Button>Preview</Components.Button>
              <Components.Button>Generate Code</Components.Button>
              <Components.Button>Export</Components.Button>
              <Components.Button>Import</Components.Button>
            </div>
          )} */}

        </div>
        {showMainUI && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="mb-2 flex space-x-2">
               {/* <Components.Button onClick={handleZoomOut}><ZoomOut size={16} /></Components.Button>
              <Components.Button onClick={handleZoomIn}><ZoomIn size={16} /></Components.Button> */}
            </div>
            <div
              style={{
                width: `${CANVAS_WIDTH}px`,
                height: `${CANVAS_HEIGHT}px`,
                overflow: 'hidden',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
            </div>
          </div>
        )}
      </Components.CardContent>
    </Components.Card>
  );
};

export default BangleDullUI;

// import React, { useState, useEffect, useRef } from 'react';
// import { Plus, Minus, ZoomIn, ZoomOut } from 'lucide-react';
// import Components from '../../../theme/master-file-material';

// const BangleDullUI = ({ bangleWidth, bangleHeight, params, showMainUI, setShowMainUI }) => {
//   const [zoom, setZoom] = useState(1);
//   const [pan, setPan] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

//   const canvasRef = useRef(null);
//   const CANVAS_WIDTH = 800;
//   const CANVAS_HEIGHT = 600;

//   // Effect to draw the preview whenever the relevant dependencies change
//   useEffect(() => {
//     if (showMainUI) {
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');
//       drawPreview(ctx);
//     }
//   }, [params, showMainUI, bangleWidth, bangleHeight, zoom, pan]); // Dependencies include params
  
//   const drawPreview = (ctx) => {
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     ctx.fillStyle = 'black';
//     ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//     ctx.save();
//     ctx.translate(pan.x, pan.y);
//     ctx.scale(zoom, zoom);

//     const scaleFactor = Math.min(CANVAS_WIDTH / bangleWidth, CANVAS_HEIGHT / bangleHeight) / zoom;
//     const scaledWidth = bangleWidth * scaleFactor;
//     const scaledHeight = bangleHeight * scaleFactor;

//     const startX = (CANVAS_WIDTH / zoom - scaledWidth);
//     const startY = (CANVAS_HEIGHT / zoom - scaledHeight);

//     const numDullsX = Math.floor(scaledWidth / (params.xPitch + params.xMargin));
//     const numDullsY = Math.floor(scaledHeight / (params.yPitch + params.yMargin));

//     const dullWidth = params.xPitch * scaleFactor + 10;
//     const dullHeight = params.yPitch * scaleFactor + 10;

//     // Draw the bangle outline
//     ctx.lineWidth = 2 / zoom;
//     ctx.strokeRect(startX, startY, scaledWidth, scaledHeight);

//     // Draw the dull pattern using half-moon arcs
//     for (let i = 0; i < 10; i++) {
//       for (let j = 0; j < numDullsY; j++) {
//         const x = startX + i * (dullWidth + params.xMargin * scaleFactor);
//         const y = startY + j * (dullHeight + params.yMargin * scaleFactor);
        
//         ctx.save();
//         ctx.translate(x + dullWidth / 2, y + dullHeight / 2);
//         ctx.rotate(params.angleOfCutLines * Math.PI / 180);

//         // Draw the top half (gold) using an arc for the half-moon
//         ctx.fillStyle = 'gold';
//         ctx.beginPath();
//         ctx.arc(0, 0, dullWidth / 2, Math.PI, 2 * Math.PI);  // Top arc (half-moon)
//         ctx.fill();

//         // Draw the bottom half (yellow) using another arc for the other half
//         ctx.fillStyle = 'yellow';
//         ctx.beginPath();
//         ctx.arc(0, 0, dullWidth / 2, 0, Math.PI);  // Bottom arc (half-moon)
//         ctx.fill();

//         ctx.restore();
//       }
//     }

//     ctx.restore();
//   };

//   const handleZoomIn = () => {
//     setZoom(prev => Math.min(prev * 1.2, 10));
//   };

//   const handleZoomOut = () => {
//     setZoom(prev => Math.max(prev / 1.2, 0.1));
//   };

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       setPan({
//         x: e.clientX - dragStart.x,
//         y: e.clientY - dragStart.y
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleWheel = (e) => {
//     e.preventDefault();
//     const delta = e.deltaY > 0 ? 0.9 : 1.1;
//     setZoom(prev => Math.min(Math.max(prev * delta, 0.1), 10));
//   };

//   return (
//     <Components.Card className="w-full max-w-7xl mx-auto">
//       <Components.CardHeader>Bangle Dull Making UI</Components.CardHeader>
//       <Components.CardContent className="flex flex-col lg:flex-row gap-4">
//         <div className="flex-1 space-y-4 overflow-y-auto max-h-[600px]"></div>
//         {showMainUI && (
//           <div className="flex-1 flex flex-col items-center justify-center">
//             <div className="mb-2 flex space-x-2"></div>
//             <div
//               style={{
//                 width: `${CANVAS_WIDTH}px`,
//                 height: `${CANVAS_HEIGHT}px`,
//                 overflow: 'hidden',
//                 cursor: isDragging ? 'grabbing' : 'grab'
//               }}
//               onMouseDown={handleMouseDown}
//               onMouseMove={handleMouseMove}
//               onMouseUp={handleMouseUp}
//               onMouseLeave={handleMouseUp}
//               onWheel={handleWheel}
//             >
//               <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
//             </div>
//           </div>
//         )}
//       </Components.CardContent>
//     </Components.Card>
//   );
// };

// export default BangleDullUI;
