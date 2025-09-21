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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files?.length) {
      handleFilesSelected(
        event.dataTransfer.files,
        selectedFiles,
        setSelectedFiles,
        setError
      );
    }
  };

  const handleMoveSelectedImage = (index: number, direction: number) => {
    setSelectedFiles((prevFiles) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= prevFiles.length) {
        return prevFiles;
      }

      const updated = [...prevFiles];
      const temp = updated[index];
      updated[index] = updated[nextIndex];
      updated[nextIndex] = temp;
      return updated;
    });
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,420px),1fr] xl:items-start">
      <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-inner">
        <header>
          <h2 className="text-2xl font-bold text-sanctuaryBrick">
            Cargar nuevas imágenes
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Arrastra tus archivos a la zona inferior o utiliza el botón para
            seleccionarlos. Puedes organizar el orden antes de subirlos.
          </p>
        </header>
        <div
          className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-sanctuaryTerracotta/50 bg-white px-6 text-center text-slate-500 transition hover:border-sanctuaryTerracotta"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span className="text-sm font-medium uppercase tracking-wide text-sanctuaryTerracotta">
            Zona de carga
          </span>
          <p className="max-w-sm text-sm leading-6">
            Arrastra y suelta tus imágenes aquí o utiliza el botón inferior.
            Admitimos hasta 10 archivos con un máximo de 4 MB cada uno.
          </p>
          <ImageInput
            onFilesSelected={(files) =>
              handleFilesSelected(
                files,
                selectedFiles,
                setSelectedFiles,
                setError
              )
            }
          />
        </div>
        <ImagePreview
          selectedFiles={selectedFiles}
          onDelete={(index) => handleDeleteSelected(index, setSelectedFiles)}
          onMove={handleMoveSelectedImage}
        />
        <ErrorMessage error={error} />
        <div className="flex flex-col gap-4">
          {(uploading || uploadProgress > 0) && (
            <ProgressBar progress={uploadProgress} uploading={uploading} />
          )}
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
            className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
            Subir imágenes
          </button>
        </div>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-sanctuaryBrick">
            Biblioteca actual
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Estas son las imágenes visibles en el carrusel del sitio. Puedes
            eliminar las que ya no necesites.
          </p>
        </header>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {uploadedImages.map((image, index) => (
            <article
              key={image.id ?? index}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow"
            >
              <img
                src={resolveImageSrc(image)}
                alt={`Imagen carrusel ${index + 1}`}
                className="h-48 w-full object-cover"
              />
              <div className="absolute right-3 top-3">
                <button
                  type="button"
                  aria-label="Eliminar imagen"
                  className="rounded-full bg-white/95 p-2 text-red-600 shadow transition hover:bg-red-100"
                  onClick={() => handleDeleteUploaded(image.id, setUploadedImages)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </article>
          ))}
          {uploadedImages.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
              No hay imágenes almacenadas actualmente. Sube nuevas fotos para
              actualizar el carrusel del sitio.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeCarousel;
