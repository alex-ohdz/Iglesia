import axios from "axios";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB

export type CarouselItem = {
  id: number;
  image?: string;
  image_url?: string;
  imageUrl?: string;
};

type CarouselResponse = {
  success?: boolean;
  data?: CarouselItem[];
};

export const fetchImages = async (setUploadedImages: (images: CarouselItem[]) => void) => {
  try {
    const response = await axios.get<CarouselResponse>("/api/getCarousel");
    if (response.status === 200 && Array.isArray(response.data.data)) {
      setUploadedImages(response.data.data);
    } else {
      console.error("Error fetching images");
    }
  } catch (error) {
    console.error("Error fetching images", error);
  }
};

export const handleFilesSelected = (
  files: FileList | File[],
  selectedFiles: File[],
  setSelectedFiles: (files: File[] | ((prevFiles: File[]) => File[])) => void,
  setError: (message: string) => void
) => {
  const newFiles = Array.isArray(files) ? files : Array.from(files ?? []);
  const oversizedFiles = newFiles.filter((file) => file.size > MAX_IMAGE_SIZE);

  if (oversizedFiles.length > 0) {
    setError("Una o más imágenes superan el límite de tamaño de 4 MB.");
    return;
  }

  if (newFiles.length + selectedFiles.length > 10) {
    setError("You can select up to 10 images.");
    return;
  }

  setError("");
  setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
};

export const handleDeleteSelected = (
  index: number,
  setSelectedFiles: (updater: (prevFiles: File[]) => File[]) => void
) => {
  setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
};

export const handleDeleteUploaded = async (
  id: number,
  setUploadedImages: (updater: (prevImages: CarouselItem[]) => CarouselItem[]) => void
) => {
  try {
    const response = await axios.delete<CarouselResponse>("/api/deleteCarousel", {
      data: { id },
    });
    if (response.status === 200 && response.data.success) {
      setUploadedImages((prevImages) => prevImages.filter((image) => image.id !== id));
    } else {
      console.error("Error deleting image");
    }
  } catch (error) {
    console.error("Error deleting image", error);
  }
};

export const handleUpload = async (
  selectedFiles: File[],
  setUploading: (state: boolean) => void,
  setUploadProgress: (progress: number) => void,
  setSelectedFiles: (files: File[]) => void,
  refreshImages: typeof fetchImages,
  setUploadedImages: (images: CarouselItem[] | ((prev: CarouselItem[]) => CarouselItem[])) => void
) => {
  const formData = new FormData();
  selectedFiles.forEach((file) => {
    formData.append("images", file);
  });

  setUploading(true);
  setUploadProgress(0);

  try {
    const response = await axios.post<CarouselResponse>("/api/addCarousel", formData, {
      onUploadProgress: (progressEvent) => {
        const total = progressEvent.total ?? 1;
        const current = progressEvent.loaded;
        const percentCompleted = Math.round((current / total) * 100);
        setUploadProgress(percentCompleted);
      },
    });

    if (response.status === 200 && response.data.success) {
      setSelectedFiles([]);
      refreshImages(setUploadedImages);
    } else {
      console.error("Error subiendo las imágenes");
    }
  } catch (error) {
    console.error("Error subiendo las imágenes", error);
  } finally {
    setUploading(false);
  }
};
