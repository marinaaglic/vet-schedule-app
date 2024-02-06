import Input from "../reusable/Input";
import { AppointmentProps } from "../../types/appointmentForm";
import "../../styles/_appointmentForm.scss";

export default function AppointmentForm({ setShowForm }: AppointmentProps) {
  return (
    <div className="form-wrapper-appointment">
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
          <button
            type="button"
            className="btn-cancel"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          <button className="btn-book" type="submit">
            Book
          </button>
        </div>
      </form>
    </div>
  );
}
