import React, { useContext, useEffect, useState } from "react";
import Home from "../components/home/Home";
import Layout from "../components/layouts/Layout";
import { SupabaseContext } from "../config/supabaseClient";
import Router from "next/router";
import { supabase } from "../config/supabaseClient";
import LoginForm from "../components/auth/LoginForm";
import toastr from "toastr";
import moment from "moment";

const Index = () => {
  let emailRef = React.createRef();

  const [loading, setLoading] = useState(false);
  const [events, guardarEvents] = useState([]);

  const { session } = useContext(SupabaseContext);

  const handleLogin = async () => {
    let email = emailRef.current.value;

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      toastr.success(
        "Revisa tu email para confirmar tu inicio de sesion mediante el link",
        "ATENCION"
      );
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    } finally {
      setLoading(false);
    }
  };

  const traerAudiencias = async () => {
    const hoy = moment().format("YYYY-MM-DD");

    try {
      const { data, error } = await supabase
        .from("audiencias")
        .select()
        .like("start", `%${hoy}%`);
      if (error) throw error;

      guardarEvents(data);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  useEffect(() => {
    const mandarMail = () => {
      let data = {
        title: "",
        start: "",
        end: "",
        priority: "",
        expediente: "",
      };

      for (let i = 0; i < events.length; i++) {
        console.log(events);
        if (
          moment(events[i].start).format("YYYY-MM-DD") ===
          moment().format("YYYY-MM-DD")
        ) {
          data.title = events[i].title;
          data.start = events[i].start;
          data.end = events[i].end;
          data.priority = events[i].priority;
          data.expediente = events[i].expediente;

          fetch("/api/mail", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }
      }
    };

    traerAudiencias();
    mandarMail();
  }, [events]);

  return (
    <Layout>
      {!session ? (
        <LoginForm
          handleLogin={handleLogin}
          loading={loading}
          emailRef={emailRef}
        />
      ) : (
        <Home session={session} events={events} />
      )}{" "}
    </Layout>
  );
};

export default Index;
