import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";

const GestionCuenta = ({ key, session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

 
  return (
    <div className="container bg-dark rounded-3 p-4 mt-4">
      <h2 className="text-white">Actualizar Cuenta</h2>

      <div className="row border border-white rounded-3 p-4 mt-4 text-white">
        <div className="col-md-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form-control"
            type="text"
            value={session.user.email}
            disabled
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            className="form-control"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="website"
            className="form-control"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="row border border-white rounded-3 p-4 mt-4 text-white">
          <div className="mt-4 col-md-4">
            <button
              className="btn btn-secondary"
              onClick={() => updateProfile({ username, website, avatar_url })}
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </button>
          </div>
          <div className="mt-4 col-md-4">
            <button
              className="btn btn-danger"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionCuenta;
