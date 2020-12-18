export const formatPhoneNumber = (phoneNumberString = '') => {
  let formatedPhoneNumber = phoneNumberString;

  if (phoneNumberString) {
    phoneNumberString = `${phoneNumberString}`.replace(/\D/g, '');
    formatedPhoneNumber = phoneNumberString.replace(
      /^(55|)?(\d{2})(\d{4,5})(\d{4})/,
      '$1 ($2) $3-$4'
    );
  }
  return formatedPhoneNumber;
};

export const formatCPF = (cpfNumber = '') => {
  let formatedCPF = cpfNumber;

  if (cpfNumber) {
    cpfNumber = cpfNumber.replace(/[^\d]/g, '');
    // const match = cpfNumber.match(/(\d{3})(\d{3})(\d{3})(\d{2})$/);
    // if (match) {
    formatedCPF = cpfNumber.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );
    // }
    // return null;
  }
  return formatedCPF;
};

export const formatIdCard = (idCard = '') => {
  let formatedIdCard = idCard;

  if (idCard) {

    formatedIdCard = idCard.replace(
      /(\w{6})(\w{6})(\w{6})(\w{6})/,
      '$1 $2 $3 $4'
    );
    // }
    // return null;
  }
  return formatedIdCard;
};

export const capitalize = (word) => {
  if (typeof word !== 'string') return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};
