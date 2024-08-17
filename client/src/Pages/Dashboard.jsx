import React from 'react';
import { Box, Typography, Dialog, TextField, FormControl, Button } from "@mui/material";
import axios from 'axios';

const Dashboard = ()=>{

  const [previewImage, setPreviewImage] = React.useState(null);
  const [title,setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [sku, setSku] = React.useState(null);
  const [price, setPrice] = React.useState(null);

  const handleFIleOnChange = (e)=>{
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }
  }

  const handleSubmitForm = async ()=>{
    try {
      const response = await axios.post('http://localhost:8080/api/product/add', {
        product_name: title, 
        description: "description", 
        price: price,
        stock: sku, 
        category_id: 1,
        thumbnail: previewImage
      });
      setPreviewImage(null);
      setTitle('');
      setDescription('null');
      // setSku(null);
      // setPrice(null);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return <>
    <Box m={'1rem'}>
      <h1>cake information</h1>
      <TextField label="cake title（标题）" variant="standard" sx={{margin:'1rem'}} onChange={e=>setTitle(e.target.value)}>{title}</TextField>
      <TextField label="cake description（细节）" variant="standard" sx={{margin:'1rem'}} onChange={e=>setDescription(e.target.value)}>{description}</TextField>
    </Box>
    <Box m={'1rem'}>
      <TextField label="cake sku（库存）" variant="standard" sx={{margin:'1rem'}} onChange={e=>setSku(e.target.value)}>{sku}</TextField>
      <TextField label="cake price（价格）" variant="standard" sx={{margin:'1rem'}} onChange={e=>setPrice(e.target.value)}>{price}</TextField>
    </Box>
    <Box m={'1rem'}>
      <input type="file" onChange={handleFIleOnChange} accept="image/*" />
      {
        previewImage && (
          <div>
              <h2>Preview Image:</h2>
              <img
                src={previewImage}
                alt="Preview"
                style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    width: 'auto',
                    height: 'auto',
                }}
              />
          </div>)
      }
    </Box>
    <Box m={'1rem'}>
      <Button variant='contained' onClick={handleSubmitForm}>Submit</Button>
    </Box>
  </>
}

export default Dashboard;