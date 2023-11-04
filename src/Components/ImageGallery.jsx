import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import AddImage from './AddImage';
import Header from './Header';
import SingleImage from './SingleImage';

const ImageGallery = ({
  images,
  setImages,
  selectedImages,
  isAllSelected,
  isTouchDevice,
  moveImage,
  handleInputChange,
  deleteImages,
  handleCheckboxChange,
  handleSelectImage,
  handleParentCheckboxChange,
}) => {

  return (
    <div className="p-4 md:py-20 md:px-32 mb-8 bg-gray-100">
      <DndProvider backend={isTouchDevice ? TouchBackend : HTML5Backend}>
        <div className="rounded-xl bg-white py-4 overflow-y-auto">
          <Header
            selectedImages={selectedImages}
            isAllSelected={isAllSelected}
            handleParentCheckboxChange={handleParentCheckboxChange}
            deleteImages={deleteImages}
          />
          <div 
            className="mt-8 px-4 sm:px-8 grid grid-cols-3 md:grid-cols-5 gap-4" 
            style={{ gridAutoRows: 'minmax(200px, auto)', gridAutoColumns: 'minmax(200px, auto)' }}
          >
            {images.map((image, index) => (
              <SingleImage
                key={image.id}
                index={index}
                id={image.id}
                src={image.src}
                images={images}
                setImages={setImages}
                moveImage={moveImage}
                handleCheckboxChange={handleCheckboxChange}
                handleSelectImage={handleSelectImage}
                selectedImages={selectedImages}
                gridRow={index === 0 ? "span 2" : "span 1"}
                gridColumn={index === 0 ? "span 2" : "span 1"}
              />
            ))
          }
          <AddImage handleInputChange={handleInputChange} />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default ImageGallery;
