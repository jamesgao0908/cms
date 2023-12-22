import { Box, Typography, Dialog, TextField} from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState, useRef } from "react";
import theme from "../utils/theme";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { Label } from "reactstrap";
import singleLayer from "../static/image/singleLayer.png";
import doubleLayer from "../static/image/doubleLayer.png";

const CustomBake = ()=>{

  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return <Box maxWidth={'lg'} m="1rem">
    <Typography variant="h5" sx={{ color: `${theme.color.primary}`, alignItems: 'center', textAlign: 'center'}} gutterBottom>
      Custom Bake
    </Typography>
    <Box sx={{ boxShadow: '6px 3px 14.3px 0 rgba(0, 0, 0, 0.23)', display:'flex', flexDirection: { xs: 'column', sm: 'row'}}}
    >
      {/* left box */}
      <Box flex={1}>
        <Typography variant="h6" textAlign='center'>Select style you want</Typography>
        <Box className="imageControl" display='flex' flexDirection='row'sx={{height:"200px"}}>
            <Box 
              sx={{ 
                border: '1px dashed #ccc',
                height: "100%",
                width: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "40px",
                cursor: "pointer",
                flexDirection: "column",
                flex: 1
              }} 
              onClick={handleBoxClick}
            >
            <input type="file" accept="image/*" onChange={handleFileChange} ref={inputRef} style={{ display: 'none' }} />
            {
            image ? (
              <img src={image} alt="Thumbnail" height='100%' width='100%'/> 
            ):(<>
              <PermMediaIcon/><Typography variant="h6">Click to upload image</Typography>
              <Typography variant="p" color="lightgrey">support jpeg, jpg, png</Typography>
            </>)
            }
            </Box>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
              <Typography variant="h4">OR</Typography>
              <Typography variant="h6" onClick={handleClickOpen} sx={{ textDecoration: 'underline', cursor: 'pointer'}} >Select template</Typography>
            </Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Selecting from existing cake templates
              </DialogTitle>
              <DialogContent>

              </DialogContent>
              <DialogActions>
                {/* <Button onClick={handleClose}>cancel</Button>
                <Button onClick={handleClose} autoFocus>
                  Select
                </Button> */}
              </DialogActions>
            </Dialog>
        </Box>
        <Box className="detailContol">
          <Label>Your can provide us with some keywords</Label>
          <TextField display="block" variant="outlined" label="keywords" sx={{margin:"1rem 0"}} fullWidth/>
        </Box>
      </Box>
      {/* right box */}
      <Box flex={1}>
        <Typography variant="h6">Sizing</Typography>
        <Box sx={{display: 'flex'}}>
          <Box flex={1}>
            <img src={singleLayer} height={150} width={150} />
            <Typography variant="p" sx={{display: "block"}}></Typography>
          </Box>
          <Box flex={1}>
            <img src={doubleLayer} height={150} width={150} />
            <Typography variant="p" sx={{display: "block"}}>start from + $60</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
}

export default CustomBake;