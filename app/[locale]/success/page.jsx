import BtnHome from "@components/btnHome";

export default function SuccessPage() {
  return (
    <>
      <div className="p-4 text-center mb-5">
        <h1 className="text-3xl font-bold mb-4 text-center">
          ¡Gracias por tu donación!
        </h1>
        <p>Tu donación ha sido procesada exitosamente.</p>
      </div>

      <BtnHome isCentered />
    </>
  );
}
