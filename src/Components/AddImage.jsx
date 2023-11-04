import React from 'react';
import ImageIcon from '../assets/ImageIcon';

const AddImage = ({ handleInputChange }) => {
  return (
    <div className="border-2 border-dashed border-gray-400 text-black text-center cursor-pointer flex items-center justify-center rounded-2xl bg-gray-100">
      <label htmlFor="imageInput">
        <div className="flex flex-col items-center">
          <ImageIcon/>
          <span className="text-xl font-bold">Add Images</span>
        </div>
      </label>
      <input
        id="imageInput"
        type="file"
        onChange={handleInputChange}
        multiple
        className="hidden"
      />
    </div>
  );
};

export default AddImage;