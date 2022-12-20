import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../resourses/auth.css";

function Login() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        window.location.href = "/";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center auth">
      <div className="w-400 card p-3">
        <div className=" img-auth">
          <img src="https://i.imgur.com/YBTAX7s.png" alt="logo" />
        </div>
        <div className=" title-auth">
          <h2>Ingresa</h2>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <input type="text" />
          </Form.Item>
          <Form.Item label="Contraseña" name="password">
            <input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/register"> Aun no tienes cuenta? Registrate</Link>
            <button className="secondary-btn" type="submit">
              Ingresa
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
