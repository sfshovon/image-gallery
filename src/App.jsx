import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ImageGallery from './Components/ImageGallery';
import allImages from './images';


const App = () => {
  const [images, setImages] = useState(allImages);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const handleInputChange = (e) => {
    const files = e.target.files;
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const src = URL.createObjectURL(file);
      const id = uuidv4();
      newImages.push({ id, src });
    }
    addImagesFromFile(newImages);
  };

  const addImagesFromFile = (newImages) => {
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
  };

  const deleteImages = () => {
    const selectedIds = selectedImages.map((selected) => selected.id);
    const updatedImages = images.filter((image) => !selectedIds.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const handleCheckboxChange = (image) => {
    handleSelectImage(image);
  };

  const handleParentCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsAllSelected(checked);
    if (checked) {
      setSelectedImages(images);
    } 
    else {
      setSelectedImages([]);
    }
  };

  const handleSelectImage = (image) => {
    if (selectedImages.some((selected) => selected.id === image.id)) {
      setSelectedImages(selectedImages.filter((selected) => selected.id !== image.id));
    } 
    else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const dragImage = images[dragIndex];
    const newImages = [...images];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, dragImage);
    setImages(newImages);
  };

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints);
  }, []);

  return (
    <ImageGallery
      images={images}
      setImages={setImages}
      selectedImages={selectedImages}
      isAllSelected={isAllSelected}
      isTouchDevice={isTouchDevice}
      moveImage={moveImage}
      handleInputChange={handleInputChange}
      deleteImages={deleteImages}
      handleCheckboxChange={handleCheckboxChange}
      handleSelectImage={handleSelectImage}
      handleParentCheckboxChange={handleParentCheckboxChange}
    />
  )
}

export default App;
