"use client";
import { useState } from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
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
        <div className="flex flex-col rounded-xl font-merriweather">
          <div className="flex justify-center">
            <img
              src={imageUrl}
              className="object-cover w-full h-44 rounded-t-md"
              alt=""
            />
          </div>
          <div className="flex flex-col p-4 gap-y-1 text-gray-500 ">
            <div className="flex items-center gap-2 ">
              <CalendarTodayOutlinedIcon className="text-xs" />
              <p className="text-xs">{date}</p>
            </div>
            <h1 className="text-base text-black font-semibold">{title}</h1>
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
