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
    <div className="relative flex w-full flex-col items-center justify-center">
      <h1 className="py-5 font-display text-3xl text-sanctuary-terracotta">
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
        className="mt-6 flex items-center gap-2 rounded-md bg-sanctuary-terracotta px-4 py-2 font-display tracking-[0.12em] text-sanctuary-cream transition hover:bg-sanctuary-terracotta/90 focus:outline-none focus:ring-2 focus:ring-sanctuary-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-sanctuary-shadow/40"
      >
        <ArrowUpTrayIcon className="h-5 w-5" />
        Subir imágenes
      </button>
      <ErrorMessage error={error} />
      <h1 className="mt-8 py-5 font-display text-2xl text-sanctuary-shadow">Imágenes en la base de datos Carrusel</h1>
      <div className="mx-10 mb-10 mt-4 grid grid-cols-2 gap-4 bg-sanctuary-gold/30 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative h-52">
            <div className="h-40 bg-sanctuary-sky/50">
              <img
                src={resolveImageSrc(image)}
                alt={`uploaded-${index}`}
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                aria-label="Eliminar imagen"
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-sanctuary-shadow shadow transition hover:bg-sanctuary-gold/40"
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
