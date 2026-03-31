import React, { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/slice/authSlice";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const {success, error} = useSelector(state => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password) {
      return toast.error("Please provide all fields")
    }

    dispatch(login({email, password}))

    // if(success) {
    //   toast.success("login successfully");
    //   setEmail("");
    //   setPassword("");
    //   navigate("/doctors");
    // } 
    // if(error) {
    //   toast.error(error);
    //   dispatch(reset())
    // }
    
  };

  useEffect(() => {
    if(success) {
      toast.success("login successfully");
      setEmail("");
      setPassword("");
      navigate("/doctors");
    } 
    if(error) {
      toast.error(error);
      dispatch(reset())
    }
  }, [dispatch, success, error, navigate])


  return (
    <>
      <div className="auth-container">
        <div className="card">
          <h2>Login</h2>
          <p>please enter your email & password</p>
          <div className="form-group mb-3"></div>
          <div className="form-group mb-3">
            <input
              type="email"
              placeholder="enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary"
            disabled={!email || !password}
            onClick={handleSubmit}
          >
            LOGIN
          </button>
          <p className="mt-3">
            {" "}
            Not a user ? <NavLink to="/register">Register here!</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;