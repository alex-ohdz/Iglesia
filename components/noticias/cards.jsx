import React from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const Cards = ({ title, text, imageUrl, date }) => {
  return (
    <div className="bg-white drop-shadow-md rounded-md w-64">
      <div className="flex flex-col rounded-xl font-merriweather">
        <div className="flex justify-center">
          <img
            src={imageUrl}
            className="object-cover w-full h-48 rounded-t-md"
            alt=""
          />
        </div>
        <div className="flex flex-col p-4 gap-y-1 text-gray-500 ">
          <div className="flex items-center gap-2 ">
            <CalendarTodayOutlinedIcon className="text-xs" />
            <p className="text-xs">{date}</p>
          </div>
          <h1 className="text-base text-black font-semibold">{title}</h1>
          <p className="text-sm overflow-hidden">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
