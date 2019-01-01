const validateCreate = ({
  name,
  code,
  slug,
}) => {
  let errors = {};

  if (!name) errors.name = 'Name is equired';
  if (!code) errors.code = 'Code is equired';
  if (!slug) errors.slug = 'Slug is equired';

  return errors;
}

const validateUpdate = ({
  name,
  code,
  slug,
}) => {
  let errors = {};

  if (!name) errors.name = 'Name is equired';
  if (!code) errors.code = 'Code is equired';
  if (!slug) errors.slug = 'Slug is equired';

  return errors;
}

export {
  validateCreate,
  validateUpdate,
}
