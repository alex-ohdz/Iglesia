"use client";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageInput from "./home-carousel/imageInput";
import ImagePreview from "./home-carousel/imagePreview";
import ProgressBar from "./home-carousel/progressBar";
import ErrorMessage from "./home-carousel/errorMessage";
import {
  fetchImages,
  handleFilesSelected,
  handleDeleteSelected,
  handleDeleteUploaded,
  handleUpload
} from "./uploadImageHandler";

const UploadImages = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchImages(setUploadedImages);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <ImageInput onFilesSelected={(files) => handleFilesSelected(files, selectedFiles, setSelectedFiles, setError)} />
      <ImagePreview
        selectedFiles={selectedFiles}
        onDelete={(index) => handleDeleteSelected(index, setSelectedFiles)}
      />
      <ProgressBar progress={uploadProgress} uploading={uploading} />
      <button
        onClick={() => handleUpload(selectedFiles, setUploading, setUploadProgress, setSelectedFiles, fetchImages, setUploadedImages)}
        disabled={selectedFiles.length === 0 || uploading}
        className={`flex flex-row justify-center border-2 place-items-center gap-1 border-black ${
          selectedFiles.length === 0 || uploading
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-800 text-white"
        } text-md p-2 mt-4`}
      >
        Subir imágenes
      </button>
      <ErrorMessage error={error} />
      <h1 className="text-lg mt-8">Imágenes en la base de datos Carrusel</h1>
      <div className="bg-gray-200 mt-4 mx-10 mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative h-52">
            <div className="h-40 bg-blue-400">
              <img
                src={`data:image/jpeg;base64,${image.image}`} 
                alt={`uploaded-${index}`}
                className="w-full h-full object-cover rounded"
              />
              <IconButton
                aria-label="delete"
                className="absolute top-0 right-0"
                onClick={() => handleDeleteUploaded(image.id, setUploadedImages)}
              >
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImages;