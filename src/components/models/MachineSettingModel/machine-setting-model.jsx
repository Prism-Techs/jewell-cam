import React from "react";
import { useForm } from "react-hook-form";
import Components from "../../../theme/master-file-material";
import theme from "../../../theme/theme";
import CustomeButton from "../../common/button/button";
const MachineSettingModel = (props) => {
    const { open, onClose } = props;  // Props for managing dialog state
    const { register, handleSubmit, setValue, reset, control } = useForm({
        defaultValues: {
            x_pitch: "",
            theta_pitch: "",
            z_pitch: "",
            v_pitch: "",
            w_pitch: "",
            gr_x: "",
            gr_theta: "",
            gr_z: "",
            gr_v: "",
            gr_w: "",
            rev_x: "",
            rev_y: "",
            rev_z: "",
            rev_v: "",
            rev_w: "",
            max_w_angle: "",
            max_speed: "",
            min_speed: "",
        },
    });

    // Define onSubmit function to handle form data
    const onSubmit = (data) => {
        // You can handle form submission here (e.g., sending data to an API or logging it)
        console.log("Form Data Submitted:", data);
        localStorage.setItem("machine_setting", data);
        // Close the dialog after submission (optional)
        onClose();
    };

    return (
        <>
            <Components.Dialog
                open={open}
                onClose={onClose}
                sx={{
                    "& .MuiDialog-paper": { width: "600px", maxWidth: "100%" },
                    "& .MuiDialogContent-root": {
                        padding: "10px 15px",
                        borderBottom: "0px solid",
                    },
                }}
            >
                <div className="text-center p-1">
                    <h5>Machine Setting Entry</h5>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>  {/* Handle form submit here */}
                    <div className="d-flex justify-content-between">
                        <div className="col-6">
                            <Components.DialogContent dividers>
                                <Components.Box className="m-2" >
                                    <Components.TextField
                                        label="X Pitch (mm)"
                                        {...register("x_pitch")}
                                        type="number"
                                        variant="standard"
                                    />
                                    
                                    <Components.TextField
                                        label="Theta Pitch (mm)"
                                        {...register("theta_pitch")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="Z Pitch (mm)"
                                        {...register("z_pitch")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="V Pitch (mm)"
                                        {...register("v_pitch")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="W Pitch (mm)"
                                        {...register("w_pitch")}
                                        type="number"
                                        variant="standard"
                                    />
                                </Components.Box>
                            </Components.DialogContent>
                        </div>
                        <div className="col-6">
                            <Components.DialogContent dividers>
                                <Components.Box className="m-2">
                                    <Components.TextField
                                        label="GearRatio X"
                                        {...register("gr_x")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="GearRatio Theta"
                                        {...register("gr_theta")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="GearRatio Z"
                                        {...register("gr_z")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="GearRatio V"
                                        {...register("gr_v")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="GearRatio W"
                                        {...register("gr_w")}
                                        type="number"
                                        variant="standard"
                                    />
                                </Components.Box>
                            </Components.DialogContent>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="col-6">
                            <Components.DialogContent dividers>
                                <Components.Box className="m-2" >
                                    <Components.TextField
                                        label="No Of Steps per Rev for X"
                                        {...register("rev_x")}
                                        type="number"
                                        variant="standard"
                                    />
                                    
                                    <Components.TextField
                                        label="No Of Steps per Rev for Y"
                                        {...register("rev_y")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="No Of Steps per Rev for Z"
                                        {...register("rev_z")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="No Of Steps per Rev for V"
                                        {...register("rev_v")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="No Of Steps per Rev for W"
                                        {...register("rev_w")}
                                        type="number"
                                        variant="standard"
                                    />
                                </Components.Box>
                            </Components.DialogContent>
                        </div>
                        <div className="col-6">
                            <Components.DialogContent dividers>
                                <Components.Box className="m-2" >
                                    <Components.TextField
                                        label="Max W angle (deg)"
                                        {...register("max_w_angle")}
                                        type="number"
                                        variant="standard"
                                    />
                                    
                                    <Components.TextField
                                        label="Max Speed (rmp)"
                                        {...register("max_speed")}
                                        type="number"
                                        variant="standard"
                                    />
                                    <Components.TextField
                                        label="Min Speed (rmp)"
                                        {...register("min_speed")}
                                        type="number"
                                        variant="standard"
                                    />
                                  
                                </Components.Box>
                            </Components.DialogContent>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <CustomeButton onClick={onClose} text="Cancel" />
                        <CustomeButton type="submit" text="Ok" />

                    </div>
                </form>
            </Components.Dialog>
        </>
    );
};

export default MachineSettingModel;
