import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = ({size, color, padding}) => {
    return (
      <Box sx={{ display: 'flex', width: "100%", alignItems: "center", justifyContent: "center"}}>
        <CircularProgress style={{color:color? color : "#6d7999", padding: padding? padding: 0}} size={size}/>
      </Box>
    )
  }
export default Loading