// import React, { useState } from "react";
// import { useForm } from 'react-hook-form';
// import { useNavigate } from "react-router-dom";
// // import { toast } from 'react-toastify';
// import Components from "../theme/master-file-material";
// import logo from "../theme/img/vekaria_logo.png"
// import { LoggedIn } from "../services/authenticate";
// import './login.scss';
// import theme from "../theme/theme";
// import { toast } from "react-toastify";
// import LoginLoader from "../components/common/login-loader/login-loader";
// function LoginPage() {
// const navigate = useNavigate();
// const [passwordVisible, setPasswordVisible] = useState(false);
// const [loading, setLoading] = useState(false); // Loading state

// const {
//     register,
//     handleSubmit,
//     formState: { errors }
// } = useForm({
//     defaultValues: {
//         username: '',
//         password: ''
//     }
// });

// const onSubmit = async (inputData) => {
//     try {
//         setLoading(true);
//         await LoggedIn(inputData);
//         toast.success("Login Successful", {
//             position: "top-right",
//             autoClose: 2500,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: false,
//             draggable: false,
//             progress: undefined,
//             theme: "colored",
//         });
//         setLoading(false);

//         navigate('/dashboard', { replace: true });
//     } catch (error) {
//         console.log("first case");

//         setLoading(false);
//         if (error?.response) {
//             const { status, data } = error.response;
//             const errorMessage = status === 500
//                 ? 'Server Error'
//                 : data?.error?.[0] || 'Login failed';

//             toast.error(errorMessage, {
//                 position: "top-right",
//                 autoClose: 2500,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: false,
//                 theme: "colored",
//             });
//         }
//         else if (error.response.status === 401) {
//             console.log("first case");
//             setLoading(false);
//             toast.error("Server Error", {
//                 position: "top-right",
//                 autoClose: 2500,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: false,
//                 theme: "colored",
//             });
//         }
//         else {
//             setLoading(false);
//             toast.error('Network Error. Please try again.', {
//                 position: "top-right",
//                 autoClose: 2500,
//                 theme: "colored",
//             });
//         }
//     }
// };

// const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
// };

//     return (
//         <div className="container-fluid login-container d-flex align-items-center justify-content-center vh-100">
//             <div className="row login-wrapper w-50">
//                 {/* Login Form Section */}
//                 <div className="col-md-6 d-flex align-items-center justify-content-center login-form-section" style={{}}>
//                     <div className="w-75 p-2">
//                         {/* Logo */}
// <div className="text-center mb-4">
//     <img
//         src={logo}
//         alt="Company Logo"
//         className="login-logo mb-3"
//         style={{ maxHeight: '80px' }}
//     />
// </div>

//                         {/* Form Title */}
//                         <h4 className="text-center mb-4">Login to Your Account</h4>

//                         {/* Login Form */}
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             {/* Username Field */}
//                             <div className="mb-3">
//                                 {/* <label htmlFor="username" className="form-label">Username</label> */}
//                                 <div className="input-group">
//                                     <span className="input-group-text">
//                                         <Components.Icons.Person />
//                                     </span>
//                                     <input
//                                         type="text"
//                                         id="username"
//                                         className={`form-control ${errors.username ? 'is-invalid' : ''}`}
//                                         {...register("username", {
//                                             required: "Username is required"
//                                         })}
//                                         autoComplete="off"
//                                     />
//                                     {errors.username && (
//                                         <div className="invalid-feedback">
//                                             {errors.username.message}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Password Field */}
//                             <div className="mb-3">
//                                 {/* <label htmlFor="password" className="form-label">Password</label> */}
//                                 <div className="input-group">
//                                     <span className="input-group-text">
//                                         <Components.Icons.VpnKey />
//                                     </span>
//                                     <input
//                                         type={passwordVisible ? "text" : "password"}
//                                         id="password"
//                                         className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//                                         {...register("password", {
//                                             required: "Password is required"
//                                         })}
//                                         autoComplete="off"
//                                     />
//                                     <button
//                                         type="button"
//                                         className="btn btn-outline-secondary"
//                                         onClick={togglePasswordVisibility}
//                                     >
//                                         {passwordVisible ? (
//                                             <Components.Icons.Visibility className="text-white-600" />
//                                         ) : (
//                                             <Components.Icons.VisibilityOff className="text-white-600" />
//                                         )}
//                                     </button>
//                                     {errors.password && (
//                                         <div className="invalid-feedback">
//                                             {errors.password.message}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Forgot Password */}
//                             <div className="mb-3 d-flex justify-content-end">
//                                 <a href="#" className=" text-decoration-none">
//                                     Forgot Password?
//                                 </a>
//                             </div>

