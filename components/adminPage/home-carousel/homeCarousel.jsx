"use client";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageInput from "./imageInput";
import ImagePreview from "./imagePreview";
import ProgressBar from "./progressBar";
import ErrorMessage from "./errorMessage";
import {
  fetchImages,
  handleFilesSelected,
  handleDeleteSelected,
  handleDeleteUploaded,
  handleUpload
} from "./uploadImageHandler";

const HomeCarousel = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchImages(setUploadedImages);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full relative">
      <h1 className="font-serif text-3xl py-5 text-amber-800">
      Imágenes en el Carrusel
        </h1>
      <ProgressBar progress={uploadProgress} uploading={uploading} />
      <ImageInput onFilesSelected={(files) => handleFilesSelected(files, selectedFiles, setSelectedFiles, setError)} />
      <ImagePreview
        selectedFiles={selectedFiles}
        onDelete={(index) => handleDeleteSelected(index, setSelectedFiles)}
      />
      <Button
        onClick={() => handleUpload(selectedFiles, setUploading, setUploadProgress, setSelectedFiles, fetchImages, setUploadedImages)}
        disabled={selectedFiles.length === 0 || uploading}
        variant="contained"
        component="span"
        startIcon={<PublishRoundedIcon />}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 1,
          backgroundColor: selectedFiles.length === 0 || uploading ? 'gray' : 'green',
          cursor: selectedFiles.length === 0 || uploading ? 'not-allowed' : 'pointer',
          color: 'white',
          '&:hover': {
            backgroundColor: selectedFiles.length === 0 || uploading ? 'gray' : 'darkgreen',
          },
          textTransform: 'none', // prevent all caps
          fontSize: '16px',
          padding: '8px 16px',
          marginTop: '24px'
        }}
      >
        Subir imágenes
      </Button>
      <ErrorMessage error={error} />
      <h1 className="font-serif text-2xl py-5 mt-8">Imágenes en la base de datos Carrusel</h1>
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

export default HomeCarousel;
