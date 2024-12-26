// import { Container } from "@mui/material";
import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = ({ show }) => {

    return show && (
        <>
            {/* <Container className="text-center d-flex justify-content-center align-items-center p-0 m-0" style={{minHeight:'100vh', minWidth:'100%', background:'transparent', }}> */}

            <div className="position-fixed bg-black bg-opacity-75 top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ zIndex: 999 }}>
                <div style={{ width: '150px', height: '150px' }} className="bg-white rounded-3 d-flex flex-column justify-content-center align-items-center">
                    <>
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#677fa9', '#677fa9', '#677fa9', '#677fa9', '#677fa9']}
                        />
                        <p className="text-center fw-bold m-0" >Fetching Data...</p>
                    </>
                </div>
            </div>
            {/* </Container> */}
        </>
    )
}

export default Loader;