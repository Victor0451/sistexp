import moment from "moment"
import axios from "axios"
import toastr from "toastr"


export const registrarHistoria = async (accion, user, id) => {

    const historial = {
        operador: user,
        fecha: moment().format('YYYY-MM-DD HH:mm:ss'),
        accion: accion,
        id: id
    }

    await axios.post(`/api/historial/funciones`, historial)
        .then(res => {

            if (res.data === "Historial Registrado") {
                toastr.info("Esta accion se registo en el historial", "ATENCION")
            }
        })
        .catch(error => {
            console.log(error)
            toastr.error("Ocurrio un error al registrar la accion en el historial", "ATENCION")
        })

}