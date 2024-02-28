import axios, { AxiosResponse } from "axios";
import { Appointment } from "../types/appointment";

const baseURL = "http://localhost:8080/appointments";

const AppointmentService = {
  newAppointment: async (appointment: Appointment) => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<Appointment> = await axios.post(
        `${baseURL}/new-appointment`,
        appointment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  viewAllAppointments: async () => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<Appointment[]> = await axios.get(
        `${baseURL}/all-appointments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  viewMyAppointments: async () => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<Appointment[]> = await axios.get(
        `${baseURL}/my-appointments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  viewAppointmentDetails: async (appointmentId: String) => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<Appointment> = await axios.get(
        `${baseURL}/appointment-details/${appointmentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  deleteAppointment: async (appointmentId: String) => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<Appointment> = await axios.delete(
        `${baseURL}/appointment/${appointmentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
  updateAppointment: async (
    appointmentId: String,
    appointment: Appointment
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<Appointment> = await axios.put(
        `${baseURL}/appointment-edit/${appointmentId}`,
        appointment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  },
};

export default AppointmentService;
