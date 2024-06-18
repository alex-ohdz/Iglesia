export default function Donations() {
  return (
    <form id="donation-form">
      <input
        type="text"
        id="donor-name"
        placeholder="Nombre del donante"
        required
      />
      <input
        type="email"
        id="donor-email"
        placeholder="Correo electrónico"
        required
      />
      <input
        type="number"
        id="donation-amount"
        placeholder="Monto de la donación"
        required
      />
      <div id="card-element">Stripe Elements </div>
      <button type="submit">Donar</button>
    </form>
  );
}
