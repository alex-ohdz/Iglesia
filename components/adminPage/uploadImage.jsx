"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ImageInput from "./imageInput";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomLinearProgress = styled(LinearProgress)({
  height: 10, // Ajusta la altura de la barra de progreso
  borderRadius: 5,
  backgroundColor: "#ffffff", // Color de fondo de la barra de progreso
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#68d391", // Color de la barra de progreso
  },
});

function UploadImages() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Fetch images from the database on component mount
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/get-images");
        if (response.status === 200) {
          setUploadedImages(response.data);
        } else {
          console.error("Error fetching images");
        }
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, []);

  const handleFilesSelected = (files) => {
    if (files.length + selectedFiles.length > 10) {
      alert("Puedes seleccionar un máximo de 10 imágenes.");
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  };

  const handleDeleteSelected = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDeleteUploaded = async (id) => {
    try {
      const response = await axios.delete("/api/delete-image", { data: { id } });
      if (response.status === 200) {
        setUploadedImages((prevImages) => prevImages.filter((image) => image.id !== id));
      } else {
        console.error("Error deleting image");
      }
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    setUploading(true);
    setUploadProgress(0);

    try {
      const response = await axios.post("/api/upload-images", formData, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.round((current / total) * 100);
          setUploadProgress(percentCompleted);
        },
      });

      if (response.status === 200) {
        const result = response.data;
        console.log("Imágenes subidas:", result);
        setSelectedFiles([]); // Limpiar selección después de la subida
        // Refetch images after upload
        const fetchImages = async () => {
          try {
            const response = await axios.get("/api/get-images");
            if (response.status === 200) {
              setUploadedImages(response.data);
            } else {
              console.error("Error fetching images");
            }
          } catch (error) {
            console.error("Error fetching images", error);
          }
        };
        fetchImages();
      } else {
        console.error("Error subiendo las imágenes");
      }
    } catch (error) {
      console.error("Error subiendo las imágenes", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <ImageInput onFilesSelected={handleFilesSelected} />
      <div className="mt-4 mx-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative h-50">
            <div>
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="w-full h-full object-cover rounded"
              />
              <IconButton
                aria-label="delete"
                className="absolute top-0 right-0"
                onClick={() => handleDeleteSelected(index)}
              >
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <Box
        sx={{
          width: "100%",
          my: 2,
          height: 10, // Aseguramos que el espacio siempre esté reservado
          position: "relative",
        }}
      >
        <CustomLinearProgress
          variant="determinate"
          value={uploadProgress}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            opacity: uploading ? 1 : 0,
            transition: "opacity 0.3s ease-in-out", // Añadimos una transición suave
          }}
        />
      </Box>
      <button
        onClick={handleUpload}
        disabled={selectedFiles.length === 0 || uploading}
        className="flex flex-row justify-center border-2 place-items-center gap-1 border-black bg-green-400 hover:bg-green-800 text-md p-2 mt-4"
      >
        Subir imágenes
      </button>
      <div className="mt-4 mx-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {uploadedImages.map((image, index) => (
          <div key={index} className="relative mt-10">
            <div>
              <img
                src={`data:image/jpeg;base64,${image.data}`}
                alt={`uploaded-${index}`}
                className="w-full h-full object-cover rounded"
              />
              <IconButton
                aria-label="delete"
                className="absolute top-0 right-0"
                onClick={() => handleDeleteUploaded(image.id)}
              >
                <DeleteIcon style={{ color: "red" }} />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadImages;
