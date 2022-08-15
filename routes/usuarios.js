const { Router } = require('express')
const { check } = require('express-validator')
const {
  esRoleValido,
  isMailUnique,
  existUserByID
} = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/vaiidar-campos')
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch
} = require('../controllers/usuarios')
const router = Router()

router.get('/', usuariosGet)

router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserByID),
    check('role').custom(esRoleValido),
    validarCampos
  ],
  usuariosPut
)

router.post(
  '/',
  [
    check('correo', 'Mail is unvalid').isEmail(),
    check('nombre', 'Name is mandatory').notEmpty(),
    check('password', 'Min must be 6 char').isLength({ min: 6 }),
    // check('role', 'ROLE INVALID').isIn(["USER_ROLE","ADMIN_ROLE"]),
    check('role').custom(esRoleValido),
    check('correo').custom(isMailUnique),
    validarCampos
  ],
  usuariosPost
)

router.delete(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserByID),
    validarCampos
  ],
  usuariosDelete
)

router.patch('/', usuariosPatch)

module.exports = router
