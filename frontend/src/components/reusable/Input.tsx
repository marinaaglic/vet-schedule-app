import { InputType } from "../../types/input";
import "../../styles/_input.scss";
import { forwardRef } from "react";

function Input(
  { label, id, error, ...props }: InputType,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>
        {label} {error && <span className="error">({error})</span>}
      </label>
      <input id={id} name={id} ref={ref} {...props} />{" "}
    </div>
  );
}

export default forwardRef(Input);
