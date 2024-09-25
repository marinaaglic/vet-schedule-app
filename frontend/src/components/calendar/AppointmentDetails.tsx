import { ChangeEvent, useState, useEffect } from "react";
import AppointmentService from "../../services/AppointmentService";
import { Appointment } from "../../types/appointment";
import Input from "../reusable/Input";
import "../../styles/_appointmentDetails.scss";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Modal from "../reusable/Modal";

export default function AppointmentDetails({
  appointmentId,
  setShowAppointmentDetails,
}: {
  appointmentId: string;
  setShowAppointmentDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [appointmentDetails, setAppointmentDetails] = useState<Appointment>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [isReadonly, setIsReadonly] = useState<boolean>(true);
  const [appointment, setAppointment] = useState<Appointment>({
    _id: "",
    date: "",
    time: "",
    description: "",
    status: "pending",
    user: "",
  });

  useEffect(() => {
    getDetailsHandler();
  }, [appointmentId]);

  async function getDetailsHandler(): Promise<void> {
    try {
      const responseData = await AppointmentService.viewAppointmentDetails(
        appointmentId
      );
      setAppointmentDetails(responseData);
      setAppointment(responseData);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  }
  async function deleteAppointmentHandler(): Promise<void> {
    try {
      await AppointmentService.deleteAppointment(appointmentId);
      setShowAppointmentDetails(false);
      setShowDeleteModal(false);
    } catch (error) {
      console.log("Error while deleting appointment:", error);
    }
  }
  async function updateAppointmentHandler(): Promise<void> {
    try {
      const appointmentResponse = await AppointmentService.updateAppointment(
        appointmentId,
        appointment
      );
      setAppointmentDetails(appointmentResponse);
      setIsReadonly(true);
      setShowUpdateModal(false);
    } catch (error) {
      console.log("Appointment schedule failed: ", error);
    }
  }
  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  }
  return (
    <div className="div-wrapper-appointment">
      <Modal
        title="Delete Appointment"
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(!showDeleteModal)}
        onAction={deleteAppointmentHandler}
        buttonText="Delete"
      >
        <div>Are you sure you want to delete this appointment?</div>
      </Modal>
      <Modal
        title="Update Appointment"
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(!showUpdateModal)}
        onAction={updateAppointmentHandler}
        buttonText="Update"
      >
        Are you sure you want to make changes to this appointment?
      </Modal>
      <div className="icons-container">
        <FaEdit
          className="icon-edit"
          onClick={() => setIsReadonly((prevState) => !prevState)}
        />
        <FaTrashCan
          className="icon-trash"
          onClick={() => setShowDeleteModal(!showDeleteModal)}
        />
      </div>
      <h3>Appointment Details</h3>
      {appointmentDetails && (
        <div className="appointment-details">
          <Input
            type="text"
            label="Description"
            id="description"
            name="description"
            defaultValue={appointmentDetails.description}
            readOnly={isReadonly}
            onChange={changeHandler}
          />
          <Input
            type="date"
            label="Date"
            id="date"
            name="date"
            defaultValue={appointmentDetails.date}
            readOnly={isReadonly}
            onChange={changeHandler}
          />
          <Input
            type="time"
            label="Time"
            id="time"
            name="time"
            defaultValue={appointmentDetails.time}
            readOnly={isReadonly}
            onChange={changeHandler}
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
        <button className="btn-save" onClick={() => setShowUpdateModal(true)}>
          Save
        </button>
      </div>
    </div>
  );
}
