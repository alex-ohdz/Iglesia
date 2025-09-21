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
        className="bg-white drop-shadow-md rounded-md w-64 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
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
          <div className="flex flex-col p-4 gap-y-1 text-sanctuaryDeep/80 ">
            <div className="flex items-center gap-2 ">
              <CalendarDaysIcon className="h-4 w-4 text-sanctuaryTerracotta" />
              <p className="text-xs">{date}</p>
            </div>
            <h1 className="text-base text-sanctuaryBrick font-semibold font-display">{title}</h1>
            <p className="text-sm overflow-hidden h-16 text-ellipsis line-clamp-3">{text}</p>
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
