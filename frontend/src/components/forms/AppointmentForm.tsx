import Input from "../reusable/Input";
import { AppointmentProps } from "../../types/appointmentForm";
import { Appointment } from "../../types/appointment";
import "../../styles/_appointmentForm.scss";
import { FormEvent, ChangeEvent, useState } from "react";
import AppointmentService from "../../services/AppointmentService";

export default function AppointmentForm({ setShowForm }: AppointmentProps) {
  const [appointment, setAppointment] = useState<Appointment>({
    date: "",
    time: "",
    description: "",
    status: "pending",
    user: "",
  });
  const [error, setError] = useState("");
  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setAppointment({ ...appointment, [event.target.name]: event.target.value });
  }
  async function submitHandler(event: FormEvent) {
    event.preventDefault();
    if (appointment.date === "" && appointment.time === "") {
      setError("Both date and time are required.");
    } else if (appointment.date === "") {
      setError("Date is required.");
    } else if (appointment.time === "") {
      setError("Time is required.");
    }

    if (appointment.date !== "" && appointment.time !== "") {
      try {
        const appointmentResponse = await AppointmentService.newAppointment(
          appointment
        );
        console.log("Appointment scheduled.", appointmentResponse);
      } catch (error) {
        console.log("Appointment schedule failed: ", error);
      }
    }
  }
  return (
    <div className="form-wrapper-appointment">
      <form className="appointment-form" onSubmit={submitHandler}>
        <h3>Book a visit!</h3>
        <Input
          type="text"
          label="Description"
          id="description"
          name="description"
          onChange={changeHandler}
        />
        <Input
          type="date"
          label="Date"
          id="date"
          name="date"
          onChange={changeHandler}
        />
        <Input
          type="time"
          label="Time"
          id="time"
          name="time"
          onChange={changeHandler}
        />
        <p className="error">{error ? `${error}` : ""}</p>
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
