// import React from 'react';
// import Components from '../../../theme/master-file-material';
// import CustomeButton from '../../common/button/button';
// import theme from '../../../theme/theme';
// import "./tool-library-model.scss"  
// const ToolLibraryModel = ({ open, onClose }) => {


//     return (
//         <Components.Dialog
//             open={open}
//             onClose={onClose}
//             maxWidth="md"
//             fullWidth
//             sx={{
//                 "& .MuiDialog-paper": {
//                     width: "600px",
//                     maxWidth: "95%",
//                     backgroundColor: "#f8f9fa"
//                 },
//             }}
//         >
//             <div className='title-div'>Tool Library</div>
//             <Components.DialogContent>

//             </Components.DialogContent>
//             <Components.DialogActions>
//                 <CustomeButton onClick={onClose} text="Cancel" />
//                 <CustomeButton onClick={onClose} text="Save" variant="contained" />
//             </Components.DialogActions>
//         </Components.Dialog>
//     );
// };

// export default ToolLibraryModel;

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { Row, Col } from 'react-bootstrap'; // Import Bootstrap's Row and Col
import CustomeButton from '../../common/button/button';
const ToolLibraryModel = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    toolNo: '',
    toolName: '',
    toolCategory: '',
    toolType: '',
    spindleSpeed: '',
    depthCut: '',
    toolGap: '',
    feedRate: '',
    plungeRange: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose(); // Close the modal after save
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Tool Details</DialogTitle>
      <DialogContent>
        <Row>
          {/* First Column */}
          <Col md={4}>
            <TextField
              label="Tool No"
              name="toolNo"
              value={formData.toolNo}
              onChange={handleChange}
              size="small"
              margin="dense"
              fullWidth
            />
            <TextField
              label="Tool Category"
              name="toolCategory"
              value={formData.toolCategory}
              onChange={handleChange}
              size="small"
              margin="dense"
              fullWidth
            />
            <TextField
              label="Depth Cut"
              name="depthCut"
              value={formData.depthCut}
              onChange={handleChange}
              size="small"
              margin="dense"
              fullWidth
            />
          </Col>

          {/* Second Column */}
          <Col md={4}>
            <TextField
              label="Tool Name"
              name="toolName"
              value={formData.toolName}
              onChange={handleChange}
              size="small"
              margin="dense"
              fullWidth
            />
            <TextField
              label="Tool Type"
              name="toolType"
              value={formData.toolType}
              onChange={handleChange}
              size="small"
              margin="dense"
              fullWidth
            />
            <TextField
              label="Tool Gap"
              name="toolGap"
              value={formData.toolGap}
              onChange={handleChange}
              size="small"
              margin="dense"
              fullWidth
            />
          </Col>

          {/* Third Column */}
          <Col md={4}>
            <TextField
              label="Spindle Speed"
              name="spindleSpeed"
              value={formData.spindleSpeed}
              onChange={handleChange}
              size="small"
              margin="dense"
              fullWidth
            />
            <TextField
              label="Feed Rate"
              name="feedRate"
              value={formData.feedRate}
              onChange={handleChange}
              size="small"
              margin="dense"
              fullWidth
            />
            <TextField
              label="Plunge Range"
              name="plungeRange"
              value={formData.plungeRange}
              onChange={handleChange}
              size="small"
              margin="dense"
              fullWidth
            />
          </Col>
        </Row>
      </DialogContent>
      <DialogActions>      
        <CustomeButton onClick={onClose} text="Cancel" />
        <CustomeButton onClick={onClose} text="Save" variant="contained" />
      </DialogActions>
    </Dialog>
  );
};
  
export default ToolLibraryModel;
