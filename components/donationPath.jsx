import BtnHome from "@components/btnHome";

export default function DonationPath() {
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 bg-gray-100 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">¡Gracias por tu donación!</h1>
        <p>Tu donación ha sido procesada exitosamente.</p>
      </div>
<div className="flex items-center justify-center mt-16">
      <BtnHome
        href="/"
        text="Volver al Inicio"
        className=" bg-green-500 "
        rounded="rounded-md"
      />
      </div>
    </>
  );
}

