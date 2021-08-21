import React, { useContext, useState, useEffect } from "react";
import ErrorPage from "../../components/layouts/ErrorPage";
import Layout from "../../components/layouts/Layout";
import { supabase, SupabaseContext } from "../../config/supabaseClient";
import toastr from "toastr";
import { confirmAlert } from "react-confirm-alert";
import Calendar from "../../components/audiencia/Calendario";

const Calendario = () => {
  const [events, guardarEvents] = useState([]);

  const { session } = useContext(SupabaseContext);

  const traerAudiencias = async () => {
    try {
      const { data, error } = await supabase.from("audiencias").select();
      if (error) throw error;

      let evs = data;

      let arr = [];

      for (let i = 0; i < evs.length; i++) {
          let evarr = {
              title: evs[i].title,
              allDay: evs[i].allDay,
              start: new Date(evs[i].start),
              end: new Date(evs[i].end),
              priority: evs[i].priority,
              expediente: evs[i].expediente
          };

          if (evarr.allDay === 1) {
              evarr.allDay = true;
          } else if (evarr.allDay === 0) {
              evarr.allDay = false;
          }

          arr.push(evarr);

          guardarEvents(arr);
      }

      
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  useEffect(() => {
    traerAudiencias();
  }, []);

  return (
    <Layout>{!session ? <ErrorPage /> : <Calendar events={events} />}</Layout>
  );
};

export default Calendario;
