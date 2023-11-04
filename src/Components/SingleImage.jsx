import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const SingleImage = ({ 
  index, 
  id, 
  src, 
  images,
  setImages,
  moveImage, 
  handleSelectImage, 
  handleCheckboxChange, 
  selectedImages, 
  gridRow, 
  gridColumn 
}) => {

  const [hovered, setHovered] = useState(false);
  const isImageSelected = selectedImages.some((selected) => selected.id === id);

  const handleSetAsFeaturedImage = () => {
    const updatedImages = images.filter((image) => image.id !== id);
    const featuredImage = images.find((image) => image.id === id);
    setImages([featuredImage, ...updatedImages]);
  };

  const handleMouseEnter = () => {
    if (!isImageSelected) {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isImageSelected) {
      setHovered(false);
    }
  };

  const handleTouchStart = () => {
    if (!isImageSelected) {
      setHovered(true);
    }
  };

  const handleTouchEnd = () => {
    if (!isImageSelected) {
      setHovered(false);
    }
  };

  const [, drag] = useDrag({
    type: 'IMAGE', 
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (item) => {
      if (item.id !== id) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div 
      ref={(node) => drag(drop(node))} 
      style={{ 
        cursor: "move", 
        gridRow: gridRow,
        gridColumn: gridColumn,
        display: 'flex'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative">
        {(hovered || isImageSelected) && (
          <div className="flex justify-between">
            <input
              type="checkbox"
              checked={isImageSelected}
              onChange={() => handleCheckboxChange({ id, src })}
              className="absolute top-5 left-5 z-10 w-6 h-6"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1,
              }}
            />
            <button
              onClick={handleSetAsFeaturedImage}
              className={`z-10 text-white text-xs md:text-md rounded-2xl md:rounded-full p-2 absolute ${
                index === 0 ? 'top-5 right-5 bg-green-500' : 'bottom-5 left-1/2 transform -translate-x-1/2 bg-cyan-700 hover:bg-green-500'
              } `}
            >
              {index === 0 ? 'Featured' : 'Set Featured'}
            </button>
          </div>
        )}
        <img
          src={src}
          alt={`image-${id}`}
          draggable
          onClick={() => handleSelectImage({ id, src })}
          className="border border-gray-300 rounded-xl object-cover h-full w-full"
          style={{
            transition: '.5s ease',
            filter: isImageSelected ? 'brightness(80%)' : hovered ? 'brightness(50%)' : '',
            backgroundColor: isImageSelected ? '#E4DEDD' : hovered ? '#666261' : '',
          }}
        />
      </div>
    </div>
  );
};

export default SingleImage;
