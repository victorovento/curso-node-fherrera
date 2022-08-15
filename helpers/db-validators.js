const Role = require('../models/role')
const Usuario = require('../models/usuario')
const esRoleValido = async (role = '') => {
  const existeRol = await Role.findOne({ role })
  if (!existeRol) {
    throw new Error('Role is unregistered in DB')
  }
}

// Verificar si el correo existe
const isMailUnique = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo })
  if (existeEmail) {
    throw new Error('Email Already exists')
  }
}

const existUserByID = async (id = '') => {
  const existeUsuario = await Usuario.findById({ id })
  if (existeUsuario) {
    throw new Error('User Already exists')
  }
}

module.exports = {
  esRoleValido,
  isMailUnique,
  existUserByID
}
