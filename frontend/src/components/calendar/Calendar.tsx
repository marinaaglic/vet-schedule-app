import { useState } from "react";
import AppointmentForm from "../forms/AppointmentForm";
import "../../styles/_calendar.scss";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

type Props = {};

export default function Calendar({}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  const minTime = new Date();
  minTime.setHours(8, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0);

  return (
    <div className="container">
      <div className="div-calendar">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
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
