export default function validarRegistrarAudiencia(valores) {
  let errores = {};

  if (!valores.descripcion) {
    errores.descripcion = "La descripcion es obligatoria";
  }

  if (!valores.inicio) {
    errores.inicio = "La fecha y hora de inicio son obligatorias";
  }

  if (!valores.fin) {
    errores.fin = "La fecha y hora de fin son obligatorias";
  }

  if (!valores.expediente) {
    errores.expediente = "El expediente es obligatorio";
  }

  if (!valores.prioridad) {
    errores.prioridad = "La prioridad es obligatoria";
  }

  return errores;
}
