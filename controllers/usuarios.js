const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query
  const query = req.query

  const [total, usuarios] = await Promise.all([
    Usuario.count(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite))
  ])

  res.json({
    total,
    usuarios
  })
}

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, role } = req.body
  const usuario = new Usuario({ nombre, correo, password, role })

  // Encriptar la contrasena
  const salt = bcryptjs.genSaltSync(10)
  usuario.password = bcryptjs.hashSync(password, salt)
  await usuario.save()
  res.status(201).json({ message: 'Succesfully saved on DB' })
}

const usuariosPut = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, google, correo, ...resto } = req.body

  // Validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync(10)
    resto.password = bcryptjs.hashSync(password, salt)
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto)
  res.status(200).json(usuario)
}

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - usuariosPatch'
  })
}

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })
  res.json(usuario)
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}
