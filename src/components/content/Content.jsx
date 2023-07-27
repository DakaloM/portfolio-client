import React, { useState } from 'react';
import "./content.scss";
import ViewImage from '../viewImage/ViewImage';

const Content = ({data, reverse}) => {

    const [viewImage, setViewImage] = useState(false);
    const [image, setImage] = useState("");

    const handleImageClick = (image) => {
        setImage(image);
        setViewImage(true);
    }
  return (
    <div className={reverse? 'content reverse' : 'content'}>
        {viewImage && <ViewImage setOpenImage={setViewImage} image={image}/>}
        <div className="imgContainer">
            <img src={data.image} alt="" onClick={() => handleImageClick(data.image)}/>
        </div>

        <div className="info">
            <h1 className="title">{data.title}</h1>
            <div className="story">

                {
                    data.desc.split("\n").map((item) => (

                    <p className="desc" key={item}>
                       {item}
                    </p>
                    ))
                }
               
            </div>
        </div>
    </div>
  )
}

export default Content