// Box2.jsx
import React from "react";
import Components from "../../../theme/master-file-material";
import ImagePopover from "../popover/ImagePopover";
const Box2 = ({ storedData, handleImageClick }) => {
  return (
    <div className="box2">
      <div className="right-div">
        <Components.Typography
          align="center"
          gutterBottom
          sx={{ background: "#bed2e7", fontWeight: "bold" }}
        >
          Pattern Library
        </Components.Typography>
      </div>

      <div className="row">
        {storedData.length > 0 &&
          storedData.map((dataItem, index) => (
            <ImagePopover
              key={index}
              dataItem={dataItem}
              index={index}
              onImageClick={handleImageClick} // Pass the click handler as a prop
            />
          ))}
      </div>
    </div>
  );
};

export default Box2;
