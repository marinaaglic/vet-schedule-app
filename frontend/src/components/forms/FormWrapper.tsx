import { FormWrapperType } from "../../types/formWrapper";
import "../../styles/_formWrapper.scss";

export default function FormWrapper({ title, children }: FormWrapperType) {
  return (
    <>
      <h3 className="form-wrapper-title">{title}</h3>
      <div className="form-wrapper-div">{children}</div>
    </>
  );
}
