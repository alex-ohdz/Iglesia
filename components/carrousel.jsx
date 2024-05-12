import React from "react";

const Carrousel = () => {
  return (
    <div className="flex h-screen w-auto bg-slate-400 items-center justify-center ">
      <div className="container w-5/6 shadow-md">
      <img src="/images/sbr.jpg"  alt="" />
      </div>

      {/* <picture className="container aspect-square w-1/2 h-1">
        <img src="/images/sbr.jpg" w alt="" />
      </picture> */}
    </div>
  );
};

export default Carrousel;
