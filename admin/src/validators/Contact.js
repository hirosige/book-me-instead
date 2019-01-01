import validator from 'validator'

const validateCreate = ({
  name,
  email,
  tel,
  title,
  description,
}) => {
  let errors = {};
  if (!name) errors.name = 'Name is required';
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid format';
  }
  if (!tel) errors.tel = 'Tel is required';
  if (!title) errors.title = 'Title is required';
  if (!description) errors.description = 'Description is required';

  return errors;
}

const validateUpdate = ({
  name,
  email,
  tel,
  title,
  description,
}) => {
  let errors = {};
  if (!name) errors.name = 'Name is required';
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid format';
  }
  if (!tel) errors.tel = 'Tel is required';
  if (!title) errors.title = 'Title is required';
  if (!description) errors.description = 'Description is required';

  return errors;
}

export {
  validateCreate,
  validateUpdate,
}
