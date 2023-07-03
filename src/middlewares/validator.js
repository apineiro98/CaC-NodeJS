const { validationResult } = require('express-validator');

//! La diferencia con el controller es que el middleware tiene el param 'next'.
const validateInput = (req, res, next) => {
  //! Le pasamos en la peticion todas las reglas que debe cumplir.
  const errors = validationResult(req);

  // console.log(errors, !errors.isEmpty);

  //! Si los errores no estan vacios, retorna '.status(422)', si pasa eso devuelvo un json con los errores.
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  //! Si no hay errores, pasamos next.
  next();
};

module.exports = validateInput;