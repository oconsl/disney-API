const ERROR_HANDLERS = {
  SequelizeUniqueConstraintError: (res, err) =>
    res.status(403).send({ error: err.name, cause: 'Object already exist.' }),

  SequelizeValidationError: (res, err) =>
    res
      .status(400)
      .send({ error: err.name, cause: 'Syntax error on request body.' }),

  SequelizeDatabaseError: (res, err) =>
    res.status(403).send({
      error: err.name,
      cause: 'Invalid values. Check the request body.'
    }),

  defaultError: (res, err) => res.status(500).send({ error: err.name })
}

const errorHandler = (err, req, res, next) => {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError
  handler(res, err)
}

export default errorHandler
