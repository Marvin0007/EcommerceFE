import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [mail, setMail] = useState("getinteracted46@gmail.com");
  const [pass, setPass] = useState("123456");
  const [load, setLoad] = useState("false");

  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const passLogin = async (e) => {
    e.preventDefault();
    setLoad("true");
    // console.table(mail, pass);
    try {
      const result = await auth.signInWithEmailAndPassword(mail, pass);
      console.log("LogIn Result:", result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log("LogIn Error:", error);
      toast.error(error.message);
      setLoad("false");
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((err) => {
        console.log("LogIn Error:", err);
        toast.error(err.message);
      });
  };

  const loginForm = () => {
    return (
      <form className="form">
        <div className="form-group mb-2">
          <input
            type="email"
            className="form-control"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Your Email"
            autoFocus
          />
        </div>
        <div className="form-group mb-2">
          <input
            type="password"
            className="form-control"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Your Password"
          />
        </div>
        <br />
        <Button
          onClick={passLogin}
          icon={<MailOutlined />}
          className="mb-3"
          type="primary"
          shape="round"
          size="large"
          disabled={!mail || pass.length < 6 ? true : false}
          block
          style={{
            display: "flex",
            alignItems: "center",
            verticalAlign: "middle",
            justifyContent: "center",
          }}
        >
          Login With Email/Password
        </Button>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {load ? (
            <h4 className="d-flex justify-content-center">Login</h4>
          ) : (
            <h4 className="text-danger">Loading</h4>
          )}
          <ToastContainer />
          {loginForm()}
          <Button
            onClick={googleLogin}
            icon={<GoogleOutlined />}
            className="mb-3"
            type="danger"
            shape="round"
            size="large"
            block
            style={{
              display: "flex",
              alignItems: "center",
              verticalAlign: "middle",
              justifyContent: "center",
            }}
          >
            Login With Google
          </Button>
          <Link to="/resetpass">
            <h5
              className="alert-danger"
              style={{
                display: "flex",
                float: "right",
                backgroundColor: "white",
              }}
            >
              Forgot Password?
            </h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
