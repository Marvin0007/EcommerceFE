import React, {useEffect, useState} from 'react';
import { auth } from '../../Firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CompleteReg = ({history}) => {
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');


    useEffect(() => {
        setMail(window.localStorage.getItem('emailForRegistration'))
    }, []);


    // console.log("Mail:"+mail,"URL:"+window.location.href)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const result = await auth.signInWithEmailLink(mail, window.location.href);
            console.log("Result:" + result);
            // history.push('/');

        } catch(err) {
            console.log(err);
            toast.error(err.message);
        }
    };


    const comRegForm = () => {
        const fetchMail = window.localStorage.getItem('emailForRegistration');
        return(
            <form className="form" onSubmit={handleSubmit}>
                <input type="email" className="form-control" value={mail} placeholder={fetchMail? fetchMail:"Email Address"} onChange={e=> setMail(e.target.value)} />
                <input type="pass" className="form-control" value={pass} placeholder="Password" onChange={e=> setPass(e.target.value)} autoFocus />
                <button className="btn btn-raised border">Complete Registration</button>
            </form>
        )
    } 
    return(
        <div className="container p-5">
            <div className="row">
                <h4>Credentials:</h4>
                <ToastContainer />
                {comRegForm()}
            </div>
        </div>
    );
}

export default CompleteReg;