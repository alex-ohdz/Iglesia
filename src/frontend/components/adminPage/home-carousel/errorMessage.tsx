
const ErrorMessage = ({ error }) => (
  <div className={`mt-4 text-sanctuary-terracotta ${error ? "visible" : "invisible"}`}>
    {error || " "}
  </div>
);

export default ErrorMessage;
