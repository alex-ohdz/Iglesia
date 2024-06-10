"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ImageInput from "./imageInput";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CustomLinearProgress = styled(LinearProgress)({
  height: 10, // Ajusta la altura de la barra de progreso
  borderRadius: 5,
  backgroundColor: "#ffffff", // Color de fondo de la barra de progreso
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#68d391", // Color de la barra de progreso
  },
});

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB

function UploadImages() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch images from the database on component mount
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/carousel-CRUD");
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
    const newFiles = Array.from(files);
    const oversizedFiles = newFiles.filter(
      (file) => file.size > MAX_IMAGE_SIZE
    );

    if (oversizedFiles.length > 0) {
      setError("Una o más imágenes superan el límite de tamaño de 4 MB.");
      return;
    }

    if (newFiles.length + selectedFiles.length > 10) {
      setError("You can select up to 10 images.");
      return;
    }

    setError(""); // Clear any previous error
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDeleteSelected = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDeleteUploaded = async (id) => {
    try {
      const response = await axios.delete("/api/carousel-CRUD", {
        data: { id },
      });
      if (response.status === 200) {
        setUploadedImages((prevImages) =>
          prevImages.filter((image) => image.id !== id)
        );
      } else {
        console.error("Error deleting image");
      }
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  const moveImage = (index, direction) => {
    const newFiles = [...selectedFiles];
    const [movedFile] = newFiles.splice(index, 1);
    newFiles.splice(index + direction, 0, movedFile);
    setSelectedFiles(newFiles);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    setUploading(true);
    setUploadProgress(0);

    try {
      const response = await axios.post("/api/carousel-CRUD", formData, {
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
            const response = await axios.get("/api/carousel-CRUD");
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
      <div className="bg-green-100 mt-4 mx-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative h-52 ">
            <div className="h-40">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="w-full h-full object-cover rounded"
              />
              <div className="flex justify-between mt-2">
                <IconButton
                  aria-label="move-left"
                  onClick={() => moveImage(index, -1)}
                  disabled={index === 0}
                >
                  <ArrowBackIcon style={{ color: index === 0 ? "gray" : "black" }} />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteSelected(index)}
                >
                  <DeleteIcon style={{ color: "red" }} />
                </IconButton>
                <IconButton
                  aria-label="move-right"
                  onClick={() => moveImage(index, 1)}
                  disabled={index === selectedFiles.length - 1}
                >
                  <ArrowForwardIcon style={{ color: index === selectedFiles.length - 1 ? "gray" : "black" }} />
                </IconButton>
              </div>
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
        className={`flex flex-row justify-center border-2 place-items-center gap-1 border-black ${
          selectedFiles.length === 0 || uploading
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-800 text-white"
        } text-md p-2 mt-4`}
      >
        <PublishRoundedIcon className="" />
        <p>Subir imágenes</p>
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <h1 className="text-lg mt-8">Imágenes en la base de datos</h1>
      <div className="bg-gray-200 mt-4 mx-10 mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {uploadedImages.map((image, index) => (
              <div key={index} className="relative h-52 ">
              <div className="h-40 bg-blue-400">
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
