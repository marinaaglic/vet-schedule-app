import { useState, useEffect } from "react";
import AppointmentForm from "../forms/AppointmentForm";
import AppointmentService from "../../services/AppointmentService";
import "../../styles/_calendar.scss";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface BigCalendarAppointment {
  title: string;
  start: Date;
  end: Date;
  status: string;
  user: string;
}

export default function Calendar({}: BigCalendarAppointment) {
  const [showForm, setShowForm] = useState(false);
  const [appointments, setAppointments] = useState<BigCalendarAppointment[]>(
    []
  );

  const minTime = new Date();
  minTime.setHours(8, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0);

  useEffect(() => {
    getAllAppointments();
  }, []);

  async function getAllAppointments(): Promise<void> {
    try {
      const appointmentsData = await AppointmentService.viewAllAppointments();

      const formattedAppointments: BigCalendarAppointment[] =
        appointmentsData.map((appointment) => {
          const start = new Date(appointment.date + "T" + appointment.time);
          const end = new Date(start.getTime() + 45 * 60000);
          return {
            title: appointment.description,
            start: start,
            end: end,
            status: appointment.status,
            user: appointment.user,
          };
        });

      setAppointments(formattedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }

  return (
    <div className="container">
      <div className="div-calendar">
        <BigCalendar
          localizer={localizer}
          events={appointments}
          min={minTime}
          max={maxTime}
        />
      </div>
      <button className="btn-plus" onClick={() => setShowForm(!showForm)}>
        +
      </button>
      {showForm && (
        <div className="appointment-form">
          <AppointmentForm setShowForm={setShowForm} />
        </div>
      )}
    </div>
  );
}
