export default function validarRegistrarPersonal(valores) {
  let errores = {};

  if (!valores.apellido) {
    errores.apellido = "El apellido es obligatorio";
  }

  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }

  if (!valores.dni) {
    errores.dni = "El dni es obligatorio";
  }

  if (!valores.cuit) {
    errores.cuit = "El cuit es obligatorio";
  }

  if (!valores.mail) {
    errores.mail = "El correo electronico es obligatorio";
  }

  if (!valores.telefono) {
    errores.telefono = "El telefono es obligatorio";
  }

  if (!valores.nacimiento) {
    errores.nacimiento = "La fecha de nacimiento es obligatoria";
  }

  if (!valores.domicilio) {
    errores.domicilio = "El domicilio es obligatorio";
  }

  if (!valores.rol) {
    errores.rol = "El rol es obligatorio";
  }

  if (!valores.estado) {
    errores.estado = "El estado es obligatorio";
  }

  return errores;
}
