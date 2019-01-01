const validateCreate = ({
  name,
}) => {
  let errors = {};

  if (!name) errors.name = 'Name is equired';

  return errors;
}

const validateUpdate = ({
  name,
}) => {
  let errors = {};

  if (!name) errors.name = 'Name is equired';

  return errors;
}

export {
  validateCreate,
  validateUpdate,
}
