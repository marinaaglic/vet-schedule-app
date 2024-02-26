import { useState, useEffect } from "react";
import AppointmentForm from "../forms/AppointmentForm";
import AppointmentService from "../../services/AppointmentService";
import "../../styles/_calendar.scss";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AppointmentDetails from "./AppointmentDetails";
import { BigCalendarProps } from "../../types/calendar";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [appointments, setAppointments] = useState<BigCalendarProps[]>([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);

  const minTime = new Date();
  minTime.setHours(8, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0);

  useEffect(() => {
    getAllAppointments();
  }, [appointments]);

  async function getAllAppointments(): Promise<void> {
    try {
      const appointmentsData = await AppointmentService.viewMyAppointments();

      const formattedAppointments: BigCalendarProps[] = appointmentsData.map(
        (appointment) => {
          const start = new Date(appointment.date + "T" + appointment.time);
          const end = new Date(start.getTime() + 45 * 60000);
          return {
            id: appointment._id,
            title: appointment.description,
            start: start,
            end: end,
            status: appointment.status,
            user: appointment.user,
          };
        }
      );

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
          onSelectEvent={(event) => {
            setSelectedAppointmentId(event.id);
            setShowDetails(true);
            setShowForm(false);
          }}
        />
      </div>
      <button
        className="btn-plus"
        onClick={() => {
          setShowForm(!showForm);
          setShowDetails(false);
        }}
      >
        +
      </button>
      {showForm && (
        <div className="appointment-form">
          <AppointmentForm setShowForm={setShowForm} />
        </div>
      )}
      {selectedAppointmentId && showDetails && (
        <div className="appointment-details">
          <AppointmentDetails
            appointmentId={selectedAppointmentId}
            setShowAppointmentDetails={setShowDetails}
          />
        </div>
      )}
    </div>
  );
}
