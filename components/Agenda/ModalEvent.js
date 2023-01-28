import React from 'react'
import moment from 'moment'

const ModalEvent = ({ evento }) => {



    return (
        <div className="modal fade" id="modalVista" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Descripcion del Evento</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body p-4">

                        {evento.length === 0 ? (<div>...</div>) :

                            (
                                <div className="row list p-4">
                                    <div className="col-md-4">
                                        <label>
                                            <strong>
                                                <u>
                                                    Inicio
                                                </u>
                                            </strong>
                                        </label>
                                        <input className="form-control" readOnly value={moment(evento.start).format('DD/MM/YYYY HH:mm:ss')} />
                                    </div>



                                    <div className="col-md-4">
                                        <label>
                                            <strong>
                                                <u>
                                                    Fin
                                                </u>
                                            </strong>
                                        </label>
                                        <input className="form-control" readOnly value={moment(evento.end).format('DD/MM/YYYY HH:mm:ss')} />
                                    </div>

                                    <div className="col-md-2">
                                        <label>
                                            <strong>
                                                <u>
                                                    Todo el Dia
                                                </u>
                                            </strong>
                                        </label>

                                        {evento.allDay === 1 ? (
                                            <input className="form-control" readOnly value="Si" />

                                        ) : (
                                            <input className="form-control" readOnly value="No" />
                                        )}

                                    </div>

                                    <div className="mt-4 col-md-3">
                                        <label>
                                            <strong>
                                                <u>
                                                    Prioridad
                                                </u>
                                            </strong>
                                        </label>

                                        {evento.extendedProps.priority === 1 ? (
                                            // <input className="form-control" value="Normal" />
                                            <div className="alert alert-success border border-dark">
                                                Normal
                                            </div>

                                        ) : evento.extendedProps.priority === 2 ? (
                                            <div className="alert alert-warning border border-dark">
                                                Importante
                                            </div>
                                        ) : evento.extendedProps.priority === 3 ? (
                                            <div className="alert alert-danger border border-dark">
                                                Urgente
                                            </div>

                                        ) : null}

                                    </div>

                                    <div className="mt-3 col-md-12">
                                        <label>
                                            <strong>
                                                <u>
                                                    Detalles
                                                </u>
                                            </strong>
                                        </label>

                                        <textarea rows="10" className="form-control text-dark" readOnly value={evento.extendedProps.detail} />
                                    </div>

                                </div>

                            )}


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEvent