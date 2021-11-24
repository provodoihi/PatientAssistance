import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

export const SignUpSchema = yupResolver(
  yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    age: yup.number().positive().integer().required(),
  }),
);

export const SignInSchema = yupResolver(
  yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  }),
);

export const UpdateProfileSchema = yupResolver(
  yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    address: yup.string().required(),
    age: yup.number().positive().integer().required(),
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
