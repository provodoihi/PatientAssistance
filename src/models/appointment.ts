import axios from 'axios';
import {types, Instance, flow} from 'mobx-state-tree';
import {API_LIST} from '../utils';

export type AppointmentBookingType = {
  appointmentStartTime: string | Date;
  description: string;
  nameOfClinic: string;
  nameOfPatient: string;
  clinicId: string | number;
  patientId: string | number;
  phoneOfPatient: string;
};

const AppointmentData = types.model({
  id: types.maybeNull(types.union(types.string, types.number)),
  appointmentStartTime: types.maybeNull(types.union(types.Date, types.string)),
  description: types.maybeNull(types.string),
  nameOfClinic: types.maybeNull(types.string),
  nameOfPatient: types.maybeNull(types.string),
  clinicId: types.maybeNull(types.union(types.string, types.number)),
  patientId: types.maybeNull(types.union(types.string, types.number)),
  status: types.maybeNull(types.string),
});

export type AppointmentDataType = Instance<typeof AppointmentData>;

export const Appointment = types
  .model({
    appointmentList: types.array(AppointmentData),
    singleAppointment: types.optional(AppointmentData, {}),
    responseStatus: types.maybeNull(types.number),
  })
  .actions(self => ({
    getAppointmentList: flow(function* (
      userId: string | number,
      token: string,
    ) {
      try {
        let response = yield axios.get(
          API_LIST.appointmentFindPatient + userId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data) {
          self.appointmentList = response.data;
          self.responseStatus = response.status;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }),
    getAppointmentByID: flow(function* (id: string | number, token: string) {
      try {
        let response = yield axios.get(API_LIST.appointmentGeneral + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          self.singleAppointment = response.data;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }),
    bookAppointment: flow(function* (
      token: string | number,
      data: AppointmentBookingType,
    ) {
      try {
        const response = yield axios.post(API_LIST.appointmentGeneral, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }),
  }));
