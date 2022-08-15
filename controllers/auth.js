const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generarJWT')

const login = async (req, res = response) => {
  const { correo, password } = req.body

  try {
    // Verifiar si email existe
    const usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      return res.status(400).json({
        msg: 'usuario/Password no son correctos'
      })
    }
    // Verificar si usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'usuario/Password no son correctos estado: falso'
      })
    }
    // Verificar la contrasena
    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'usuario/Password no son correctos pass: incorrecto'
      })
    }
    // Generar el JWT
    const token = await generarJWT(usuario.id)
    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: 'Error'
    })
  }
}

module.exports = {
  login
}
