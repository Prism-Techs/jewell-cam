import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";

const FileCreator = forwardRef(({ dashboardData }, ref) => {   
    const [fileContent, setFileContent] = useState(() => {
        return localStorage.getItem("fileContent") || "Initial content\n";
    });

    useEffect(() => {
        if (dashboardData) {
        const newContent = JSON.stringify(dashboardData, null, 2);
        setFileContent(newContent);
        }
    }, [dashboardData]);


    useEffect(() => {
        localStorage.setItem("fileContent", fileContent);
    }, [fileContent]);


    const appendDataToFile = (newData) => {
        setFileContent((prevContent) => prevContent + newData + "\n");
    };

    
    const createFile = () => {
        const blob = new Blob([fileContent], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "myFile.txt";
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
