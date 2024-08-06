import "./input.component.scss";

export default function Input({ label, style, textarea, ...rest }) {
  return (
    <div className="input-container" style={{ ...style }}>
      <label>{label}</label>
      {textarea ? <textarea {...rest} /> : <input {...rest} />}
    </div>
  );
}
