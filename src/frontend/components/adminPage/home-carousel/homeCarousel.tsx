"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpTrayIcon, TrashIcon } from "@components/icons";
import ImageInput from "./imageInput";
import ImagePreview from "./imagePreview";
import ProgressBar from "./progressBar";
import ErrorMessage from "./errorMessage";
import {
  fetchImages,
  handleFilesSelected,
  handleDeleteSelected,
  handleDeleteUploaded,
  handleUpload,
  type CarouselItem,
} from "./uploadImageHandler";

const HomeCarousel = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<CarouselItem[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchImages(setUploadedImages);
  }, []);

  const resolveImageSrc = (image: CarouselItem) => {
    if (image.image) {
      return image.image.startsWith("data:")
        ? image.image
        : `data:image/jpeg;base64,${image.image}`;
    }

    const url = image.image_url ?? image.imageUrl;
    return url ?? "";
  };

  return (
    <div className="flex flex-col justify-center items-center w-full relative">
      <h1 className="font-serif text-3xl py-5 text-amber-800">
        Imágenes en el Carrusel
      </h1>
      <ProgressBar progress={uploadProgress} uploading={uploading} />
      <ImageInput
        onFilesSelected={(files) =>
          handleFilesSelected(files, selectedFiles, setSelectedFiles, setError)
        }
      />
      <ImagePreview
        selectedFiles={selectedFiles}
        onDelete={(index) => handleDeleteSelected(index, setSelectedFiles)}
      />
      <button
        type="button"
        onClick={() =>
          handleUpload(
            selectedFiles,
            setUploading,
            setUploadProgress,
            setSelectedFiles,
            fetchImages,
            setUploadedImages
          )
        }
        disabled={selectedFiles.length === 0 || uploading}
        className="mt-6 flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        <ArrowUpTrayIcon className="h-5 w-5" />
        Subir imágenes
      </button>
      <ErrorMessage error={error} />
      <h1 className="font-serif text-2xl py-5 mt-8">Imágenes en la base de datos Carrusel</h1>
      <div className="bg-gray-200 mt-4 mx-10 mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative h-52">
            <div className="h-40 bg-blue-400">
              <img
                src={resolveImageSrc(image)}
                alt={`uploaded-${index}`}
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                aria-label="Eliminar imagen"
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-red-600 shadow transition hover:bg-red-100"
                onClick={() => handleDeleteUploaded(image.id, setUploadedImages)}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
