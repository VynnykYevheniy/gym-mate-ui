import React, { useState } from "react";

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);



    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* Image Display */}
            <div className="w-full h-64 overflow-hidden rounded-lg shadow-md relative">
                <img
                    src={images[currentIndex].url}
                    alt={`Image ${images[currentIndex].id}`}
                    className="w-full h-full object-cover"
                />
                {/* Display ID instead of index */}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md">
                    {`ID: ${images[currentIndex].id}`}
                </div>
            </div>

            {/* Navigation Controls */}
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                onClick={handlePrevClick}
            >
                &lt;
            </button>
            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                onClick={handleNextClick}
            >
                &gt;
            </button>

            {/* Dots for indicators */}
            <div className="flex justify-center mt-4 space-x-2">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
