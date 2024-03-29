import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";


const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth();
  

  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/v1/auth/login",
        {  email, password }
      );
      if (res && res.data.success) {
        alert("Logged in successfully");
        setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="form-container ">
        <h1>Login Page</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
