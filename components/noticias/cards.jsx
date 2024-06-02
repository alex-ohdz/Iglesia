import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
const Cards = ({ index, title, text, imageUrl }) => {
  return (
    <div key={index} className="bg-white shadow-lg shadow-gray-400 rounded-2xl w-80">
      <div className="flex flex-col rounded-xl font-merriweather text-lg">
        <div className="flex justify-center">
          <img
            src={imageUrl}
            className="object-cover w-full h-48 rounded-t-xl"
            alt="Flores de Mayo"
          />
        </div>
        <div className="flex flex-col p-4 space-y-2 text-gray-500">
          <div className="flex items-center gap-2">
            <CalendarTodayOutlinedIcon className="text-base" />
            <p className="text-base">30 de mayo</p>
          </div>
          <h1 className="text-lg  text-black font-semibold">{title}</h1>
          <p className="text-base overflow-hidden">
           {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
