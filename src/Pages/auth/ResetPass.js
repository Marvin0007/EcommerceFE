import React, { useState, useEffect } from "react";
import { auth } from "../../Firebase/firebase";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPass = ({ history }) => {
  const [mail, setMail] = useState("");
  const [load, setLoad] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    // Print Out
    console.log("Redirecting To After Pass Reset:", process.env.RESET_REDIRECT);

    const config = {
      url: process.env.RESET_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(mail, config)
      .then(() => {
        // window.localStorage.setItem("ResetMail:", mail);
        toast.success("Reset Link have been sent To your Mail:", mail);
        setMail("");
      })
      .catch((err) => {
        setLoad(false);
        console.log("Reset Pass Error:", err);
        toast.error(err.message);
      });
  };

  const resetForm = () => {
    return (
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={mail}
          placeholder="Type Your Email..."
          onChange={(e) => setMail(e.target.value)}
          autoFocus
        />
        <button
          className="btn btn-raised border mt-2"
          disabled={!mail ? true : false}
        >
          Send Link
        </button>
      </form>
    );
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {load ? (
        <h3
          className="text-danger"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          Loading
        </h3>
      ) : (
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          Reset Password
        </h3>
      )}
      <ToastContainer />
      {resetForm()}
    </div>
  );
};

export default ResetPass;
