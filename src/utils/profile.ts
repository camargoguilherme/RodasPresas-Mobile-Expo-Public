import { IUser } from '../interfaces'

export const sourceProfle = (data: IUser) => {
  let source;
  try {
    source = data.uriProfile && {uri: data.uriProfile} || require('../assets/user.jpg');
  } catch (error) {
    console.log(error)
    source = require('../assets/user.jpg');
  }
  return source;
};

type Name = "name" | "email" | "phone" | "city" | "bloodType" | "healthPlan" | "idCard" | "emergencyPhone" | "allergies" | "motorcycle" | "licensePlate";

export const attrs = (name: Name, value: Number | String, fn: Function) => {
  const allAttrs = {
    'name': {
      iconName: 'user',
      placeholder: 'Nome',
      value,
      set: fn,
    },
    'email': {
      iconName: 'envelope',
      placeholder: 'Email',
      keyboardType: 'email-address',
      value,
      set: fn,
    },
    'phone': {
      iconName: 'phone',
      placeholder: 'Telefone',
      keyboardType: 'phone-pad',
      value,
      set: fn,
    },
    'city': {
      iconName: 'city',
      placeholder: 'Cidade',
      value,
      set: fn,
    },
    'bloodType': {
      iconName: 'heart',
      placeholder: 'Tipo Sanguíneo',
      value,
      set: fn,
    },
    'healthPlan': {
      iconName: 'stethoscope',
      placeholder: 'Plano de Saúde',
      value,
      set: fn,
    },
    'idCard': {
      iconName: 'id-card',
      placeholder: 'CPF',
      keyboardType: 'number-pad',
      value,
      set: fn,
    },
    'emergencyPhone': {
      iconName: 'ambulance',
      placeholder: 'Telefone de Emegência',
      keyboardType: 'phone-pad',
      value,
      set: fn,
    },
    'allergies': {
      iconName: 'syringe',
      placeholder: 'Alérgico',
      value,
      set: fn,
    },
    'motorcycle': {
      iconName: 'motorcycle',
      placeholder: 'Moto',
      value,
      set: fn,
    },
    'licensePlate': {
      iconName: 'clipboard-check',
      placeholder: 'Placa',
      value,
      set: fn,
    },
  }

  return allAttrs[name];
}
