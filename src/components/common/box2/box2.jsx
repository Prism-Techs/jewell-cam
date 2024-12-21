import React, { useState, useEffect } from "react";
import Components from "../../../theme/master-file-material";
import ImagePopover from "../popover/ImagePopover";
import theme from "../../../theme/theme";
import { get_dull_master, get_patterns } from "../../../services/dull-services/dull-services";
const Box2 = ({ onDullIdSelect ,multipassData, handleImageClick}) => {
    const [patterns, setPatterns] = useState([]);
    const [storedData, setStoredData] = useState([]);
    const [activeIcon, setActiveIcon] = useState(null); // Track active icon
    const [activeName, setActiveName] = useState(null); // Track active icon
    

    useEffect(() => {
        get_dull_master().then((response) => {
        if (response && response.data) {
            setPatterns(response.data); // Extract the data from response.data
        }
        }).catch((error) => {
        console.error("Error fetching data:", error);
        });
    }, []);

    const handleDullClick = (dull_id, dull_type) => {
        setActiveIcon(dull_id);
        setActiveName(dull_type);
        get_patterns(dull_id)
        .then((response) => {            
            if (response && response.data) {
            setStoredData(response.data); 
            }
        })
        .catch((error) => {
            console.error("Error fetching patterns data:", error);
        });
        if (onDullIdSelect) {
            onDullIdSelect(dull_id,dull_type);
        }
    };
    // console.log(patterns);
    
    return (
        <>
        <div className="box1">
            {patterns.length > 0 &&
            patterns.map((pattern, index) => (
                <div
                key={index}
                className={`icon ${activeIcon === pattern.dull_id ? "active" : ""}`}
                onClick={() => handleDullClick(pattern.dull_id, pattern.dull_type)}
                >
                {pattern.dull_type}
                </div>
            ))}
        </div>
        <div className="box2">
            <div className="right-div">
                <div className="d-flex justify-content-center"style={{ background: theme.palette.light_background, fontWeight: "bold", fontSize:"12px" }} >
                Pattern Library : {activeName}
                </div>
            {/* <Components.Typography
                align="center"
                gutterBottom
                sx={{ background: theme.palette.light_background, fontWeight: "bold" }}
            >
                Pattern Library : {activeName}
            </Components.Typography> */}
            </div>

            <div className="row">
            {storedData.length > 0 &&
                storedData.map((dataItem, index) => (
                <ImagePopover
                    key={index}
                    dataItem={dataItem}
                    index={index}
                    onImageClick={handleImageClick}
                />
                ))}
            </div>
        </div>
        </>
    );
};

export default Box2;