//                             {/* Submit Button */}
//                             <button
//                                 type="submit"
//                                 className="btn w-100 py-2 font-bold"
//                                 style={{ background: theme.palette.light_background, fontWeight: theme.palette.bold }}
//                             >
//                                 {loading ? <LoginLoader /> : "Login"}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//                 {/* Image Section */}
//                 <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center login-image-section">
//                     <div className="text-center">
//                         <img
//                             // src={LoginImage} 
//                             alt=""
//                             className="img-fluid login-illustration"
//                             style={{ maxHeight: '500px' }}
//                         />
//                     </div>
//                 </div>


//             </div>
//         </div>
//     );
// }

// export default LoginPage;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Button as MUIButton, TextField, InputAdornment, IconButton } from '@mui/material';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import Components from '../theme/master-file-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
import logo from "../theme/img/vekaria_logo.png"
import { LoggedIn } from "../services/authenticate";
import './login.scss';
import theme from "../theme/theme";
import { toast } from "react-toastify";
import LoginLoader from "../components/common/login-loader/login-loader";


const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = async (inputData) => {
        try {
            setLoading(true);
            await LoggedIn(inputData);
            toast.success("Login Successful", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);

            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.log("first case");

            setLoading(false);
            if (error?.response) {
                const { status, data } = error.response;
                const errorMessage = status === 500
                    ? 'Server Error'
                    : data?.error?.[0] || 'Login failed';

                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                });
            }
            else if (error.response.status === 401) {
                console.log("first case");
                setLoading(false);
                toast.error("Server Error", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                });
            }
            else {
                setLoading(false);
                toast.error('Network Error. Please try again.', {
                    position: "top-right",
                    autoClose: 2500,
                    theme: "colored",
                });
            }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
            <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
                <div className='mt-4'>
                    <div className="text-center mb-4">
                        <img
                            src={logo}
                            alt="Company Logo"
                            className="login-logo mb-3"
                            style={{ maxHeight: '80px' }}
                        />
                    </div>
                </div>


                <div className="text-center">
                    <h4>
                        Login to Your Account
                    </h4>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="p-4">
                        <div className="mb-3">
                            <TextField
                                fullWidth
                                placeholder="Username"
                                type="text"
                                id="username"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                {...register("username", {
                                    required: "Username is required"
                                })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <User className="text-muted" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                margin="dense"
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                fullWidth
                                placeholder="Password"
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                {...register("password", {
                                    required: "Password is required"
                                })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock className="text-muted" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                // onClick={() => setShowPassword(!showPassword)}
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                            >
                                                {passwordVisible ? (
                                                    <Components.Icons.Visibility className="text-white-600" />
                                                ) : (
                                                    <Components.Icons.VisibilityOff className="text-white-600" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                margin="dense"
                            />
                        </div>
                        <div className="text-end">
                            <a href="#" className="">Forgot Password?</a>
                        </div>
                        {/* <MUIButton
                            fullWidth
                            variant="contained"
                            color="warning"
                            className="mt-4"
                            size="large"
                            type='submit'
                        >
                            {loading ? <LoginLoader /> : "Login"}
                        </MUIButton> */}
                        <button
                                type="submit"
                                className="btn w-100 py-2 font-bold"
                                style={{ background: '#cea965', fontWeight: theme.palette.bold }}
                            >
                                {loading ? <LoginLoader /> : "Login"}
                            </button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
