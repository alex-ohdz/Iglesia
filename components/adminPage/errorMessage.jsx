
const ErrorMessage = ({ error }) => (
  <div className={`text-red-500 mt-4 ${error ? "visible" : "invisible"}`}>
    {error || " "}
  </div>
);

export default ErrorMessage;
