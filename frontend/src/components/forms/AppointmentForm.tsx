import Input from "../reusable/Input";
import "../../styles/_appointmentForm.scss";

type Props = {};

export default function AppointmentForm({}: Props) {
  return (
    <div className="form-wrapper">
      <form className="appointment-form">
        <h3>Book a visit!</h3>
        <Input
          type="description"
          label="Description"
          id="description"
          name="description"
        />
        <Input type="date" label="Date" id="date" name="date" />
        <Input type="time" label="Time" id="time" name="time" />
        <div className="button-div">
          <button className="btn-cancel">Cancel</button>
          <button className="btn-book" type="submit">
            Book
          </button>
        </div>
      </form>
    </div>
  );
}
