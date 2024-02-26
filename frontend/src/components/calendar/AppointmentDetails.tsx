import { useState, useEffect } from "react";
import AppointmentService from "../../services/AppointmentService";
import { Appointment } from "../../types/appointment";
import Input from "../reusable/Input";
import "../../styles/_appointmentDetails.scss";

export default function AppointmentDetails({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const [appointmentDetails, setAppointmentDetails] = useState<Appointment>();

  useEffect(() => {
    getDetailsHandler();
  }, [appointmentId]);
  async function getDetailsHandler(): Promise<void> {
    try {
      const responseData = await AppointmentService.viewAppointmentDetails(
        appointmentId
      );
      setAppointmentDetails(responseData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }
  return (
    <div className="div-wrapper-appointment">
      <h3>Appointment Details</h3>

      {appointmentDetails && (
        <div className="appointment-details">
          <Input
            label="Description"
            id="description"
            value={appointmentDetails.description}
            readOnly
          />
          <Input
            label="Date"
            id="date"
            value={appointmentDetails.date}
            readOnly
          />
          <Input
            label="Time"
            id="time"
            value={appointmentDetails.time}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
