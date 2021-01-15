import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../Firebase/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({ history }) => {
  const [mail, setMail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      "Redirecting To Complete Registration:",
      process.env.REGISTER_REDIRECT
    );
    const config = {
      url: process.env.REGISTER_REDIRECT,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(mail, config);
    toast.success(
      `Email is sent to ${mail}, Click the Link to Complete Registration.`
    );
    window.localStorage.setItem("emailForRegistration", mail);
    setMail("");
  };

  const registerForm = () => {
    return (
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          autoFocus
        />
        <button className="btn btn-raised mt-2 border">Submit</button>
      </form>
    );
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <div className="row">
        <div className="from-group">
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            Registeration
          </h3>
          <ToastContainer />
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
