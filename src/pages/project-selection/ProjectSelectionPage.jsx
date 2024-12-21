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
            {/* <Button variant="contained" color="secondary" onClick={handleExistingProject} style={{ marginLeft: '20px' }}>
                Existing Project
            </Button> */}
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


// import React, { useState } from 'react';
// import { Eye, EyeOff, User, Lock } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-4 text-center">
//           <div className="flex justify-center">
//             <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
//               Vekaria
//             </div>
//           </div>
//           <div className="text-amber-600 text-lg font-medium">Engineering Works</div>
//           <CardTitle className="text-2xl font-semibold text-gray-800">
//             Login to Your Account
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-4">
//             <div className="relative">
//               <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <Input
//                 type="text"
//                 placeholder="Username"
//                 className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
//               />
//             </div>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="pl-10 py-6 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5" />
//                 ) : (
//                   <Eye className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>
          
//           <div className="text-right">
//             <a href="#" className="text-sm text-amber-600 hover:text-amber-700">
//               Forgot Password?
//             </a>
//           </div>

//           <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg font-medium">
//             Login
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default LoginForm;