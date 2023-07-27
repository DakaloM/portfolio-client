import React from 'react';
import "./viewImage.scss";
import CloseIcon from '@mui/icons-material/Close';


const ViewImage = ({setOpenImage, image}) => {
  return (
    <div className='viewImage'>
        <div className="imageContainer">
            <span className="close" onClick={() => setOpenImage(false)}><CloseIcon className='icon'/></span>

            {image ? <img src={image}alt="" /> : "No image to display"}
        </div>
    </div>
  )
}

export default ViewImage