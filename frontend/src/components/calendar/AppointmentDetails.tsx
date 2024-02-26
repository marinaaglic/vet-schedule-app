import { useState, useEffect } from "react";
import AppointmentService from "../../services/AppointmentService";
import { Appointment } from "../../types/appointment";
import Input from "../reusable/Input";
import "../../styles/_appointmentDetails.scss";
import { FaTrashCan } from "react-icons/fa6";

export default function AppointmentDetails({
  appointmentId,
  setShowAppointmentDetails,
}: {
  appointmentId: string;
  setShowAppointmentDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [appointmentDetails, setAppointmentDetails] = useState<Appointment>();
  //const [showConfirmation, setShowConfirmation] = useState(false);

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
      console.error("Error fetching appointment details:", error);
    }
  }
  async function deleteAppointmentHandler(): Promise<void> {
    try {
      await AppointmentService.deleteAppointment(appointmentId);
      setShowAppointmentDetails(false);
    } catch (error) {
      console.log("Error while deleting appointment:", error);
    }
  }
  return (
    <div className="div-wrapper-appointment">
      <FaTrashCan
        className="icon-trash"
        onClick={() => deleteAppointmentHandler()}
      />

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
      <div className="button-div">
        <button
          type="button"
          className="btn-cancel"
          onClick={() => setShowAppointmentDetails(false)}
        >
          Close
        </button>
        <button className="btn-save">Save</button>
      </div>
    </div>
  );
}
