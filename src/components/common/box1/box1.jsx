import React from "react";

const Box1 = ({ handleIconClick, activeIcon }) => {
    return (
        <div className="box1">
            <div
                className={`icon ${activeIcon === "Wall Dull" ? "active" : ""}`}
                onClick={() => handleIconClick("Wall Dull")}
            >
                Wall
            </div>
            <div
                className={`icon ${activeIcon === "Long Dull" ? "active" : ""}`}
                onClick={() => handleIconClick("Long Dull")}
            >
                Long
            </div>
            <div
                className={`icon ${activeIcon === "Spiral Dull" ? "active" : ""}`}
                onClick={() => handleIconClick("Spiral Dull")}
            >
                Spiral
            </div>
            <div
                className={`icon ${activeIcon === "Box Dull" ? "active" : ""}`}
                onClick={() => handleIconClick("Box Dull")}
            >
                Box
            </div>
        </div>
    );
};

export default Box1;
