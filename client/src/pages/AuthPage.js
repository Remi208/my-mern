import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const {loading, request, error, clearError} = useHttp();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const registerHandler = async () => {
    try {
      const data = await request(
        '/api/auth/register',
        'POST',
        {...form},
      );
    } catch (e) {

    }
  };

  const loginHandler = async () => {
    try {
      const data = await request(
        '/api/auth/login',
        'POST',
        {...form},
      );
      auth.login(data.token, data.userId);
    } catch (e) {

    }
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Auth page</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Auth</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Email"
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="password"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={loginHandler}
              disabled={loading}
            >
              login
            </button>
            <button
              className="btn yellow lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};