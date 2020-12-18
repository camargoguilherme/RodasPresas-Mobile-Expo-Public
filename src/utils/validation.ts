import * as Yup from 'yup';
import {Alert} from 'react-native';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .required('Email é obrigatório')
    .email('Informe um email válido'),
  phone: Yup.string().required('Telefone é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  bloodType: Yup.string().required('Tipo sanguíneo é obrigatório'),
  healthPlan: Yup.string().required('Plano de saúde é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  emergencyPhone: Yup.string().required('Telefone de emergência é obrigatório'),
  allergic: Yup.string(),
  motorcycle: Yup.string().required('Moto/Modelo é obrigatório'),
  licensePlate: Yup.string().required('Placa é obrigatória'),
  fcmToken: Yup.string(),
});

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Informe uma senha')
    .min(6, 'A senha não pode ter menos de 6 caracteres'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field.required().oneOf([Yup.ref('password')], 'As senhas não coincidem')
      : field
  ),
});

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email é obrigatório')
    .email('Informe um email vãlido'),
});

const configValidate = { abortEarly: false}

export const validateFields = async (fields) => {
  try {
    return await validationSchema.validate({ ...fields }, configValidate);
  } catch (error) {
    return error;
  }
};

export const validatePassword = async (password: string, confirmPassword: string) => {
  try {
    return await passwordSchema.validate({password, confirmPassword}, configValidate);
  } catch (error) {
    return error;
  }
};

export const validateEmail = async (email: string) => {
  try {
    return await emailSchema.validate({email}, configValidate);
  } catch (error) {
    return error;
  }
};
