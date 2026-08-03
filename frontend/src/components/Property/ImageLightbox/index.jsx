import "./ImageLightbox.css";

import {
    FaTimes,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";

function ImageLightbox({

    images,
    current,
    setCurrent,
    close

}){

    const nextImage=()=>{

        setCurrent(

            (current+1)%images.length

        );

    };

    const prevImage=()=>{

        setCurrent(

            current===0

            ? images.length-1

            : current-1

        );

    };

    return(

<div className="lightbox">

<button
className="close-btn"
onClick={close}>

<FaTimes/>

</button>

<button
className="prev-btn"
onClick={prevImage}>

<FaChevronLeft/>

</button>

<img
src={images[current]}
alt="Property"
/>

<button
className="next-btn"
onClick={nextImage}>

<FaChevronRight/>

</button>

</div>

    )

}

export default ImageLightbox;