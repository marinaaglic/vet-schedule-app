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
  const [message, setMessage] = useState("");
  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setAppointment({ ...appointment, [event.target.name]: event.target.value });
  }
  async function submitHandler(event: FormEvent) {
    event.preventDefault();

    const selectedDate = new Date(appointment.date);
    const selectedTime = new Date(`01/01/2000 ${appointment.time}`);
    const startTime = new Date("01/01/2000 08:00");
    const endTime = new Date("01/01/2000 20:00");

    if (appointment.date === "" && appointment.time === "") {
      setMessage("Both date and time are required.");
      return;
    } else if (appointment.date === "") {
      setMessage("Date is required.");
      return;
    } else if (appointment.time === "") {
      setMessage("Time is required.");
      return;
    } else if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      setMessage(
        "Appointments can only be scheduled on work days (Monday to Friday)."
      );
      return;
    } else if (selectedTime < startTime || selectedTime > endTime) {
      setMessage("Appointments can only be scheduled between 8am and 8pm.");
      return;
    }

    if (appointment.date !== "" && appointment.time !== "") {
      try {
        const appointmentResponse = await AppointmentService.newAppointment(
          appointment
        );
        setMessage("Your appointment has been scheduled!");
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
        <p className="message">{message ? `${message}` : ""}</p>
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
