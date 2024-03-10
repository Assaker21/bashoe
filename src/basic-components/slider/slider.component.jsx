import "./slider.component.scss";

export default function Slider({ ...props }) {
  return (
    <label class="slider">
      <input {...props} type="range" class="level" />
    </label>
  );
}
