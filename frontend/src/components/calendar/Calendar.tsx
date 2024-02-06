import { useState } from "react";
import AppointmentForm from "../forms/AppointmentForm";
import "../../styles/_calendar.scss";

type Props = {};

export default function Calendar({}: Props) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <button className="btn-plus" onClick={() => setShowForm(!showForm)}>
        +
      </button>

      {showForm && <AppointmentForm setShowForm={setShowForm} />}
    </div>
  );
}
