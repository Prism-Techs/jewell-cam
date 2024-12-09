import React, { useEffect, useState, } from 'react';
import style from './css/header.module.scss';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Components from "../../../theme/master-file-material";
import { useTheme } from '@mui/material';
import logo from '../../../theme/img/vekaria_logo.png'
import Navbar from './Navbar';
// import { useDrawer } from '../../../services/drawerContext';
import { useDrawer } from '../../../services/drawerContext';
const Header = () => {

    const { drawer, setDrawer } = useDrawer();
    const theme = useTheme();
    const isMatch = Components.useMediaQuery(theme.breakpoints.down('xl'))

    return (
        <>
            <Components.ThemeProvider theme={theme}>
                <header>
                    <nav>
                        <div className={`${style.navbar}`}>
                            <div className='logo-container d-flex align-items-center'>
                                <NavLink to={'/dashboard'} className={`${style.company_name} text-primary`}>
                                    <img src={logo} alt='Vekaria' className={`${style.imgClass}`} />
                                </NavLink>
                            </div>

                            {
                                !isMatch ? (
                                    <>
                                        <Navbar isMatch={isMatch} />
                                    </>
                                ) : (<>

                                </>)
                            }

                            <div className='d-flex justify-content-between'>
                      
                                {/* burger menu  */}
                                {
                                    isMatch ? (
                                        <>
                                            <div className='menu-icon-container d-flex align-items-center'>
                                                <Components.IconButton onClick={() => setDrawer(!drawer)}>
                                                    <Components.Icons.MenuOutlined className='fs-2 text-dark' />
                                                </Components.IconButton>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )
                                }
                            </div>

                            {/* {drawer opens when click on menu icon } */}
                            {drawer &&
                                <Components.Drawer open={drawer} onClose={() => setDrawer(false)}>
                                    <Navbar isMatch={isMatch} />
                                </Components.Drawer>
                            }

                        </div>
                    </nav>
                </header>
            </Components.ThemeProvider>
        </>
    );
}

export default Header;