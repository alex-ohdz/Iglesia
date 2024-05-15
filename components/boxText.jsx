const BoxText = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-serif my-7 text-amber-900 text-center">
        Bienvenidos a Nuestra Comunidad
      </h1>
      <div className="">
        <div className="flex justify-center">
          {/* sm:col-span-4 md:col-span-3 row-span-2 sm:row-span-1 md:row-span-1 */}
          <img src="images/prueba3.jpg" alt="" className="h-80" />
        </div>
        <div className="">
          {/* sm:col-span-4 md:col-span-2 row-span-2 sm:row-span-1 md:row-span-1 */}
          <p className="text-amber-800 font-serif leading-relaxed  bg-red-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            laborum necessitatibus aspernatur nisi hic totam quidem et error
            facere inventore. Necessitatibus dolorem dicta sequi ipsum esse
            recusandae .
          </p>
        </div>
      </div>
    </div>
  );
};

export default BoxText;
