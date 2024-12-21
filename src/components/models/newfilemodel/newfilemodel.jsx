import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Components from "../../../theme/master-file-material";
import "./newmodels.scss";
import CustomeButton from "../../common/button/button";
const NewModel = ({ open, onClose, onSubmit }) => {
  const canvasRef = useRef(null);
  const [type, setType] = useState("flat");
  const [Unittype, setUnitType] = useState("mm");
  const [center, setCenter] = useState("center");
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });
  const [lastUpdated, setLastUpdated] = useState(null); // Track which field was last updated

  const { register, handleSubmit, watch, setValue, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      design_name: "",
      diameter: 63.64,
      width: 20,
      height: 200,
      material_thickness: 0,
      radius: 0,
      degree: 0,
      unit: Unittype,
      type: type,
      position: "center",
    },
  });

  const diameter = watch("diameter");
  const height = watch("height");
  const bangletype = watch("type");

  // Handle diameter and height calculations
  useEffect(() => {
    if (bangletype !== "pendant") {
      // Skip calculation if no values are present
      if (!diameter && !height) return;

      // Prevent infinite loop by checking which field was last updated
      if (lastUpdated === "diameter" && diameter) {
        // Calculate height based on diameter
        const calculatedHeight = (22 / 7) * parseFloat(diameter);
        setValue("height", parseFloat(calculatedHeight.toFixed(2)));
      } else if (lastUpdated === "height" && height) {
        // Calculate diameter based on height
        const calculatedDiameter = (7 / 22) * parseFloat(height);
        setValue("diameter", parseFloat(calculatedDiameter.toFixed(2)));
      }
    }
  }, [diameter, height, bangletype, setValue, lastUpdated]);

  // Custom onChange handlers for diameter and height
  const handleDiameterChange = (event) => {
    setLastUpdated("diameter");
    setValue("diameter", event.target.value);
  };

  const handleHeightChange = (event) => {
    setLastUpdated("height");
    setValue("height", event.target.value);
  };

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setType(newType);
    setValue("type", newType);
  };

  const handleUnitTypeChange = (event) => {
    const newUnitType = event.target.value;
    setUnitType(newUnitType);
    setValue("unit", newUnitType);
  };

  // const handleCenterChange = (event) => setCenter(event.target.value);

  const handleCenterChange = (event) => {
    const newPosition = event.target.value;
    setCenter(newPosition);
    
    setValue("position", newPosition); // Update form value
};

  const getPositionCoordinates = (rectX, rectY, rectWidth, rectHeight) => {
    const positions = {
      center: {
        x: rectX + rectWidth / 2,
        y: rectY + rectHeight / 2,
      },
      top_left: {
        x: rectX + 2,
        y: rectY + 2,
      },
      top_right: {
        x: rectX + rectWidth - 2,
        y: rectY + 2,
      },
      bottom_left: {
        x: rectX + 2,
        y: rectY + rectHeight - 2,
      },
      bottom_right: {
        x: rectX + rectWidth - 2,
        y: rectY + rectHeight - 2,
      },
    };
    return positions[center];
  };

  const drawPositionIndicator = (ctx, x, y) => {
    const size = 4;
    ctx.beginPath();
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;

    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);

    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);

    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
  };

  useEffect(() => {
    // const defaultCanvasValue = document.createElement('canvas');
    // defaultCanvasValue.width = 400; // Set your desired width
    // defaultCanvasValue.height = 400; // Set your desired height

    // const canvas = canvasRef.current || defaultCanvasValue;
    const canvas = canvasRef.current
    
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const formValues = watch();
    
    const width = Number(formValues.width) || 0;
    const height = Number(formValues.height) || 0;
    const thickness = Number(formValues.material_thickness) || 2;

    const rectX = (canvas.width - width) / 2;
    const rectY = (canvas.height - height) / 2;

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = thickness;
    
    ctx.beginPath();
    console.log(rectX,rectY,width, height);
    ctx.rect(rectX, rectY, width, height);
    ctx.stroke();

    if (width && height) {
      const pos = getPositionCoordinates(rectX, rectY, width, height);
      drawPositionIndicator(ctx, pos.x, pos.y);
    }
  }, [watch(), center]);
  
  const onSubmitForm = (data) => {
    onSubmit(data);
  };
  
  useEffect(() => {
    if (!open) {
      // Reset form to default values
      reset();
      
      // Reset state variables to their initial values
      setType("flat");
      setUnitType("mm");
      setCenter("center");
      setLastUpdated(null);
    }
  }, [open, reset]);

  return (
    <Components.Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": { width: "1000px", maxWidth: "100%" },
        "& .MuiDialogContent-root": {
          padding: "10px 15px",
          borderBottom: "0px solid",
        },
      }}
    >
      <div className="text-center p-1">
        <h5>New Model</h5>
      </div>
      <div className="d-flex justify-content-between">
        {/* Left Column (Inputs) */}
        <div className="col-5">
          {" "}
          {/* Adjust column width */}
          <Components.DialogContent dividers>
            <div>
            <Components.TextField
                label="Design Name"
                value={watch("design_name")}
                // onChange={handleDiameterChange}
                // type="number"
                // fullWidth
                variant="standard"
                sx={{ marginBottom: "8px" }}
                {...register("design_name", { required: true })}
                error={!!errors.design_name}
                helperText={errors.design_name ? "Design Name is required" : ""}
              />            
              </div>
            {/* Type selection */}
            <Components.Box mb={2}>
              <Components.Typography
                variant="subtitle1"
                align="center"
                sx={{
                  backgroundColor: "#e0e7eb",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Type
              </Components.Typography>
              <Components.RadioGroup
                row
                value={type}
                onChange={handleTypeChange}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Components.FormControlLabel
                  sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                  value="flat"
                  control={<Components.Radio />}
                  label="Flat"
                />
                <Components.FormControlLabel
                  sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                  value="v_shaped"
                  control={<Components.Radio />}
                  label="V-Shaped"
                />
                <Components.FormControlLabel
                  sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                  value="half_round"
                  control={<Components.Radio />}
                  label="Half-Round"
                />
                <Components.FormControlLabel
                  sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                  value="pendant"
                  control={<Components.Radio />}
                  label="Pendant"
                />
              </Components.RadioGroup>
            </Components.Box>
            <Components.Box mb={1}>
              <Components.Typography
                variant="subtitle1"
                align="center"
                sx={{
                  backgroundColor: "#e0e7eb",
                  // padding: "8px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Unit
              </Components.Typography>
              <Components.RadioGroup
                row
                value={Unittype}
                onChange={handleUnitTypeChange}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Components.FormControlLabel
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "12px",
                    },
                  }}
                  value="mm"
                  control={<Components.Radio />}
                  label="MM"
                />
                <Components.FormControlLabel
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "12px",
                    },
                  }}
                  value="inch"
                  control={<Components.Radio />}
                  label="Inch"
                />
              </Components.RadioGroup>
            </Components.Box>

            {/* Dimensions */}
            <Components.Box mb={1}>
              <Components.Typography
                variant="subtitle1"
                align="center"
                sx={{
                  backgroundColor: "#e0e7eb",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Dimensions
              </Components.Typography>
              <Components.TextField
                label="Diameter"
                {...register("diameter")}
                value={watch("diameter")}
                onChange={handleDiameterChange}
                type="number"
                fullWidth
                variant="standard"
                disabled={type === "pendant"}
                sx={{ marginBottom: "8px" }}
              />
              <Components.TextField
                label="Width"
                {...register("width")}
                type="number"
                fullWidth
                variant="standard"
                sx={{ marginBottom: "8px" }}
              />
              <Components.TextField
                label="Height"
                {...register("height")}
                type="number"
                value={watch("height")}
                onChange={handleHeightChange}
                fullWidth
                variant="standard"
                sx={{ marginBottom: "8px" }}
              />
              {type === "half_round" && (
                <Components.TextField
                  label="Radius"
                  {...register("radius")}
                  type="number"
                  fullWidth
                  variant="standard"
                  sx={{ marginBottom: "8px" }}
                />
              )}
              {type === "v_shaped" && (
                <Components.TextField
                  label="Degree"
                  {...register("degree")}
                  type="number"
                  fullWidth
                  variant="standard"
                  sx={{ marginBottom: "8px" }}
                />
              )}
              <Components.TextField
                label="Material Thickness"
                {...register("material_thickness")}
                type="number"
                fullWidth
                variant="standard"
                sx={{ marginBottom: "8px" }}
              />
            </Components.Box>
          </Components.DialogContent>
        </div>

        <div className="col-7">
          {" "}
          <Components.DialogContent dividers>
            <div className="bg-black d-flex justify-content-center">
              <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
            </div>
            <Components.Box>
              <Components.Typography
                variant="subtitle1"
                align="center"
                sx={{
                  backgroundColor: "#e0e7eb",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                Select Center
              </Components.Typography>
              <Components.RadioGroup
                row
                value={center}
                onChange={handleCenterChange}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Components.FormControlLabel
                  sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                  value="top_left"
                  control={<Components.Radio />}
                  label="Top Left"
                />
                <Components.FormControlLabel
                  sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                  value="center"
                  control={<Components.Radio />}
                  label="Center"
                />
                <Components.FormControlLabel
                  sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                  value="bottom_left"
                  control={<Components.Radio />}
                  label="Bottom Left"
                />
                <Components.FormControlLabel
                  sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                  value="top_right"
                  control={<Components.Radio />}
                  label="Top Right"
                />
                <Components.FormControlLabel
                  sx={{ "& .MuiTypography-root": { fontSize: "12px" } }}
                  value="bottom_right"
                  control={<Components.Radio />}
                  label="Bottom Right"
                />
              </Components.RadioGroup>
            </Components.Box>
          </Components.DialogContent>
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <CustomeButton onClick={onClose} text="Cancel" />
          
        <CustomeButton onClick={handleSubmit(onSubmitForm)} text="Ok" />
          
      </div>
    </Components.Dialog>
  );
};

export default NewModel;
