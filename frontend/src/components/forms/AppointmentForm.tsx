import Input from "../reusable/Input";
import { AppointmentProps } from "../../types/appointmentForm";
import { Appointment } from "../../types/appointment";
import "../../styles/_appointmentForm.scss";
import { FormEvent, ChangeEvent, useState } from "react";
import AppointmentService from "../../services/AppointmentService";

export default function AppointmentForm({ setShowForm }: AppointmentProps) {
  const [appointment, setAppointment] = useState<Appointment>({
    _id: "",
    date: "",
    time: "",
    description: "",
    status: "pending",
    user: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

    const selectedDate = new Date(appointment.date);
    const selectedTime = new Date(`01/01/2000 ${appointment.time}`);

    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      setError(
        "Appointments can only be scheduled on work days (Monday to Friday)."
      );
      return;
    }

    const startTime = new Date("01/01/2000 08:00");
    const endTime = new Date("01/01/2000 20:00");
    if (selectedTime < startTime || selectedTime > endTime) {
      setError("Appointments can only be scheduled between 8am and 8pm.");
      return;
    }

    if (appointment.date !== "" && appointment.time !== "") {
      try {
        const appointmentResponse = await AppointmentService.newAppointment(
          appointment
        );
        setSuccess("Your appointment has been scheduled!");
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
        <p className="success">{success ? `${success}` : ""}</p>
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
