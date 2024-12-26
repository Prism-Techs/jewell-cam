import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";

const FileCreator = forwardRef(({ dashboardData }, ref) => {   
    const [fileContent, setFileContent] = useState([]);

    useEffect(() => {
        if (dashboardData) {
            const { canvas_img, ...restOfDashboardData } = dashboardData;
            const updatedata = {
                ...restOfDashboardData,
                design_name: dashboardData.design_name,   
            }
            
            const formattedContent = `A ${dashboardData.design_name} - 22-12-2024\n`;
            setFileContent(formattedContent);
        // const newContent = JSON.stringify(updatedata, null, 2);
        // setFileContent(newContent);
        }
    }, [dashboardData]);


    const appendDataToFile = (newData) => {
        setFileContent((prevContent) => prevContent + newData + "\n");
    };

    
    const createFile = () => {
        const blob = new Blob([fileContent], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "myFile.stp";
        a.click();
        window.URL.revokeObjectURL(url);
        setFileContent("");
        localStorage.removeItem("fileContent");
    };

    useImperativeHandle(ref, () => ({
        appendDataToFile,
        createFile
    }));

    return (
        <div>
        </div>
    );
});

export default FileCreator;
