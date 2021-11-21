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
