import BtnHome from "@components/btnHome";
export default function CancelPage() {
  return (
    <>
      <div className="p-4 text-center mb-5">
        <h1 className="text-3xl font-bold mb-4">Pago cancelado</h1>
        <p>Tu donación ha sido cancelada. Puedes intentarlo de nuevo.</p>
      </div>
      <BtnHome isCentered />
    </>
  );
}
