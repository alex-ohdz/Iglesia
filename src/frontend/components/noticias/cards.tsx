"use client";
import { useState } from "react";
import { CalendarDaysIcon } from "@components/icons";
import DialogCard from "./dialog";

const Cards = ({ title, text, imageUrl, date, itemKey }) => {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <div
        className="w-64 rounded-md bg-sanctuary-cream drop-shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        onClick={toggleDialog}
        key={itemKey}
      >
        <div className="flex flex-col rounded-xl font-body">
          <div className="flex justify-center">
            <img
              src={imageUrl}
              className="object-cover w-full h-44 rounded-t-md"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-y-1 p-4 text-sanctuary-shadow/80">
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="h-4 w-4 text-sanctuary-terracotta" />
              <p className="text-xs">{date}</p>
            </div>
            <h1 className="font-display text-base text-sanctuary-shadow">{title}</h1>
            <p className="text-sm line-clamp-3 h-16 overflow-hidden text-ellipsis">{text}</p>
          </div>
        </div>
      </div>
      <DialogCard
        open={open}
        handleClose={toggleDialog}
        title={title}
        date={date}
        text={text}
        imageUrl={imageUrl}
      />
    </>
  );
};

export default Cards;
