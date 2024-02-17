import axios, { AxiosResponse } from "axios";
import { Appointment } from "../types/appointment";
import { AuthResponse } from "../types/user";

const baseURL = "http://localhost:8080/appointments";

const AppointmentService = {
  newAppointment: async (appointment: Appointment) => {
    try {
      const token = localStorage.getItem("token");
      const response: AxiosResponse<AuthResponse> = await axios.post(
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
};

export default AppointmentService;
