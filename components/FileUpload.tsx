
import React, { useCallback, useState } from 'react';

interface FileUploadProps {
  onImageUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0].type.startsWith('image/')) {
        onImageUpload(e.dataTransfer.files[0]);
      }
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <div 
      className={`w-full max-w-2xl text-center p-8 border-2 border-dashed rounded-xl transition-all duration-300 ${isDragging ? 'border-cyan-400 bg-gray-700/50' : 'border-gray-600'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 transition-colors ${isDragging ? 'text-cyan-400' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xl font-semibold text-gray-300">Drag & drop your image here</p>
        <p className="text-gray-500">or</p>
        <span className="bg-gray-700 hover:bg-gray-600 text-cyan-300 font-bold py-2 px-6 rounded-lg transition-colors">
          Browse Files
        </span>
      </label>
    </div>
  );
};

export default FileUpload;
