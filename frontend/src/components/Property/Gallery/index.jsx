import "./Gallery.css";

import { useEffect, useState } from "react";

import ImageLightbox from "../ImageLightbox";

function Gallery({ images = [] }) {

    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (images.length > 0) {
            setSelected(images[0].image);
        }
    }, [images]);

    const handleThumbnailClick = (img, index) => {
        setSelected(img.image);
        setCurrent(index);
    };

    if (!images || images.length === 0) {
        return (
            <div className="gallery">
                <img
                    className="main-image"
                    src="https://placehold.co/900x600?text=No+Image"
                    alt="No Property"
                />
            </div>
        );
    }

    return (

        <div className="gallery">

            {/* Main Image */}

            <img
                src={selected}
                className="main-image"
                alt="Property"
                onClick={() => setOpen(true)}
            />

            {/* Thumbnails */}

            <div className="thumbs">

                {images.map((img, index) => (

                    <img
                        key={img.id}
                        src={img.image}
                        alt="Property"
                        className={
                            selected === img.image
                                ? "thumb active"
                                : "thumb"
                        }
                        onClick={() =>
                            handleThumbnailClick(img, index)
                        }
                    />

                ))}

            </div>

            {/* Full Screen Gallery */}

            {open && (

                <ImageLightbox
                    images={images.map(item => item.image)}
                    current={current}
                    setCurrent={setCurrent}
                    close={() => setOpen(false)}
                />

            )}

        </div>

    );

}

export default Gallery;