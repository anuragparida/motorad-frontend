export default function Alert(props) {
  return (
    <div
      className={"alert alert-icon alert-" + props.className}
      role="alert"
      style={{ borderRadius: "6.67019px" }}
    >
      <strong>{props.message}</strong>
    </div>
  );
}