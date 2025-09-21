import React from "react";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "@components/icons";

const ImagePreview = ({ selectedFiles, onDelete, moveImage }) => (
  <div className="mx-10 mt-4 grid grid-cols-2 gap-4 bg-sanctuary-gold/30 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    {selectedFiles.map((file, index) => (
      <div key={index} className="relative h-52">
        <div className="h-40">
          <img
            src={URL.createObjectURL(file)}
            alt={`preview-${index}`}
            className="h-full w-full rounded object-cover"
          />
          <div className="mt-2 flex items-center justify-between">
            <button
              type="button"
              aria-label="Mover a la izquierda"
              onClick={() => moveImage(index, -1)}
              disabled={index === 0}
              className="rounded-md p-1 text-sanctuary-shadow transition hover:bg-sanctuary-gold/40 disabled:cursor-not-allowed disabled:text-sanctuary-shadow/40"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Eliminar imagen"
              onClick={() => onDelete(index)}
              className="rounded-md p-1 text-sanctuary-terracotta transition hover:bg-sanctuary-gold/40"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Mover a la derecha"
              onClick={() => moveImage(index, 1)}
              disabled={index === selectedFiles.length - 1}
              className="rounded-md p-1 text-sanctuary-shadow transition hover:bg-sanctuary-gold/40 disabled:cursor-not-allowed disabled:text-sanctuary-shadow/40"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ImagePreview;
