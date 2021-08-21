import React, { useState, useEffect } from "react";

const useValidacion = (stateInicial, validar, fn) => {
  const [valores, guardarValores] = useState(stateInicial);
  const [errores, guardarErrores] = useState({});
  const [submitForm, guardarSubmitForm] = useState(false);
  const [errmsg, guardarErrmsg] = useState(null);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;

      if (noErrores) {
        fn(); //FN =  funcion que se ejecuta en el componente
       // guardarValores(stateInicial);
      }
      guardarSubmitForm(false);
    }
  }, [errores]);

  //Funcion que se ejecuta cuando el usuario escribe algo

  const handleChange = (e) => {
    guardarValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  };

  //funcion que se ejecuta en el submit

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
    guardarSubmitForm(true);
  };

  //funcion que se ejecuta en el blur
  const handleBlur = () => {
    const erroresValidacion = validar(valores);
    guardarErrores(erroresValidacion);
  };

  return {
    errmsg,
    valores,
    errores,
    submitForm,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export default useValidacion;
