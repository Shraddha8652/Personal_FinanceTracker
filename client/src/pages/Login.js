
import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
// import "../style/loginpage.css"
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/Login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  // prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
     <div className="Login">
      {loading && <Spinner />}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card" style={{ height: '400px' }}>
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Login Form</h1>
                <Form layout="vertical" onFinish={submitHandler}>
                  <Form.Item label="Email" name="email">
                    <Input type="email" className="form-control" />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input type="password" className="form-control" />
                  </Form.Item>
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">Login</button>
                  </div>
                </Form>
                <p className="mt-3 text-center">
                  Do n't have an account? <Link to="/SignUp">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
