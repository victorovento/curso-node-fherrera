const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'Name is mandatory']
  },
  correo: {
    type: String,
    required: [true, 'Mail is mandatory'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is mandatory']
  },
  image: {
    type: String
  },
  role: {
    type: String,
    required: [true, 'Role is mandatory'],
    emun: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado: {
    type: Boolean,
    default: false
  },
  google: {
    type: Boolean,
    default: false
  }
})

UsuarioSchema.methods.toJSON = function() {
  const { __v, password, _id, ...usuario } = this.toObject()
  usuario.uid = _id
  return usuario
}

module.exports = model('Usuario', UsuarioSchema)
