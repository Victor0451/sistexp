export default function validarRegistrarExpediente(valores) {
  let errores = {};

  if (!valores.fechaInicio) {
    errores.fechaInicio = "La fecha de inicio es obligatoria";
  }

  if (!valores.nexpediente) {
    errores.nexpediente = "El n° de expediente es obligatorio";
  }

  if (!valores.ano) {
    errores.ano = "El año es obligatorio";
  }

  if (!valores.cliente) {
    errores.cliente = "El cliente es obligatorio";
  }

  if (!valores.descripcion) {
    errores.descripcion = "La descripcion es obligatoria";
  }

  if (!valores.denunciado) {
    errores.denunciado = "El denunciado es obligatorio";
  }

  if (!valores.estado) {
    errores.estado = "El estado es obligatorio";
  }

  return errores;
}
