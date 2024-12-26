import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Components from "../../../theme/master-file-material";
import CustomeButton from "../../common/button/button";
import theme from "../../../theme/theme";
import { create_machine_setting ,get_machine_setting_details} from "../../../services/machine-services/machine-services";
import { toast } from "react-toastify";
import "./machine-setting-model.scss"
const MachineSettingModel = ({ open, onClose }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      x_pitch: "", theta_pitch: "", z_pitch: "", v_pitch: "", w_pitch: "",
      gr_x: "", gr_theta: "", gr_z: "", gr_v: "", gr_w: "",
      rev_x: "", rev_y: "", rev_z: "", rev_v: "", rev_w: "",
      max_w_angle: "", max_speed: "", min_speed: "",
    },
  });

  useEffect(() => {
    if (open) { // Only fetch data when the modal is open
      get_machine_setting_details()
        .then(response => {
          const data = response.data[0];          
          // Set form values using the setValue method
          setValue("x_pitch", data.x_pitch);
          setValue("theta_pitch", data.theta_pitch);
          setValue("z_pitch", data.z_pitch);
          setValue("v_pitch", data.v_pitch);
          setValue("w_pitch", data.w_pitch);
          setValue("gr_x", data.gr_x);
          setValue("gr_theta", data.gr_theta);
          setValue("gr_z", data.gr_z);
          setValue("gr_v", data.gr_v);
          setValue("gr_w", data.gr_w);
          setValue("rev_x", data.rev_x);
          setValue("rev_y", data.rev_y);
          setValue("rev_z", data.rev_z);
          setValue("rev_v", data.rev_v);
          setValue("rev_w", data.rev_w);
          setValue("max_w_angle", data.max_w_angle);
          setValue("max_speed", data.max_speed);
          setValue("min_speed", data.min_speed);
        })
        .catch(error => {
          console.error("Error fetching machine settings:", error);
          toast.error("Failed to fetch machine settings");
        });
    }
  }, [open, setValue]);

  const textFieldSX = {
    '& .MuiOutlinedInput-root': {
      height: '40px',
      backgroundColor: 'white',
    },
    '& .MuiInputLabel-outlined': {
      // transform: 'translate(14px, 12px) scale(1)',
      fontSize: '1.1rem',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(16px, -6px) scale(0.75)',
    }
  };

  const onSubmit = (data) => {
        create_machine_setting(data)
            .then(response => {
                // const data = response.data;
                console.log(response.data);
                toast.success("Machine Setting Update successfully", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
            })
            .catch(error => {
                console.error("Error saving pattern:", error);
            });
        onClose();
  };

  return (
    <Components.Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": { 
          width: "600px",
          maxWidth: "95%",
          backgroundColor: "#f8f9fa"
        },
      }}
    >
      <div className='title-div'>
      Machine Setting
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Components.DialogContent sx={{ 
          padding: "8px",
          '&.MuiDialogContent-root': {
            padding: "8px",
            overflowY: "auto",
            maxHeight: "calc(100vh - 150px)"
          }
        }}>
          <Components.Grid container spacing={1}>
            <Components.Grid item xs={12} md={6}>
              <Components.Stack spacing={1}>
                <Components.TextField label="X Pitch (mm)" {...register("x_pitch")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="Theta Pitch (mm)" {...register("theta_pitch")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="Z Pitch (mm)" {...register("z_pitch")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="V Pitch (mm)" {...register("v_pitch")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="W Pitch (mm)" {...register("w_pitch")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                
                <hr style={{ border: "1px solid #ccc", margin: "10px 0" }} />

                <Components.TextField label="No Of Steps per Rev for X" {...register("rev_x")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="No Of Steps per Rev for Y" {...register("rev_y")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="No Of Steps per Rev for Z" {...register("rev_z")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="No Of Steps per Rev for V" {...register("rev_v")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="No Of Steps per Rev for W" {...register("rev_w")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
              </Components.Stack>
            </Components.Grid>

            <Components.Grid item xs={12} md={6}>
              <Components.Stack spacing={1}>
                <Components.TextField label="GearRatio X" {...register("gr_x")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="GearRatio Theta" {...register("gr_theta")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="GearRatio Z" {...register("gr_z")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="GearRatio V" {...register("gr_v")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="GearRatio W" {...register("gr_w")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <hr style={{ border: "1px solid #ccc", margin: "10px 0" }} />

                <Components.TextField label="Max W angle (deg)" {...register("max_w_angle")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="Max Speed (rmp)" {...register("max_speed")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
                <Components.TextField label="Min Speed (rmp)" {...register("min_speed")} type="number" variant="outlined" size="small" fullWidth sx={textFieldSX} />
              </Components.Stack>
            </Components.Grid>
          </Components.Grid>
        </Components.DialogContent>

        <Components.DialogActions sx={{ 
          padding: "5px",
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "white"
        }}>
          <CustomeButton onClick={onClose} text="Cancel" />
          <CustomeButton type="submit" text="Save" />
        </Components.DialogActions>
      </form>
    </Components.Dialog>
  );
};

export default MachineSettingModel;