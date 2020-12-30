import React, {useState} from 'react';
import { auth } from '../../Firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
    const [mail, setMail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("ENV--->" + process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }

        await auth.sendSignInLinkToEmail(mail, config);
        toast.success(`Email is sent to ${mail}, Click the Link to Complete Registration.`);
        window.localStorage.setItem('emailForRegistration', mail)
        setMail("");
    };

    const registerForm = () => {
        return(
            <form className="form" onSubmit={handleSubmit}>
                <input type="email" className="form-control" value={mail} onChange={e=> setMail(e.target.value)} autoFocus />
                <button className="btn btn-raised border">Register</button>
            </form>
        )
    }
    return(
        <div className="container p-5">
            <div className="row">
                <h4>Registration</h4>
                <ToastContainer />
                {registerForm()}
            </div>
        </div>
    );
}

export default Register;