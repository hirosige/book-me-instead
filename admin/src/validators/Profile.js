import validator from 'validator'

const validateCreate = ({
  firstName,
  lastName,
  passportNo,
  tel,
  address,
  subscriptionEmail,
}) => {
  let errors = {};
  if (!firstName) errors.firstName = 'First Name is required';
  if (!lastName) errors.lastName = 'Last Name is required';
  if (!passportNo) errors.passportNo = 'Passport No is required';
  if (!tel) errors.tel = 'Tel is required';
  if (!address) errors.address = 'Address is required';
  if (!subscriptionEmail) {
    errors.subscriptionEmail = 'Subscription Email is required';
  } else if (!validator.isEmail(subscriptionEmail)) {
    errors.subscriptionEmail = 'Subscription Email is invalid form';
  }

  return errors;
}

const validateUpdate = ({
  firstName,
  lastName,
  passportNo,
  tel,
  address,
  subscriptionEmail,
}) => {
  let errors = {};
  if (!firstName) errors.firstName = 'First Name is required';
  if (!lastName) errors.lastName = 'Last Name is required';
  if (!passportNo) errors.passportNo = 'Passport No is required';
  if (!tel) errors.tel = 'Tel is required';
  if (!address) errors.address = 'Address is required';
  if (!subscriptionEmail) {
    errors.subscriptionEmail = 'Subscription Email is required';
  } else if (!validator.isEmail(subscriptionEmail)) {
    errors.subscriptionEmail = 'Subscription Email is invalid form';
  }

  return errors;
}

export {
  validateCreate,
  validateUpdate,
}
