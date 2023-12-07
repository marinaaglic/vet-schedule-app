import { InputType } from "../../types/input";
import "../../styles/_input.scss";

function Input({ label, id, ...props }: InputType) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
    </div>
  );
}

export default Input;
