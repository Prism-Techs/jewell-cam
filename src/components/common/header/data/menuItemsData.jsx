import React, { useEffect, useState } from 'react'

const menuItemsData = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNewFileOpenModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleNewFileCloseModal = () => {
        setIsModalOpen(false);
    };

    const navItems = [
        {
        name: "File",
        //route: "/",
        permission: true,
        isExpandable: true,
        child: [
            {
            name: "New",
            onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },
            {
            name: "Open",

            },
            {
            name: "Save",

            },
            {
            name: "Save As",

            },

        ],
        },
        {
        name: "Edit",
        //route: "/edit",
        permission: true,
        isExpandable: false,
        child: []
        },
        {
        name: "Project",
        //route: "/project",
        permission: true,
        isExpandable: true,
        child: [
            {
                name: "Select Project",
                onClick: handleProjectSelectMenuClick,
                //   //route: "/orders",
            },
        ]
        },
        {
        name: "Clipart Library",
        //route: "/clipart_library",
        permission: true,
        isExpandable: false,
        child: []
        },
        {
        name: "Tool Path",
        //route: "/toolpath",
        permission: true,
        isExpandable: false,
        child: [
            {
            name: "Tool Library",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },

        ],
        },
        {
        name: "Window",
        //route: "/window",
        permission: true,
        isExpandable: false,
        child: []
        },
        {
        name: "Help",
        //route: "/help",
        permission: true,
        isExpandable: false,
        child: []
        },
        {
        name: "Object Type",
        //route: "/object_type",
        permission: true,
        isExpandable: false,
        child: [

            {
            name: "Flat",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },
            {
            name: "Spherical",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },
            {
            name: "V shape",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },
            {
            name: "Flat Pendent",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },
            {
            name: "Spherical Pendent",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },
        ]
        },
        {
        name: "Operations",
        //route: "/operation",
        permission: true,
        isExpandable: false,
        child: [

            {
            name: "Background",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },
            {
            name: "Vertical Design",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },
            {
            name: "Horizontal Rotary",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },
            {
            name: "Turning",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            },
        ]
        },
        {
        name: "Machine Setup",
        //route: "/machine_setup",
        permission: true,
        isExpandable: false,
        child: [
            {
            name: "Post Processor",
            // onClick: handleNewFileOpenModal,
            //   //route: "/orders",
            }
        ]
        },
    ];

    return navItems;
}

export default menuItemsData