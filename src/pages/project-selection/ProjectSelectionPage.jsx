// src/pages/ProjectSelectionPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import NewModel from '../../components/models/newfilemodel/newfilemodel';

const ProjectSelectionPage = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const projectType = localStorage.getItem('projectType');
        if (projectType === 'new') {
            navigate('/dashboard'); 
        }
    }, [navigate]);

    const handleNewProject = () => {
        localStorage.setItem('projectType', 'new');  
        // navigate('/dashboard', { state: { openModal: true } }); 
        setIsModalOpen(true);
    };

    const handleExistingProject = () => {
        alert("This will navigate to the existing project page!");
    };
    const handleModalSubmit = (dimensions) => {
        localStorage.setItem('tabs', JSON.stringify(dimensions));
        // After modal data is submitted, navigate to dashboard
        navigate('/dashboard', { state: { openModal: true } });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Select a Project</h1>
            <Button variant="contained" color="primary" onClick={handleNewProject}>
                New Project
            </Button>
            <Button variant="contained" color="secondary" onClick={handleExistingProject} style={{ marginLeft: '20px' }}>
                Existing Project
            </Button>
            {isModalOpen && (
                <NewModel 
                    open={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onSubmit={handleModalSubmit}  // Pass the submit handler
                />
            )}
        </div>
    );
};

export default ProjectSelectionPage;
