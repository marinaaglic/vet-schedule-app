import { FormWrapperType } from "../../types/formWrapper";
import "../../styles/_formWrapper.scss";

export default function FormWrapper({ title, children }: FormWrapperType) {
  return (
    <>
      <h2 className="form-wrapper-h2">{title}</h2>
      <div className="form-wrapper-div">{children}</div>
    </>
  );
}
