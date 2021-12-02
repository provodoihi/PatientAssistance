import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

export const SignUpSchema = yupResolver(
  yup.object().shape({
    username: yup.string().required('This is required field'),
    email: yup
      .string()
      .email('Email format is not correct')
      .required('This is required field'),
    password: yup.string().required('This is required field'),
    firstname: yup.string().required('This is required field'),
    lastname: yup.string().required('This is required field'),
    phone: yup.string().required('This is required field'),
    address: yup.string().required('This is required field'),
    age: yup
      .number()
      .typeError('Age must be a number')
      .positive('Age format is incorrect')
      .integer('Ager format is incorrect')
      .required('This is required field'),
    sex: yup.string().required('This is required field'),
  }),
);

export const SignInSchema = yupResolver(
  yup.object().shape({
    username: yup.string().required('This is required field'),
    password: yup.string().required('This is required field'),
  }),
);

export const UpdateProfileSchema = yupResolver(
  yup.object().shape({
    firstname: yup.string().required('This is required field'),
    lastname: yup.string().required('This is required field'),
    address: yup.string().required('This is required field'),
    age: yup
      .number()
      .typeError('Age must be a number')
      .positive('Age format is incorrect')
      .integer('Age format is incorrect')
      .required('This is required field'),
  }),
);

export const SearchSchema = yupResolver(
  yup.object().shape({
    keyword: yup.string().required(),
  }),
);

export const BMICalculateSchema = yupResolver(
  yup.object().shape({
    weight: yup.number().positive().integer().required(),
    height: yup.number().positive().integer().required(),
  }),
);

export const AppointmentBookingSchema = yupResolver(
  yup.object().shape({
    description: yup.string().required('This is required field'),
  }),
);
