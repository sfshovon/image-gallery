import React from 'react';

const Header = ({ selectedImages, isAllSelected, handleParentCheckboxChange, deleteImages }) => {
  return (
    <div className="border-b border-b-zinc-950 pb-4">
      {selectedImages.length === 0 ? (
        <h2 className="font-bold text-2xl px-4 sm:px-8">Gallery</h2>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8">
          <div className="flex justify-center items-center gap-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleParentCheckboxChange}
              className="w-6 h-6"
            />
            <span className="text-xl font-bold">
              {selectedImages.length === 1
                ? `${selectedImages.length} File Selected`
                : `${selectedImages.length} Files Selected`}
            </span>
          </div>
          <span
            className="text-red-600 text-xl font-bold cursor-pointer mt-4 sm:mt-0 hover:underline"
            onClick={deleteImages}
          >
            {selectedImages.length === 1 ? 'Delete File' : 'Delete Files'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
