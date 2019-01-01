const validateCreate = ({
  name,
  iconName,
}) => {
  let errors = {};

  if (!name) errors.name = 'Name is equired';
  if (!iconName) errors.iconName = 'Icon Name is equired';

  return errors;
}

const validateUpdate = ({
  name,
  iconName,
}) => {
  let errors = {};

  if (!name) errors.name = 'Name is equired';
  if (!iconName) errors.iconName = 'Icon Name is equired';

  return errors;
}

export {
  validateCreate,
  validateUpdate,
}
