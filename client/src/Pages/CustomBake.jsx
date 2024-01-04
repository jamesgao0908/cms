import { Box, Typography, Dialog, TextField, Checkbox, FormGroup, FormControlLabel, Button } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState, useRef } from "react";
import theme from "../utils/theme";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Select from 'react-select';
// import { styled } from '@mui/material/styles';
// import singleLayer from "../static/image/singleLayer.png";
// import doubleLayer from "../static/image/doubleLayer.png";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import styled from "styled-components";
import { useCart } from "../utils/cartContext";


const sizingOptions = [
  { value: 4, label: '4 inches (for 1-2 people, start from $180)', money: 0 },
  { value: 6, label: '6 inches (for 2-3 people, +$20)', money: 0 },
  { value: 8, label: '8 inches (for 3-4 people, +$60)', money: 0 },
  { value: 10, label: '10 inches (for 5-6 people, +$100)', money: 0 },
  { value: 12, label: '12 inches (for 6-7 people, +$140)', money: 0 },
  { value: 12, label: '6 inches base + 4 inches top (for 4-5 people, +$60)', money: 0 },
]

const flavorsOptions = [
  { value: 'vanilla', label: 'permium vanilla', money: 0 },
  { value: 'peachOolong', label: 'White Peach Oolong', money: 0 },
  { vlaue: 'thaiMilkTea', label: 'thai milk tea', money: 0}
]

const colorsOptions = [
  { color: 'rgb(289, 212, 212)', value: 1, label: 'blue placeholder', description: '', money: 0},
  { color: 'rgb(203, 225, 173)', value: 2, label: 'green placeholder', description: '', money: 0},
  { color: 'rgb(153, 218, 191)', value: 3, label: 'red placeholder', description: '', money: 0},
  { color: 'rgb(172, 204, 249)', value: 4, label: 'grey placeholder', description: '', money: 0},
  { color: 'rgb(193, 156, 198)', value: 5, label: 'white placeholder', description: '', money: 0},
  { color: 'rgb(114, 90, 100)',  value: 6, label: 'eagler placeholder', description: '', money: 0},
  { color: 'rgb(114, 90, 100)',  value: 7, label: 'lightblue placeholder', description: '', money: 0},
  { color: 'rgb(215, 215, 215)', value: 8, label: 'blue placeholder', description: '', money: 0},
]

const formatOptionLabel = ({ label, color  }) => (
  <div style={{ display: "flex"}} >
    <div style={{ marginRight: "10px", width: '20px', borderRadius: "50%", backgroundColor: `${color}` }} />
    <div>{label}</div>
  </div>
);

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const StyledBoxComponent = styled(Box)`
  margin-bottom: 1rem;
`
const CheckoutBoxComponent = styled(Box)`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`

const CustomBake = ()=>{

  const { addToCart } = useCart();
  const [image, setImage] = useState(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [cakeInfo, setCakeInfo] = useState({
    size: null,
    flavors: null,
    color: null,
    specialMessage: null,
    time: null,
    style: null,
  });

  console.log(cakeInfo);

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

  const handleCheckingCakeInfo = ()=> {

  }

  return <Box maxWidth={'lg'} m="1rem" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'} }>
    <Typography variant="h5" sx={{ color: `${theme.color.primary}`, alignItems: 'center', textAlign: 'center' }} gutterBottom >
      Custom Bake
    </Typography>
    <Box maxWidth={'md'} width='100%' sx={{ boxShadow: '6px 3px 14.3px 0 rgba(0, 0, 0, 0.23)', display:'flex', flexDirection: { xs: 'column' }, padding: '1rem' }}
    >
      {/* image */}
      <StyledBoxComponent>
        <Typography variant="h6" textAlign='center'>Select style you want</Typography>
        <Box className="imageControl" display='flex' flexDirection='row'sx={{height:"200px"}}>
            <Box onClick={handleBoxClick}  sx={{ border: '1px dashed #ccc', height: "100%", width: "200px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "40px", cursor: "pointer", flexDirection: "column", flex: 1 }} >
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
      </StyledBoxComponent>
      {/* sizing */}
      <StyledBoxComponent>
        <Typography variant="h6">Sizing</Typography>
        <Select 
          options={sizingOptions} 
          placeholder="Select size" 
          onChange={e=>setCakeInfo(preData=>({...preData, size:e}))}
        />
      </StyledBoxComponent>
      {/* flavors */}
      <StyledBoxComponent>
      <Typography variant="h6">Flavors (select up to 2 flavors)</Typography>
        <Select 
          isMulti
          onChange={(o) => {
            setSelectedOptions(o);
            setCakeInfo(preData=>({...preData, flavors:o}))
          }}
          value={selectedOptions}
          isOptionDisabled={() => selectedOptions.length >= 2}
          options={flavorsOptions} 
          placeholder="Select flavors"
        />
      </StyledBoxComponent>
      {/* color */}
      <StyledBoxComponent>
      <Typography variant="h6">Colors</Typography>
        <Select
          options={colorsOptions} 
          formatOptionLabel={formatOptionLabel}
          placeholder="Select color"
          onChange={e =>setCakeInfo(preData=>({...preData, color:e}))}
        />
      </StyledBoxComponent>
      {/* special message */}
      <StyledBoxComponent>
        <Typography variant="h6">Special message</Typography>
        <TextField fullWidth id="special message" label="Special message" variant="outlined" sx={{ zIndex: 0}} onChange={e =>setCakeInfo(preData=>({...preData, specialMessage:e.target.value}))} />
      </StyledBoxComponent>
      {/* pickup date */}
      <StyledBoxComponent>
        <Typography variant="h6">Pickup Date</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar onChange={e=>setCakeInfo(preData=>({...preData, time:e.$d}))}/>
        </LocalizationProvider>
      </StyledBoxComponent>
      {/* disclimaer */}
      <StyledBoxComponent>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="I want to receive promotional updates via email" />
        </FormGroup>
      </StyledBoxComponent>
      {/* button box */}
      <CheckoutBoxComponent>
        <Button 
          variant="outlined" 
            onClick={()=>{
            handleCheckingCakeInfo();
            addToCart(cakeInfo);
          }}
        >Add to cart</Button>
        <Button variant="contained">Process to payment</Button>
      </CheckoutBoxComponent>
    </Box>
  </Box>
}

export default CustomBake;